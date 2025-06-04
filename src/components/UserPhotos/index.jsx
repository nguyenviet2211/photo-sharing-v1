import React, { useState , useEffect} from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

function UserPhotos() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/api/user/${userId}`)
        .then(response => response.json())
        .then(data => setUser(data));

        fetch(`http://localhost:8081/api/photosOfUser/${userId}`)
        .then(response => response.json())
        .then(data => setPhotos(data));
    }, [userId]);


    const pushComment = async (photoId) => {
        const input = document.querySelector(`#comment-${photoId}`);
        const commentText = input.value.trim();
        
        if (!commentText) {
            alert("Please enter a comment");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/photosOfUser/commentsOfPhoto/${photoId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    comment: commentText,
                    user_id: localStorage.getItem("userId")
                })
            });

            if (response.ok) {
                document.getElementById(`#comment-${photoId}`).value = '';
                const newComment = {
                    _id: Date.now().toString(),
                    comment: commentText,
                    date_time: new Date().toISOString(),
                    user: {
                        _id: localStorage.getItem("userId"),
                        first_name: localStorage.getItem("firstName") || "You",
                        last_name: localStorage.getItem("lastName") || ""
                    }
                };

                setPhotos(prevPhotos => 
                    prevPhotos.map(photo => 
                        photo._id === photoId 
                            ? {
                                ...photo,
                                comments: [...(photo.comments || []), newComment]
                              }
                            : photo
                    )
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString();
    };

    return (
        <div className="photos-container">
            <Typography variant="h4" gutterBottom>
                Photos of {user.first_name} {user.last_name}
            </Typography>

            <Grid container spacing={2}>
                {photos.length && photos.map((photo) => (
                    <Grid item xs={12} sm={6} key={photo._id}>
                        <Paper className="photo-card">
                            <img
                                src={`/images/${photo.file_name}`}
                                alt={`Photo by ${user.first_name}`}
                                className="photo-img"
                            />
                            <div className="photo-info">
                                <Typography variant="caption">
                                    Posted: {formatDate(photo.date_time)}
                                </Typography>
                                
                                {photo.comments?.map((comment) => (
                                    <div key={comment._id} className="comment">
                                        <Link to={`/users/${comment.user._id}`}>
                                            {comment.user.first_name} {comment.user.last_name}
                                        </Link>
                                        <Typography variant="body2">
                                            {comment.comment}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {formatDate(comment.date_time)}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                            <input id={`comment-${photo._id}`} style={{margin: 10}} placeholder="Add comment..."/>
                            <button onClick={() => pushComment(photo._id)}>Comment</button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default UserPhotos;
import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserPhotos() {
    const { userId } = useParams();
    const photos = models.photoOfUserModel(userId);
    const user = models.userModel(userId);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString();
    };

    return (
        <div className="photos-container">
            <Typography variant="h4" gutterBottom>
                Photos of {user.first_name} {user.last_name}
            </Typography>

            <Grid container spacing={2}>
                {photos.map((photo) => (
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
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default UserPhotos;
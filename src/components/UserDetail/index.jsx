import React, { useEffect, useState } from "react";
import {Typography, Paper, Grid, Button} from "@mui/material";

import "./styles.css";
import {useLocation, useParams} from "react-router-dom";
import {Link} from "react-router-dom";

function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8081/api/user/${userId}`)
        .then(response => response.json())
        .then(data => {setUser(data);});
    }, [userId]);

    return (
        <Paper elevation={3} sx={{ p: 3, m: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        {user.first_name} {user.last_name}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography color="textSecondary">
                        <strong>Occupation:</strong> {user.occupation}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography>
                        <strong>Location:</strong> {user.location}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography paragraph>
                        {user.description}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/photos/${user._id}`}
                        sx={{ mt: 2 }}
                    >
                        View Photos
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default UserDetail;

import React from "react";
import {Typography, Paper, Grid, Button} from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

    return (
        <>
          {/* <Typography variant="body1">
            This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property match.
            So this should show details of user: {user.userId}.
            You can fetch the model for the user from models.userModel.
          </Typography> */}
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
        </>
    );
}

export default UserDetail;

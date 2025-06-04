import './App.css';

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRegister from './components/LoginRegister';
import AddPhoto from './components/AddPhoto';
import Register from './components/Register';


const App = (props) => {
  return (
      <Router>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar />
            </Grid>
            <div className="main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route
                      path="/users/:userId"
                      element = {
                        <ProtectedRoute>
                          <UserDetail />
                        </ProtectedRoute>
                      }
                  />
                  <Route
                      path="/photos/:userId"
                      element = {
                        <ProtectedRoute>
                          <UserPhotos />
                        </ProtectedRoute>
                      }
                  />
                  <Route path="/addPhoto" element={
                    <ProtectedRoute>
                      <AddPhoto/>
                    </ProtectedRoute>
                  }></Route>

                  <Route path="/register" element={
                    <Register/>
                  }/>
                  <Route path="*" element={<LoginRegister/>}/>
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
  );
}

export default App;

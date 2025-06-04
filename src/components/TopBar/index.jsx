import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import {Link} from 'react-router-dom';

function TopBar() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:8081/api/user/admin/logout', {
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({}),
    })
    .then(response => {
      if(response.ok){
        localStorage.removeItem("userId");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        navigate('/');
      }
    })
  };

  useEffect( () => {
    if(localStorage.userId){
      setUserInfo(`Hi ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`)
    } else {
      setUserInfo("Please Login");
    }
  }, [location.pathname]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {userInfo}
        </Typography>
        {localStorage.userId && (
          <div style={{display: "flex"}}>
            <Typography 
              variant="h6" 
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Log out
            </Typography>
            <Typography component={Link} to={'/addPhoto'} style={{margin:10, color: "red"}}>
              Add Photo
            </Typography>
          </div>
          
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
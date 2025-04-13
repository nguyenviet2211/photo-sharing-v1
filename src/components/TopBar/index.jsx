import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

function TopBar() {
  const location = useLocation();
  const params = useParams();  

  const getContextInfo = () => {
    const urlParts = location.pathname.split('/');
    const userId = urlParts[2];
    if (!userId) return "";
    
    const user = models.userModel(userId);
    if (!user) return "";
    
    if (location.pathname.includes("/photos/")) {
      return `Photos of ${user.first_name} ${user.last_name}`;
    } else if (location.pathname.includes("/users/")) {
      return `${user.first_name} ${user.last_name}`;
    }
    return "";
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" style={{ flexGrow: 1 }}>
          Nguyễn Xuân Việt
        </Typography>
        <Typography variant="h6">
          {getContextInfo()}
          {/*  hàm sẽ được gọi lại mỗi lần re render */}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
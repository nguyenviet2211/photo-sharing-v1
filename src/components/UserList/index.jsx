import React, { useState, useEffect} from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import "./styles.css";

function UserList () {
    const [users, setUsers] = useState([]);
    const location = useLocation();


    useEffect(() => {
      const userId = localStorage.getItem("userId");
      if(userId){
        fetch(`http://localhost:8081/api/user/list`)
        .then(response => response.json())
        .then(data => {
          setUsers(data);
        });
      } else {
        setUsers([]);
      }      
    }, [location.pathname]);

    if(!users.length){
      return (<div></div>);
    }

    return (
      <div>
        {
        <List component="nav">
          {users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem component={Link} to={`/users/${item._id}`}>
                <ListItemText primary={`${item.first_name} ${item.last_name}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        } 
      </div>
    );
}

export default UserList;

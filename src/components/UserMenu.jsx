import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const userId = useSelector((state) => state.data.user._id);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained">
        Open Menu
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={userId && `/user/${userId}`}
        >
          Profile
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;

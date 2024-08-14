import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from '../Modal/Modal';
import { useUser } from '../../UserProvider';

export default function Popup() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
  };
  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleMenuItemClick('/')}>Home</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/contact')}>Contact</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/about')}>About</MenuItem>
        {
            user ? <MenuItem onClick={() => logout()}>Logout</MenuItem> : <MenuItem onClick={() => setOpenModal(true)}>Login</MenuItem>
        }
        
      </Menu>
      <Modal open={openModal} setOpen={setOpenModal} />
    </div>
  );
}
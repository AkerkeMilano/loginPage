import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";

import { useUser } from '../../UserProvider';

export default function Modal({ open, setOpen}) {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const { login } = useUser();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let json = "";
    let response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if(response.ok) {
      handleClose();
      json = await response.json();
      console.log("json", json)
      login(json)
      navigate("/");
    }
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ color: '#66837e', fontWeight: 'bold'}}>Login</DialogTitle>
        <DialogContent 
        sx={{
            color: '#66837e',
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    color: '#66837e',
                    border: "2px solid #66837e"
                },
                '&.Mui-focused fieldset': {
                    color: '#66837e',
                    border: "2px solid #66837e"
                  }
            }
          }}
          >
          <TextField
            autoFocus
            required
            margin="dense"
            name="username"
            label="Username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button mode="negative" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Login</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
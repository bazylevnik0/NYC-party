import React from 'react';
import { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Container from '@mui/material/Container';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

export default function Chat() {

    const [message,  setMessage] = useState(" ")
    const [messages, setMessages] = useState([])
    function send () {
        messages.push({
            name: "0",
            message: message,
        })
        setMessages([...messages]);
    }
    function typing(e) {
        console.log(e.target.value)
        setMessage(e.target.value);
    }

    return (<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
        <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Message..."
        onChange={typing}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={send}>
            send
        </IconButton>
        </Paper>
        <br />
        <br />
        {   [...messages].reverse().map(function(object, i) {
            return (<ListItem key={i}>
                <ListItemAvatar>
                <Avatar>
                    {i}
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={object.name} secondary={object.message} />
            </ListItem>) 
        })}
      </List>
    )
  }
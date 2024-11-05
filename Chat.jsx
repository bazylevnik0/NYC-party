import React from 'react';

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
    let messages = [
        {
            name: "1",
            message: "1231123 1241242153 254 sfas;fd; gds;g; pt43p ipokg; krlgk p53 g54 g54ig -4 hptjh lghlgkjfhl kjghlj 466y 46y9 560y jlj hlykhj35",
        },
        {
            name: "2",
            message: "123112 312 21 5325435",
        },
        ]
    return (<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {messages.map(function(object, i) {
            return (<ListItem key={i}>
                <ListItemAvatar>
                <Avatar>
                    {i}
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={object.name} secondary={object.message} />
            </ListItem>) 
        })}
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
      <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Message..."
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          send
      </IconButton>
      </Paper>
      </List>
    )
  }
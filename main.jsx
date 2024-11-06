import './style.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import Box  from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import Chat from  './Chat.jsx';
import Panel from './Panel.jsx';

const root = createRoot(document.getElementById('app'));
root.render( <Box component="section">
<Grid container>
<Grid size={{xs: 12, md: 12}}>
    <div id="panel"> 
     <Panel />
    </div>
   </Grid>
   <Grid size={{xs: 12, md: 8}}>
     <div id="stream">
      stream
     </div>
   </Grid>
   <Grid size={{xs: 12, md: 4}}>
    <div id="chat">
      <Chat /> 
    </div>
   </Grid>
</Grid>
</Box>);
import React from 'react';
import { useState } from 'react';

import Box  from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import Chat from  './Chat.jsx';
import Panel from './Panel.jsx';
import Stream from './Stream.jsx';


export default function App () {

const [videoActive, setVideoActive] = useState(false);
const [audioActive, setAudioActive] = useState(false);

    return (<Box component="section">
        <Grid container>
        <Grid size={{xs: 12, md: 12}}>
            <div id="panel"> 
             <Panel
              audio={{
                  audioActive: audioActive,
                  setAudioActive: setAudioActive         
              }} 
              video={{
                  videoActive: videoActive,
                  setVideoActive: setVideoActive
              }}
             />
            </div>
           </Grid>
           <Grid size={{xs: 12, md: 8}}>
             <div id="stream">
              <Stream 
                video={{
                  videoActive: videoActive
                }}
                audio={{
                  audioActive: audioActive,
                }}/>
             </div>
           </Grid>
           <Grid size={{xs: 12, md: 4}}>
            <div id="chat">
              <Chat /> 
            </div>
           </Grid>
        </Grid>
        </Box>)
}
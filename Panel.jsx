import React from 'react';
import { useState } from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export default function Panel() {
    var socket = io();

    let mediaRecorderAudio; let i = 0;
    function change_state_audio (e) {
        console.log(e.target.checked);
        if (e.target.checked) {
            // Ask permission
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(
                {
                    audio: true,
                }
                )
                // If success
                .then((stream) => {
                    mediaRecorderAudio = new MediaRecorder(stream);
                    mediaRecorderAudio.addEventListener("dataavailable", async (stream) => {
                        // Send stream data while mediaRecorderAudio is active
                            let blob = new Blob([stream.data], { type: "audio/ogg; codecs=opus" });
                            let buffer = await blob.arrayBuffer();
                            let data_to_send =  new Uint8Array(buffer);
                            socket.emit('socket_audio',JSON.stringify(data_to_send))
                            mediaRecorderAudio.requestData()
                    });
                    mediaRecorderAudio.start(1000);
                })
            }
        } else {
            mediaRecorderAudio.stop();
        }
    }

    socket.on('broadcast_audio', function(data) {
        (async () => {
    
          console.log(new Uint8Array(Object.values(JSON.parse(data))))
          let blob  = new Blob( [new Uint8Array(Object.values(JSON.parse(data))).buffer], { type: "audio/ogg; codecs=opus" });
          var url   = await URL.createObjectURL( blob );
          var audio = new Audio();
          audio.src = url;
          audio.play();
        })();
       
    });

    return (<div>
         <label>Audio: </label><Switch onChange={change_state_audio} />
         <label>Video: </label><Switch  />
    </div>)
}
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
                    mediaRecorderAudio.addEventListener("dataavailable", (stream) => {
                        // Send stream data while mediaRecorderAudio is active
                        ( async ()=>{
                            let blob = new Blob(stream.data, { type: "audio/ogg; codecs=opus" });
                            let buffer = await blob.arrayBuffer();
                            let data_to_send =  new Uint8Array(buffer);
                            console.log(data_to_send)
                            socket.emit('socket_audio',JSON.stringify(stream.data))
                        });
                    });
                    mediaRecorderAudio.start(100);
                })
            }
        } else {
            mediaRecorderAudio.stop();
        }
    }
    return (<div>
         <label>Audio: </label><Switch onChange={change_state_audio} />
         <label>Video: </label><Switch  />
    </div>)
}
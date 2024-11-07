import React from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export default function Panel(props) {
    
    function change_state_video (e) {
        if (e.target.checked) {
            props.video.setVideoActive(true);
        } else {
            props.video.setVideoActive(false);
        }
    }

    function change_state_audio (e) {
        if (e.target.checked) {
            props.audio.setAudioActive(true);
        } else {
            props.audio.setAudioActive(false);
        }
    }

    return (<div>
         <label>Audio: </label><Switch id="switch_audio" onChange={change_state_audio} />
         <label>Video: </label><Switch id="switch_video" onChange={change_state_video} />
    </div>)
}
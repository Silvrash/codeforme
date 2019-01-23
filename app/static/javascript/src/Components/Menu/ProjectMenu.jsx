import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";

class ProjectMenu extends Component {
    render() {
        return (
            <div style={{display: 'flex', height: '100%'}}>
                <Typography variant="caption" style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} color="inherit" >
                    This version doesn't support session management                        
                </Typography>
            </div>
        );
    }
}

export default ProjectMenu;
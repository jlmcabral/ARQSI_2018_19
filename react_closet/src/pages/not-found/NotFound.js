import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

class NotFound extends Component {
    render() {
        return (
            <div>
                <Typography variant="h2" gutterBottom>
                    404 Not Found
                </Typography>
                
                <div className="back" onClick={this.handleClickBackHome}>Back</div>
            </div>
        );
    }

    handleClickBackHome = () => {
        this.props.history.push('/');
    };
}

export default NotFound;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './Header.css';

class Header extends Component {
    render(){
        return (
            <header className="headerWrapper" onClick={this.handleLogoClick}>
                Closet Isep G.C.
            </header>
        );
    }

    handleLogoClick = () => {
        this.props.history.push('/');
    };
}

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};


export default withRouter(Header);

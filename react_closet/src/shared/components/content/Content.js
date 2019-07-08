import React, { Component } from 'react';

import './Content.css';

export class Content extends Component {
    render() {
        const { handleClick } = this.props;

        return (
            <button onClick={handleClick}>Novo</button>
        );
    }
}

export default Content;

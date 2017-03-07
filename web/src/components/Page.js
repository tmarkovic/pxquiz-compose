import React, { Component } from 'react';
class Page extends Component {
    constructor(props) {
        super();
        this.state = {};
    }
    componentWillUnmount() {
        
    }
    render() {

        return (
            <div style={{ background: this.props.color }} className="hero">
                {this.props.children}
            </div>

        );
    }
}

export default Page;

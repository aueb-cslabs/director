import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

const Component = (props) => {
    return <Navbar bg="dark" variant="dark">
        <div className="container">
            <Nav>
                {props.children}
            </Nav>
        </div>
    </Navbar>
}

export default withRouter(Component)
import React from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navigation from '../Navigation/Navigation';
import Terminals from '../Terminals/Terminals';
import TerminalModal from '../TerminalModal/TerminalModal';

function TerminalsSection() {
    return [
        <Terminals />,
        <TerminalModal />
    ]
}

class App extends React.Component {

    render = () => {
        return <Router>
            <Navigation />
            <Route exact path="/" component={TerminalsSection} />
        </Router>
    }

}

export default connect()(App)


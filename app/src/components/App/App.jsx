import React from 'react';
import { connect } from 'react-redux';

import Terminals from '../Terminals';

class App extends React.Component {

    render = () => {
        return <div>
            <Terminals />
        </div>
    }

}

export default connect()(App)


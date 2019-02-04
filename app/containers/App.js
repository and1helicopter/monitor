/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BottomMenu from '../components/BottomMenu';
import theme from '../themes/theme';
import {InitModBusPort} from './ModBus';

const styles = {
    root: {
        height: "500px",
        background: "#FE6B8B"
    }
};

class App extends Component<Props>{

    componentWillMount(){
        InitModBusPort();
    }

    render(){
        const {classes, children} = this.props;

        return(
            <MuiThemeProvider theme={theme}>
                <React.Fragment>{children}</React.Fragment>
                <BottomMenu  />
            </MuiThemeProvider>
        );
    };
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};

const mapStateToProps = store => ({app: store.app})

export default connect(mapStateToProps)(withStyles(styles)(App))

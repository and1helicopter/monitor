/* eslint-disable react/forbid-prop-types */
// @flow
import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import MonitorIcon from '@material-ui/icons/DashboardTwoTone';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import {Provider, Translate} from 'react-translated';
import { connect } from 'react-redux';
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';

const styles = {
    bottomMenu: {
        bottom: 0,
        position: "fixed",
        width: "100%",
    }
}

class BottomMenu extends Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            value: 1
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event, value){
        return this.setState({ value });
    };

    render(){
        const { value } = this.state;
        const { dictionaty, language, classes } = this.props;
        return(
            <Provider language={dictionaty.language} translation={language}>
                {/* <div> */}
                    <CssBaseline />
                    <BottomNavigation  
                        color="secondary" 
                        value={value} 
                        onChange={this.handleChange} 
                        showLabels 
                        className={classNames(classes.bottomMenu)}
                    >
                        <BottomNavigationAction 
                            component={Link} 
                            to="/Test"
                            label={<Translate text="journal" />}
                            className="bottomNavigationAction" 
                            icon={<RestoreIcon />}
                        />                            
                        <BottomNavigationAction 
                            component={Link} 
                            to="/Monitor"
                            className="bottomNavigationAction" 
                            label={<Translate text="monitor" />} 
                            icon={<MonitorIcon />}
                        />
                        <BottomNavigationAction 
                            component={Link} 
                            to="/SettingsTamplate"
                            className="bottomNavigationAction" 
                            label={<Translate text="settings" />} 
                            icon={<SettingsIcon />} 
                        />
                    </BottomNavigation>
                    {/* {if(value === 0) <div> Item</div>} */}
                {/* </div> */}
            </Provider>
        );
    }
}

BottomMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    dictionaty: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
    dictionaty: store.app.config,
    language: store.app.lang
})
  
export default connect(mapStateToProps)(withStyles(styles)(BottomMenu));



  
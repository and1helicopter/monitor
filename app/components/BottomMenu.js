// @flow
import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import MonitorIcon from '@material-ui/icons/DashboardTwoTone';
import SettingsIcon from '@material-ui/icons/Settings';
// import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
// import '../styles/style.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';

// import routes from '../constants/routes';

class BottomMenu extends Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            value: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value){
        return this.setState({ value });
    }
;
    render(){
        const { value } = this.state;
        // const { params } = this.props;

        return(
        <div>
            <CssBaseline />
            <BottomNavigation  
                color="secondary" 
                value={value} 
                onChange={this.handleChange} 
                showLabels className="bottomNavigation">
                    <BottomNavigationAction 
                        component={Link} 
                        to="/Test"
                        className="bottomNavigationAction" 
                        label={this.props.journal}
                        icon={<RestoreIcon />}
                    />
                    <BottomNavigationAction 
                        component={Link} 
                        to="/Monitor"
                        className="bottomNavigationAction" 
                        label={this.props.monitor} 
                        icon={<MonitorIcon />}
                    />
                    <BottomNavigationAction 
                        component={Link} 
                        to="/Test"
                        className="bottomNavigationAction" 
                        label={this.props.settings} 
                        icon={<SettingsIcon />} 
                    />
            </BottomNavigation>
            {/* {if(value === 0) <div> Item</div>} */}
        </div>);
    }
}


BottomMenu.propTypes = {
    journal: PropTypes.string.isRequired,
    monitor: PropTypes.string.isRequired,
    settings: PropTypes.string.isRequired
};
  
export default (BottomMenu);
  
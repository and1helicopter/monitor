/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Provider, Translate} from 'react-translated';
import { connect } from 'react-redux';
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Info from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import classNames from 'classnames';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

import { Link } from 'react-router-dom';

const bottomMenuHeight = 56;
const statusMenuWidthMin = 72;
const statusMenuWidthMax = 216;

// const statusMenuWidth = 

const styles = theme => ({ 
    drawer: {
        width: statusMenuWidthMin,
        flexShrink: 0,
        whiteSpace: "nowrap",
        height: `calc(100% - ${bottomMenuHeight}px)`,
        "overflow-x": "hidden"
    },
    drawerOpen: {
        width: statusMenuWidthMax,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        height: `calc(100% - ${bottomMenuHeight}px)`,
        "overflow-x": "hidden"        
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9 + 1
        },
        height: `calc(100% - ${bottomMenuHeight}px)`,
        "overflow-x": "hidden"
    },
    menuToolbar: {
        "padding": 0,
        "min-height": 0,
        "padding-left": 12
    },
    menuItem: {
        "padding-bottom": 3,
        "padding-top": 3,
    },
    menuList: {
        "padding-top": 0,
        "padding-bottom": 0
    },
    badge:{
        top: -2,
        right: -2,
        width: 9,
        height: 9
    }
})

class StatusMenu extends Component{

    format(value, format){
        const tempFormat = this.props.format[format];
        const f = new Function(tempFormat.arguments, tempFormat.direct);
        console.log(value);
        console.log(f(value));
        return !f(value);
    }

    badge(itemMenu){
        const itemVal = this.props.map.find((mapItem) => Number(mapItem.addr) === Number(itemMenu.addr));
        if(itemVal === undefined) return true;
        return this.format(itemVal.val, itemMenu.format)
    }

    render(){
        const { classes, dictionary, language} = this.props;
        return(
            <Provider language={dictionary.language} translation={language}>
                <Drawer 
                    open={this.props.open}  
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.props.open,
                        [classes.drawerClose]: !this.props.open,
                    })}
                    classes={{
                        paper: classNames({
                          [classes.drawerOpen]: this.props.open,
                          [classes.drawerClose]: !this.props.open,
                        }),
                    }}                   
                >
                    <Toolbar className={classes.menuToolbar}>
                        <IconButton
                            onClick={this.props.toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List className={classes.menuList}>
                        {this.props.menu.menu.map(itemMenu => (
                        <ListItem 
                            button// ={itemMenu.isHandler ? true : false}
                            key={itemMenu.name} 
                            className={classes.menuItem} 
                            component={itemMenu.isHandler ? Link : null}  
                            to={itemMenu.isHandler ? `/ContainerTemplate/${itemMenu.name},${itemMenu.handler}`: null}
                        >
                            <ListItemIcon>
                                <Avatar >                               
                                    <Badge 
                                        classes={{ badge: classes.badge }} 
                                        color="secondary" 
                                        variant="dot" 
                                        badgeContent = ""
                                        invisible={itemMenu.isStatus ? this.badge(itemMenu) : true}
                                    >
                                        <Info/> 
                                    </Badge>
                                </Avatar>

                            </ListItemIcon>
                            <ListItemText>
                                <Translate text={itemMenu.name}/>
                            </ListItemText>
                        </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Drawer>
            </Provider>
        );
    }
}

StatusMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    dictionary: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    menu: PropTypes.object.isRequired,
    format: PropTypes.object.isRequired,
    map: PropTypes.array.isRequired,
};
  
const mapStateToProps = store => ({
    dictionary: store.app.config,
    language: store.app.lang,
    format: store.app.format,
    map: store.map
});
  
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(StatusMenu));
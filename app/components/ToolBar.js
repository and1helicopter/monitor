/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Provider, Translate} from 'react-translated';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

const styles = () => ({
    appBar: {
        height: 48
    },
    mobileStepper: {
        position: "realitive",
        height: 40,
        width: 300,
    },
    button: {
        position: 'absolute',
        right: 0,
        marginRight: 10,
    },
    menuItem: {

    },
    dialogTitle: {
        padding: "4px 50px 4px"
    },
    text: {
        "width": "90%",
        "text-align": "center",
    }
})

function SimpleDialog(props) {
    const {classes, onClose, form, tab, ...other } = props;

    function handleClose(item) {
        onClose(item.window_tab);
    }
 
    function dialogClose(){
        onClose(tab);
    }

    return (
        <Dialog  
            onClose={dialogClose} 
            aria-labelledby="simple-dialog-title" {...other}
        >
        <DialogTitle className={classes.dialogTitle}>
            <Translate variant="h6" color="inherit" text="switchMonitor"/>
        </DialogTitle>
        <div>
            <MenuList > 
                {form.map(item => (                
                    <MenuItem button selected={item.window_tab === tab} key={item.name} onClick={() => handleClose(item)}>
                        <Translate text={item.name}/>
                    </MenuItem>
                ))}
            </MenuList>
        </div>
      </Dialog>
    )
}


class ToolBar extends Component{
    state = {
        isSwitch: false
    }
  
    title(){
        const xxx = this.props.form.find(item=>item.window_tab === this.props.tab);
        return xxx.name;
    }

    toggleSwitchOpen = () => {
        this.setState({ isSwitch: true});
    };

    toggleSwitchClose = (value) => {
        this.props.toggleContent(value);
        this.setState({ isSwitch: false});
    }

    render(){
        const { classes, dictionary, language, tab, form} = this.props;  
        return(
            <Provider language={dictionary.language} translation={language}>
                <AppBar color="inherit" position="static" className={classes.appBar} >
                    <Toolbar variant="dense" >
                        <Typography variant="h6" color="inherit" className={classes.text}>
                            <Translate text={this.title()}/>
                        </Typography>  
                        <div className={classes.button}> 
                            <IconButton aria-haspopup="true"  color="inherit">
                                <MoreVert onClick={this.toggleSwitchOpen} />
                            </IconButton>
                                
                        </div>
                        <SimpleDialog 
                            open={this.state.isSwitch} 
                            onClose={this.toggleSwitchClose} 
                            tab={tab} 
                            form={form}
                            classes={classes}
                        />
                    </Toolbar>
                </AppBar>
            </Provider>
        );
    }
}

ToolBar.propTypes = {
    dictionary: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    form: PropTypes.array.isRequired,
    tab: PropTypes.number.isRequired,
};
  
const mapStateToProps = store => ({
    dictionary: store.app.config,
    language: store.app.lang,

});
  
export default connect(mapStateToProps)(withStyles(styles)(ToolBar));
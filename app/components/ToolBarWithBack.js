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
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    button: {
        left: 0,
        marginLeft: -10,
        marginRight: 10,
    },
})

class ToolBarWithBack extends Component{
    static contextTypes = {
        router: PropTypes.object.isRequired // () => true, // replace with PropTypes.object if you use them
    }

    render(){
        const { classes, dictionary, language} = this.props;  
        console.log(this.props)
        return(
            <Provider language={dictionary.language} translation={language}>
                <AppBar position="static" color="inherit" className={classes.appBar} >
                    <Toolbar variant="dense" >
                        <IconButton aria-haspopup="true" onClick={this.context.router.history.goBack} color="inherit" className={classes.button}>
                            <ChevronLeft />
                        </IconButton>    
                        <Typography variant="h6" color="inherit">
                            <Translate text={this.props.name}/>
                        </Typography>  

                    </Toolbar>
                </AppBar>
            </Provider>
        );
    }
}

ToolBarWithBack.propTypes = {
    dictionary: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
};
  
const mapStateToProps = store => ({
    dictionary: store.app.config,
    language: store.app.lang,
});
  
export default connect(mapStateToProps)(withStyles(styles)(ToolBarWithBack));
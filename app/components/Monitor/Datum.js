/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Provider, Translate} from 'react-translated';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForwardIOS';
import Grid from '@material-ui/core/Grid';

const styles =  () => ({
    content:{
        width: "100%",
        padding: "6px",
        "&:last-child": {
            "padding-bottom": "6px",
            "padding-top": "6px",
        }
    },
});

class Datum extends Component{



    render(){
        const { classes, dictionary, language, name, value, units, toggleDatum, isEditable, edit} = this.props;
        return (
            <Provider language={dictionary.language} translation={language} >
                <Card 
                    onClick={toggleDatum} 
                    raised 
                >
                    <CardContent className={classes.content}>
                        <Grid container >
                            <Grid item xs={6}>
                                <Typography >
                                    <Translate text={name}/>
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography color="textSecondary">
                                    {value} {units}                        
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                {isEditable ?
                                    < IconButton onClick={edit}>
                                        <ArrowForward / >
                                    </IconButton>:null
                                }
                            </Grid>
                        </Grid>
                    </CardContent> 
                </Card>
            </Provider>
        )
    }
}

Datum.propTypes = {
    dictionary: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    units: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    isEditable: PropTypes.bool.isRequired,
    edit: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
    dictionary: store.app.config,
    language: store.app.lang,
});

export default connect(mapStateToProps)(withStyles(styles)(Datum));
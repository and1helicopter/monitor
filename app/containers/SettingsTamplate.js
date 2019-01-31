import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {Provider, Translate} from 'react-translated';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles =  theme => ({
    grid: {
        width: "100%",
        margin: 0,
        padding: 20,
        "padding-bottom": 66,
        // "overflow-x": "hidden",
        // "overflow-y": "hidden",
    }
})

class SettingsTamplate extends Component{
    state = {
        button: []
    }

    componentWillMount(){
        const itemTemp =  this.props.form.find(formItem => 
            formItem.tamplate.toLowerCase()=== "settingTamplate".toLowerCase());
        if(itemTemp.item === undefined) return;
        this.setState({button: itemTemp.item});
    }

    render(){
        const { classes, dictionary, language, format, map, form } = this.props;
        return(
            <Provider language={dictionary.language} translation={language}>
                <Grid container 
                    spacing={32}
                    className={classes.grid}
                >
                    {this.state.button.map(itemButton=>
                    <Grid item  key={itemButton.name} xs={6}>
                        <Button 
                            size='small' 
                            fullWidth={true} 
                            variant='contained' 
                            component={Link}  
                            to={`/ContainerForm/${itemButton.name},${itemButton.handler}`}
                        >
                            {<Translate text={itemButton.name}/>}
                        </Button>
                    </Grid>
                    )}
                </Grid>
            </Provider>          
        )
    }
}

SettingsTamplate.propTypes = {
    dictionary: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ 

})

const mapStateToProps = store => ({
    dictionary: store.app.config,
    language: store.app.lang,
    form: store.app.form
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SettingsTamplate))

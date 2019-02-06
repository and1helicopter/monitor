import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Provider, Translate} from 'react-translated';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import ToolbarWithBack from '../components/ToolBarWithBack';

const styles =  () => ({
    grid: {
        width: "100%",
        margin: 0,
        // padding: 20,
        "padding-bottom": 66,
        // "overflow-x": "hidden",
        // "overflow-y": "hidden",
    },
    button: {
        left: 0,
        marginLeft: -10,
        marginRight: 10,
    },
    text: {
        "width": "90%",
        "text-align": "center",
    }
})

class SettingsTemplate extends Component{
    // static contextTypes = {
    //     router: PropTypes.object.isRequired // () => true, // replace with PropTypes.object if you use them
    // }

    state = {
        button: [],
        name: "settings"
    }

    componentWillMount(){
        this.UpdateState();
    }

    componentDidUpdate(prevProps) {

        if (this.props.match.params !== prevProps.match.params) {
            this.UpdateState();
        }
    }

    UpdateState(){

        const {form, match} = this.props;
        // Select ref 
        const refTemp = match.params.ref;
        const nameTemp = match.params.name;

        const itemsTemp = form.filter(formItem => 
            formItem.template.toLowerCase() === "settingTemplate".toLowerCase());
        const nameFilter = nameTemp === ":name" ? "setting" : refTemp;
        const itemTemp = itemsTemp.find(formItem => 
            formItem.name.toLowerCase() === nameFilter.toLowerCase());

        if(itemTemp.item === undefined) return;
        const buttonTemp = [];

        itemTemp.item.forEach(button => buttonTemp.push({
            name: button.name,
            handler: button.handler,
            template: form.find(formItem => formItem.name.toLowerCase() === button.handler.toLowerCase()).template
        }));
        this.setState({
            button: buttonTemp,
            name: itemTemp.name
        });
    }

    SettingChange = (item) => {
        const {form} = this.props;
        const itemTemp = form.find(formItem => 
            formItem.name.toLowerCase() === item.handler.toLowerCase());
        
        const buttonTemp = [];

        itemTemp.item.forEach(button => buttonTemp.push({
            name: button.name,
            handler: button.handler,
            template: form.find(formItem => formItem.name.toLowerCase() === button.handler.toLowerCase()).template
        }));
        this.setState({button: buttonTemp});

        console.log(itemTemp)
    }

    CheckButton = (itemButton) => itemButton.template.toLowerCase() === "settingTemplate".toLowerCase()

    SettingButton = (itemButton) => {
        
        return(    <Button 
                size='small' 
                fullWidth 
                variant='contained' 
                // onClick={() => {this.SettingChange(itemButton)}}
                component={Link}  
                to={`/SettingsTemplate/${itemButton.name},${itemButton.handler}`}
            >
                {<Translate text={itemButton.name}/>}
            </Button>
           )
    }

    LinkButton = (itemButton) => (
            <Button 
                size='small' 
                fullWidth 
                variant='contained' 
                component={Link}  
                to={`/ContainerTemplate/${itemButton.name},${itemButton.handler}`}
            >
                {<Translate text={itemButton.name}/>}
            </Button>
        )

    render(){
        const { classes, dictionary, language, match} = this.props;
        const { button, name } = this.state;
        console.log(this.props)

        return(
            <Provider language={dictionary.language} translation={language}>
                <ToolbarWithBack name={name} isBack={name === "setting" ? false : true}/>
                <Grid container 
                    spacing={32}
                    className={classes.grid}
                >
                    {button.map(itemButton=>
                    <Grid item  key={itemButton.name} xs={6}>
                        {
                            this.CheckButton(itemButton) ?
                            this.SettingButton(itemButton) :
                            this.LinkButton(itemButton)
                        }
                    </Grid>
                    )}
                </Grid>
            </Provider>          
        )
    }
}

SettingsTemplate.propTypes = {
    dictionary: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    form: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
    dictionary: store.app.config,
    language: store.app.lang,
    form: store.app.form
})

export default connect(mapStateToProps)(withStyles(styles)(SettingsTemplate))

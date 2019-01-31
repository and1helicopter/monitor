/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new-func */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Provider, Translate} from 'react-translated';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Datum from './Datum';

const bottomMenuHeight = 56;

const styles =  theme => ({
    content: {
        height: `calc(100% - ${bottomMenuHeight}px)`,
        width: "100%",
    },
    grid: {
        direction: 'row',
        justify: 'space-around',
        alignItems: 'center',
        padding: 10,
        "padding-bottom": 66,
        "overflow-y": "hidden",

    },
    datum:{
        padding: 0,
    }

});

class Content extends Component{
    state = {
        isNormalize: true,
    }

    toggleDatum = () => {
        this.setState({ isNormalize: !this.state.isNormalize });
    };

    units(units){
        if(this.state.isNormalize){
            return Object("%");
        }
        return <Translate text={units}/>;        
    }

    format(value, format){
        const tempFormat = this.props.format[format];
        const f = new Function(tempFormat.arguments, tempFormat.direct);
        return f(value);
    }

    formatBind(value, format){
        const tempFormat = this.props.format[format];
        const f = new Function(tempFormat.arguments, tempFormat.direct);
        const args = tempFormat.arguments.toString().replace( /\s/g, '').split(',');
        const values = []
        args.forEach((arg)=>{
            value.forEach(val=>{
                if(arg === val.bind){
                    values.push(val.val)
                }
            })
        });
        let answer = 0;
        switch(values.length){
            case 1:
                answer = f(values[0]);
                break;
            case 2:
                answer = f(values[0], values[1]);
                break;
            case 3:
                answer = f(values[0], values[1], values[2]);
                break;
            default:
                break;
        }
        return answer;
    }

    value(item){
        if(item.isAddr){
            const itemVal = this.props.map.find((mapItem)=>
                mapItem.name === item.name && Number(mapItem.addr) === Number(item.addr));
            if(itemVal === undefined) return;
            if(this.state.isNormalize){
                return itemVal.val; 
            }            
            return this.format(itemVal.val, item.format); 
        }
        if(item.isBind){
            const itemBind = item.bind;
            const itemsBind = [];
            itemBind.forEach((element) => {
                const key = Object.keys(element).toString();
                itemsBind.push(
                    Object.assign({}, this.props.map.find((mapItem) => (mapItem.name === element[key]))));
            })
            itemBind.forEach((element) => {
                const key = Object.keys(element).toString();
                itemsBind.forEach((itemVal) => {
                    if(itemVal.name === element[key]){
                        itemVal.bind = key;
                    }
                })
            });
            return  this.formatBind(itemsBind, item.format);
        }
    }

    xs(){
        if(this.props.form.style !== undefined){
            switch (Number(this.props.form.style.column)){
                case 1:
                    return 10;
                case 2:
                    return 6;
                case 3:
                    return 4;
                case 4:
                    return 3;
                default:
                    return 10;
            }
        }
    }

    justify(){
        if(this.props.form.style !== undefined){
            if(Number(this.props.form.style.column) > 1){
                return "flex-start";
            }
            return "center";
        }
    }

    render(){
        const { classes, dictionary, language, format, map, form } = this.props;

        return (
            <Provider className={classes.content} language={dictionary.language} translation={language}>
                <Grid container 
                    justify={this.justify()}
                    spacing={8}
                    className={classes.grid}
                >
                        {form.data.map((item)=> item.isVisible ?
                           <Grid item xs={this.xs()} key={item.name} > 
                           { 
                               <Datum className={classes.datum}
                                   name={item.name} 
                                   value={this.value(item)} 
                                   units={item.isUnits ? this.units(item.units) : Object('')} 
                                   toggleDatum={this.toggleDatum}
                                   isEditable = {false}
                                   edit = {() => {}}
                               />                               
                           }
                           </Grid> : <div key={item.name}/>
                        )}
                </Grid>
            </Provider>
        )
    }
}

Content.propTypes = {
    dictionary: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    format: PropTypes.object.isRequired,
    map: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    // style: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
    dictionary: store.app.config,
    language: store.app.lang,
    format: store.app.format,
    map: store.map
});

export default connect(mapStateToProps)(withStyles(styles)(Content));
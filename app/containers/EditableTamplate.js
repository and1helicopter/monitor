/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Provider, Translate} from 'react-translated';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import EditFieldComponent from '../components/EditFieldComponent';
import Datum from '../components/Monitor/Datum';


const styles =  theme => ({
    list:{
        "padding-bottom": "56px"
    },
    listItemMedium:{
        "padding-bottom": 5,
        "padding-top": 5
    },
    listItemSmall:{
        "padding-bottom": 0,
        "padding-top": 0
    },
    grid: {
        padding: 5,
        margin: 0,
        width: "100%",
        height: "100%"
    },
    dialog:{
        padding: 5,
        margin: 0,
        height: "100%",
        "padding-bottom": 0,
        "padding-top": 0
    },
    textField:{
        "padding-left": 5,
    }

})

class EditableTamplate extends Component{
    state = {
        data: [],
        isEdit: false,
        itemCurrent: {},
        isNormalize: true,
    }

    componentWillMount(){
        const dataTemp = this.props.data;
        if(dataTemp.data === undefined) return;        
        this.setState({data: dataTemp.data});

        // get new value modbus
    }

    toggleEditOpen = (item) => {
        this.setState({ itemCurrent: item});
        this.setState({ isEdit: true});
    }

    toggleEditClose = () => {
        this.setState({ isEdit: false});
    }

    limit(item){
        if(item.editable.isLimits === undefined) return ;
        if(item.editable.isLimits === true){
            if(item.editable.limit.min === undefined || item.editable.limit.max === undefined) return ;
            return (
            <Typography >
                {`min: ${  item.editable.limit.min  }\t\t max: ${  item.editable.limit.max}`}
            </Typography>)
        }
    }

    dialogOk =(value, item) =>{
        console.log(value, item);

        // set new value modbus
        this.toggleEditClose();

        // get new value modbus

    }

    dialogClose =() =>{
        this.toggleEditClose();
    }



    dialogOpen(item){
        // console.log(item)
        this.setState({ itemCurrent: item});
        console.log(this.state)
        // this.setState({ valueDef: 15});
        // console.log(item)

    }

    valueTempChange = (valueNew, item) => {

        if(valueNew === undefined) return;

        if(item.editable.isLimits !== undefined){
            if(item.editable.isLimits === true){
                if(item.editable.limit.min === undefined || item.editable.limit.max === undefined) return ;
                    if(valueNew >=  item.editable.limit.min && valueNew <= item.editable.limit.max) this.setState({ valueTemp: valueNew});
            }
        }
        else  {
            this.setState({ valueTemp: valueNew});
        }
    }

    toggleDatum = () => {
        const {isNormalize} = this.state;
        this.setState({ isNormalize: !isNormalize });
    };


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

    render(){
        const { classes, dictionary, language, data} = this.props;
        console.log(this.props)
        return(
            <Provider  language={dictionary.language} translation={language}> 
                <Grid container 
                    justify="center"
                    alignItems="flex-start"
                    spacing={8}
                    className={classes.grid}>
                    {this.state.data.map(itemData => 
                    <Grid key={itemData.name}
                        item 
                        xs={6}                    >
                            <Datum className={classes.datum}
                                   name={itemData.name} 
                                   value={this.value(itemData)} 
                                   units={itemData.isUnits ? this.units(itemData.units) : Object('')} 
                                   toggleDatum={this.toggleDatum}
                                   isEditable = {true}
                                   edit = {() => {this.toggleEditOpen(itemData)}}
                               />
                    </Grid> 
                    )}
                </Grid>
                <EditFieldComponent
                        open={this.state.isEdit}
                        dialogClose={this.dialogClose} 
                        dialogOk={(value, item) => {this.dialogOk(value, item)}}
                        itemData={this.state.itemCurrent}
                />
            </Provider>
        )
    }    
}

EditableTamplate.propTypes = {
    dictionary: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    format: PropTypes.object.isRequired,
    map: PropTypes.array.isRequired,
    // style: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ 

})

const mapStateToProps = store => ({
    dictionary: store.app.config,
    language: store.app.lang,
    map: store.map,
    format:store.app.format,
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditableTamplate))

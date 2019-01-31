/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
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
    xxx:{
        padding: "10"
    },
    grid: {
        direction: 'row',
        justify: 'space-around',
        padding: 5,
        "padding-bottom": 66,
        "overflow-y": "hidden",
        margin: 0,
        width: "100%"
    },
})

class StatusBitTamplate extends Component{
    state = {
        data: [],
        column: 1 
    }

    componentWillMount(){
        const columnCount = this.props.data.style.column;
        const dataCount = this.props.data.data.length;
        const arraySize = Math.ceil(dataCount/columnCount);

        const subarray = [];
        for (let i = 0; i <Math.ceil(dataCount/arraySize); i++){
            subarray[i] = this.props.data.data.slice((i*arraySize), (i*arraySize) + arraySize);
        }
        // this.setState({column: columnCount})

        this.setState({data: subarray})
    }

    xs(dataTemp){
        switch(dataTemp.style.column){
            case 1:
                return 12;
            case 2:
                return 6;
            case 3:
                return 4;
            default:
                return 12;
        }
    }

    columnCount(){
        return this.props.data.style.column;
    }

    format(value, format){
        const tempFormat = this.props.format[format];
        const f = new Function(tempFormat.arguments, tempFormat.direct);
        return f(value);
    }

    value(item){
        console.log("item")
        console.log(item)
        console.log(this.props)

        const itemVal = this.props.map.find((mapItem)=>Number(mapItem.addr) === Number(item.addr));
        console.log(itemVal)
        if(itemVal === undefined) return;       
        return this.format(itemVal.val, item.format); 
    }

    render(){
        const { classes, dictionary, language, data} = this.props;
        return(
            <Provider  language={dictionary.language} translation={language}> 
                <Grid container 
                    justify="center"
                    alignItems="flex-start"
                    spacing={8}
                    className={classes.grid}>
                    {[...Array(this.props.data.style.column).keys()].map(value => (
                    <Grid key={value}
                        item 
                        xs={this.xs(data)}
                    >
                            <Card>                               
                                <List dense> 
                                {this.state.data[value].map(item=>(
                                    <ListItem key={item.name} button className={classes.listItemSmall}>
                                        <ListItemText className={classes.checkbox}  
                                            primary={<Translate text={item.name}
                                        />                                        }/>
                                        <ListItemSecondaryAction className={classes.checkbox} >
                                            <Checkbox className={classes.checkbox} checked={this.value(item)} disableRipple />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                                </List>

                           </Card>

                    </Grid> 
                    ))}
                </Grid>
            </Provider>
          )
    }    
}

StatusBitTamplate.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StatusBitTamplate))

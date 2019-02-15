import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Translate} from 'react-translated';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

const styles =  () => ({
    dialog:{
        padding: 5,
        margin: 0,
        height: "100%",
        "padding-bottom": 0,
        "padding-top": 0
    },
    textField:{
        "text-align": "right"
    },
    input: {
        "text-align": "right"
    }
})

class EditFieldComponent extends Component{
    state = {
        valueDef: 0,
        valueTemp: 0,
        isOk: true,
    };

    limitRange = (value, isNormalized) => {
        const {itemData} = this.props;
        if(itemData !== undefined){
            if(itemData.isLimits){
                if(isNormalized){
                    this.setState({ isOk: value >= itemData.limit.normalize.min && value <= itemData.limit.normalize.max});
                }
                else{
                    this.setState({ isOk: value >= itemData.limit.units.min && value <= itemData.limit.units.max});
                }
            }
        }
    }

    valueDirect = (isNormalized) => {
        const {itemData, map, format} = this.props;
        const itemVal = map.find((mapItem) => Number(mapItem.addr) === Number(itemData.addr));
        if(itemVal === undefined) return;

        const itemFormat = isNormalized ? itemData.formatNormalize : itemData.format;
        const tempFormat = format[itemFormat];

        try {
             const f = new Function(tempFormat.arguments, tempFormat.direct);
            const valTemp = f(itemVal.val);
            this.limitRange(valTemp, isNormalized);
            this.setState({ valueDef: valTemp});
            this.setState({ valueTemp: valTemp}); 
        } catch {
            return null;
        }

    }

    valueInverse = (isNormalized) => {
        const {itemData, map, format} = this.props;
        const {valueTemp} = this.state;
        const itemVal = map.find((mapItem) => Number(mapItem.addr) === Number(itemData.addr));
        if(itemVal === undefined) return;
        const itemFormat = isNormalized ? itemData.formatNormalize : itemData.format;
        const tempFormat = format[itemFormat];
        const f = new Function(tempFormat.arguments, tempFormat.inverse);
        return f(valueTemp);
    }

    valueTempChange = (valueNew, isNormalized) => {
        if(valueNew === undefined) return;
        this.limitRange(Number(valueNew), isNormalized);
        this.setState({ valueTemp: valueNew});
    }

    ResetDefaultValue = (isNormalized) => {
        const {valueDef} = this.state;
        this.limitRange(Number(valueDef), isNormalized);
        this.setState({ valueTemp: valueDef});
    }

    RemoveLastSymbol = (isNormalized) => {
        const {valueTemp} = this.state;
        let tempStr = valueTemp.toString();
        tempStr = tempStr.substring(0, tempStr.length - 1); 
        this.limitRange(Number(tempStr), isNormalized);
        this.setState({ valueTemp: Number(tempStr)});
    }

    AddLastSymbol = (symbol, isNormalized) => {
        const {valueTemp} = this.state;
        const tempStr = valueTemp === 0 ? symbol : valueTemp.toString() + symbol;
        this.limitRange(Number(tempStr), isNormalized);
        this.setState({ valueTemp: tempStr});
    }

    AddMinusSymbol = (isNormalized) => {
        const {valueTemp} = this.state;
        let tempStr = valueTemp.toString();
        if(tempStr !== 0 || tempStr === ''){
            if(tempStr.includes('-')){ tempStr = tempStr.replace('-','')}
            else {tempStr = `-${tempStr}`}
        }
        this.limitRange(Number(tempStr), isNormalized);
        this.setState({ valueTemp: tempStr});
    }

    AddSeparatorSymbol = (isNormalized) => {
        const {valueTemp} = this.state;
        let tempStr = valueTemp.toString();
        tempStr += '.';
        this.limitRange(Number(tempStr), isNormalized);
        this.setState({ valueTemp: tempStr});
    }

    limit = (item, isNormalized) => {
        if(item === undefined) return;
        try {
            if(item.isLimits === undefined) return;
            if(item.isLimits === true){
                if(isNormalized){
                    if(item.limit.normalize.min === undefined || item.limit.normalize.max === undefined) return ;
                    return (
                    <Typography >
                        {`min: ${item.limit.normalize.min}\t\t max: ${item.limit.normalize.max}`}
                    </Typography>)
                }
                if(item.limit.units.min === undefined || item.limit.units.max === undefined) return ;
                return (
                <Typography >
                    {`min: ${item.limit.units.min}\t\t max: ${item.limit.units.max}`}
                </Typography>)
            }  
        } 
        catch  {
            return null;
        }
    }

    render(){
        const {classes, open, dialogClose, dialogOk, itemData, isNormalized} = this.props;
        const {isOk, valueTemp} = this.state;
        console.log("itemData")

        console.log(itemData)

        return(
            <Dialog 
                open={open}
                onClose={dialogClose}
                onEnter ={() => {this.valueDirect(isNormalized)}}
            >
                <DialogTitle className={classes.dialog}>
                    <Translate variant="h6" color="inherit" text={itemData.name}/>
                    {this.limit(itemData, isNormalized)}
                </DialogTitle>
                <DialogContent className={classes.dialog}>
                    <TextField
                        // step="any" 
                        className={classes.textField}
                        inputProps={{
                            style: { textAlign: "right" }
                        }}
                        // type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="none"
                        variant="outlined"
                        value={valueTemp}
                        onChange={() => {
                            this.valueTempChange(event.target.value, isNormalized)
                        }}
                    />
                    <Grid
                        className={classes.grid} 
                        container
                        direction="column"
                        ustify="center"
                    >
                        <Grid xs item>
                            <Button onClick={() => {this.AddLastSymbol(1, isNormalized)}}>1</Button>
                            <Button onClick={() => {this.AddLastSymbol(2, isNormalized)}}>2</Button>
                            <Button onClick={() => {this.AddLastSymbol(3, isNormalized)}}>3</Button>
                            <Button  variant="text"  color="inherit" >
                                <RefreshIcon onClick={() => {this.ResetDefaultValue()}}/>
                            </Button>
                        </Grid>
                        <Grid xs item>
                            <Button onClick={() => {this.AddLastSymbol(4, isNormalized)}}>4</Button>
                            <Button onClick={() => {this.AddLastSymbol(5, isNormalized)}}>5</Button>
                            <Button onClick={() => {this.AddLastSymbol(6, isNormalized)}}>6</Button>
                            <Button  variant="text"  color="inherit">
                                <BackIcon onClick={() => {this.RemoveLastSymbol()}}/>
                            </Button>
                        </Grid>
                        <Grid xs item>
                            <Button onClick={() => {this.AddLastSymbol(7, isNormalized)}}>7</Button>
                            <Button onClick={() => {this.AddLastSymbol(8, isNormalized)}}>8</Button>
                            <Button onClick={() => {this.AddLastSymbol(9, isNormalized)}}>9</Button>
                        </Grid>
                        <Grid xs item>
                            <Button onClick={() => {this.AddMinusSymbol(isNormalized)}}>{'\u00B1'.toString()}</Button>
                            <Button onClick={() => {this.AddLastSymbol(0, isNormalized)}}>0</Button>
                            <Button onClick={() => {this.AddSeparatorSymbol(isNormalized)}}>.</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose} color="primary">
                        <Translate text="Cancel"/>
                    </Button>
                    <Button disabled={!isOk} onClick={() => {dialogOk(this.valueInverse(isNormalized), itemData)}} color="primary">
                        <Translate text="Ok"/>                                            
                    </Button>
                </DialogActions> 
            </Dialog>    
        )
    }
}

EditFieldComponent.propTypes = {
    dictionary: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    format: PropTypes.object.isRequired,
    map: PropTypes.array.isRequired,
    open: PropTypes.bool,
    dialogClose: PropTypes.func,
    dialogOk: PropTypes.func,
    itemData: PropTypes.object.isRequired,
    isNormalized: PropTypes.bool.isRequired,

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditFieldComponent))
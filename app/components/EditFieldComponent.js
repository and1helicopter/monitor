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


const styles =  theme => ({
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

    limitRange = (value) => {
        const {itemData} = this.props;
        if(itemData !== undefined){
            if(itemData.editable !== undefined && itemData.editable.isLimits !== undefined){
                if(itemData.editable.isLimits === true){
                    if(value >=  itemData.editable.limit.min && value <= itemData.editable.limit.max) this.setState({ isOk: true});
                    else this.setState({ isOk: false});
                }
            }
        }
    }

    valueDirect = () => {
        const {itemData, map, format} = this.props;
        const itemFormat = itemData.format;
        const itemVal = map.find((mapItem) => Number(mapItem.addr) === Number(itemData.addr));
        if(itemVal === undefined) return;
        const tempFormat = format[itemFormat];
        const f = new Function(tempFormat.arguments, tempFormat.direct);
        const valTemp = f(itemVal.val);
        this.limitRange(valTemp);
        this.setState({ valueDef: valTemp});
        this.setState({ valueTemp: valTemp}); 
    }

    valueInverse = () => {
        const {itemData, map, format} = this.props;
        const {valueTemp} = this.state;
        const itemFormat = itemData.format;
        const itemVal = map.find((mapItem) => Number(mapItem.addr) === Number(itemData.addr));
        if(itemVal === undefined) return;
        const tempFormat = format[itemFormat];
        const f = new Function(tempFormat.arguments, tempFormat.inverse);
        return f(valueTemp);
    }

    valueTempChange = (valueNew) => {
        if(valueNew === undefined) return;
        this.limitRange(Number(valueNew));
        this.setState({ valueTemp: valueNew});
    }

    ResetDefaultValue = () => {
        const {valueDef} = this.state;
        this.limitRange(Number(valueDef));
        this.setState({ valueTemp: valueDef});
    }

    RemoveLastSymbol = () => {
        const {valueTemp} = this.state;
        let tempStr = valueTemp.toString();
        tempStr = tempStr.substring(0, tempStr.length - 1); 
        this.limitRange(Number(tempStr));
        this.setState({ valueTemp: Number(tempStr)});
    }

    AddLastSymbol = (symbol) => {
        const {valueTemp} = this.state;
        const tempStr = valueTemp === 0 ? symbol : valueTemp.toString() + symbol;
        this.limitRange(Number(tempStr));
        this.setState({ valueTemp: tempStr});
    }

    AddMinusSymbol = () => {
        const {valueTemp} = this.state;
        let tempStr = valueTemp.toString();
        if(tempStr !== 0 || tempStr === ''){
            if(tempStr.includes('-')){ tempStr = tempStr.replace('-','')}
            else {tempStr = `-${tempStr}`}
        }
        this.limitRange(Number(tempStr));
        this.setState({ valueTemp: tempStr});
    }

    AddSeparatorSymbol = () => {
        const {valueTemp} = this.state;
        let tempStr = valueTemp.toString();
        tempStr += '.';
        this.limitRange(Number(tempStr));
        this.setState({ valueTemp: tempStr});
    }

    limit = (item) => {
        if(item === undefined) return;
        if(item.editable === undefined) return;
        if(item.editable.isLimits === undefined) return ;
        if(item.editable.isLimits === true){
            if(item.editable.limit.min === undefined || item.editable.limit.max === undefined) return ;
            return (
            <Typography >
                {`min: ${  item.editable.limit.min  }\t\t max: ${  item.editable.limit.max}`}
            </Typography>)
        }   
    }

    render(){
        const {classes, open, dialogClose, dialogOk, itemData} = this.props;
        const {isOk, valueTemp} = this.state;
        return(
            <Dialog 
                open={open}
                onClose={dialogClose}
                onEnter ={() => {this.valueDirect()}}
            >
                <DialogTitle className={classes.dialog}>
                    <Translate variant="h6" color="inherit" text={itemData.name}/>
                    {this.limit(itemData)}
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
                            this.valueTempChange(event.target.value)
                        }}
                    />
                    <Grid
                        className={classes.grid} 
                        container
                        direction="column"
                        ustify="center"
                    >
                        <Grid xs item>
                            <Button onClick={() => {this.AddLastSymbol(1)}}>1</Button>
                            <Button onClick={() => {this.AddLastSymbol(2)}}>2</Button>
                            <Button onClick={() => {this.AddLastSymbol(3)}}>3</Button>
                            <Button  variant="text"  color="inherit" >
                                <RefreshIcon onClick={() => {this.ResetDefaultValue()}}/>
                            </Button>
                        </Grid>
                        <Grid xs item>
                            <Button onClick={() => {this.AddLastSymbol(4)}}>4</Button>
                            <Button onClick={() => {this.AddLastSymbol(5)}}>5</Button>
                            <Button onClick={() => {this.AddLastSymbol(6)}}>6</Button>
                            <Button  variant="text"  color="inherit">
                                <BackIcon onClick={() => {this.RemoveLastSymbol()}}/>
                            </Button>
                        </Grid>
                        <Grid xs item>
                            <Button onClick={() => {this.AddLastSymbol(7)}}>7</Button>
                            <Button onClick={() => {this.AddLastSymbol(8)}}>8</Button>
                            <Button onClick={() => {this.AddLastSymbol(9)}}>9</Button>
                        </Grid>
                        <Grid xs item>
                            <Button onClick={() => {this.AddMinusSymbol()}}>{'\u00B1'.toString()}</Button>
                            <Button onClick={() => {this.AddLastSymbol(0)}}>0</Button>
                            <Button onClick={() => {this.AddSeparatorSymbol()}}>.</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose} color="primary">
                        <Translate text="Cancel"/>
                    </Button>
                    <Button disabled={!isOk} onClick={() => {dialogOk(this.valueInverse(), itemData)}} color="primary">
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
    itemData: PropTypes.object.isRequired

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
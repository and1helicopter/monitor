import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ToolBarWithBack from '../components/ToolBarWithBack';
import { NEW_MAP, UPDATE_MAP } from '../actions/actions';
import { getValue, setValue } from './ModBus';
// Templates
import ViewBitTemplate from './ViewBitTemplate';
import ViewTemplate from './ViewTemplate';
import SettingsTemplate from './SettingsTemplate';

const styles =  () => ({

})

class ContainerTemplate extends Component{
    state = {
        template: "",
        form: {}
    }

    componentWillMount() {
        const {form, mapInit, match} = this.props;
        // Select ref 
        const refTemp = match.params.ref;
        if(refTemp === undefined) return;
        // Select form
        const formTemp = form.find(item => item.name === refTemp);
        if(formTemp === undefined) return;
        // Select template
        this.setState({form:  formTemp});
        this.setState({template:  formTemp.template});

        const mapForm = []
        if(formTemp.data === undefined) return;
        formTemp.data.forEach(itemData=>{
            if(itemData.isAddr){
                // 
                if(!mapForm.some(item => Number(item.addr) === Number(itemData.addr))){
                    mapForm.push({
                        addr: Number(itemData.addr),
                        val: 0,
                        count: itemData.count !== undefined ? itemData.count : 1
                    })
                }
            }
        })

        // Config map for form
        mapInit(mapForm);
        
        // get new value modbus
        //    this.interval = setInterval(() => {this.getValueMap()}, 250);
        this.timeout = setTimeout(() => {this.getValueMap()}, 0);
    }
    
    componentWillUnmount() {
        const {mapInit} = this.props;

        clearTimeout(this.timeout)
        // mapInit([]);
    }

    // read ModBus
    getValueMap = () => {
        const {map, mapUpdate} = this.props;
        getValue(map, mapUpdate);        
    }

    setValueMap = (value, item) => {
        const addr = Number(item.addr);
        setValue([value], addr)
        this.timeout = setTimeout(() => {this.getValueMap()}, 0);
    }

    link(){
        const {template, form} = this.state;

        switch (template.toLowerCase()){
            case "statusBitTemplate".toLowerCase():
                return <ViewBitTemplate data={form}/>
            case "statusTemplate".toLowerCase():
                return <ViewTemplate data={form} setValue={this.setValueMap}/>
            // case "settingTemplate".toLowerCase():
            //     return <SettingsTemplate form={form} nameItem={form.name}/>
            default:
                return null;
        }
    }

    render(){
        const {match} = this.props;
        console.log(this.props)
        return(<div>
            <ToolBarWithBack name={match.params.name} />
            {this.link()}
        </div>)
    }    
}

ContainerTemplate.propTypes = {
    map: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    mapUpdate: PropTypes.func.isRequired,
    mapInit: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    form: PropTypes.array.isRequired,
    // style: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ 
    mapInit: (val) => dispatch({type: NEW_MAP, map: val}),
    mapUpdate: (val) =>  dispatch({type: UPDATE_MAP, map: val})
})

const mapStateToProps = store => ({
    form: store.app.form,
    map: store.map
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContainerTemplate))

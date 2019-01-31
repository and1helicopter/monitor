import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ToolBarWithBack from '../components/ToolBarWithBack';
import { NEW_MAP } from '../actions/actions';
// Tamplates
import StatusBitTamplate from './StatusBitTamplate';
import StatusTamplate from './EditableTamplate';

const styles =  theme => ({

})

class ContainerForm extends Component{
    state = {
        tamplate: "",
        form: {}
    }

    componentWillMount(){
        // Select ref 
        const refTemp =  this.props.match.params.ref;
        if(refTemp === undefined) return;
        // Select form
        const formTemp = this.props.form.find(item => item.name === refTemp);
        if(formTemp === undefined) return;
        // Select tamplate
        this.setState({form:  formTemp});
        this.setState({tamplate:  formTemp.tamplate});

        const mapForm = []
        if(formTemp.data === undefined) return;
        formTemp.data.forEach(itemData=>{
            if(itemData.isAddr){
                // 
                if(!mapForm.some(item => item.addr === Number(itemData.addr))){
                    mapForm.push({
                        name: itemData.name,
                        addr: Number(itemData.addr),
                        val: 1
                    })
                }
            }
        })

        this.props.mapInit(mapForm);
    }

    link(){
        switch (this.state.tamplate.toLowerCase()){
            case "statusBitTamplate".toLowerCase():
                return <StatusBitTamplate data={this.state.form}/>
            case "statusTamplate".toLowerCase():
                return <StatusTamplate data={this.state.form}/>
            default:
        }
    }

    render(){
        return(<div>
            <ToolBarWithBack name={this.props.match.params.name} />
            {this.link()}
        </div>)
    }    
}

const mapDispatchToProps = (dispatch) => ({ 
    mapInit: (val) => dispatch({type: NEW_MAP, map: val})
})

const mapStateToProps = store => ({
    form: store.app.form,
    map: store.map
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContainerForm))

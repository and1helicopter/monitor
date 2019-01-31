/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import StatusMenu from '../components/Monitor/StatusMenu';
import ToolBar from '../components/Monitor/ToolBar';
import Content from '../components/Monitor/Content';
import { NEW_MAP, UPDATE_MAP } from '../actions/actions';
import { getValue } from './ModBus';


const statusMenuWidthMin = 72;
const statusMenuWidthMax = 216;
const bottomMenuHeight = 56;

const styles =  theme => ({
    contanerOpen:{
        width: `calc(100% - ${statusMenuWidthMax}px)`,
        height: `calc(100% - ${bottomMenuHeight}px)`,
        marginLeft: `${statusMenuWidthMax}px`,
        "overflow-x": "hidden",    
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        "overflow-y": "visible",

    },
    contanerClose:{
        width: `calc(100% - ${statusMenuWidthMin}px)`,
        height: `calc(100% - ${bottomMenuHeight}px)`,
        marginLeft: `${statusMenuWidthMin}px`,
        "overflow-x": "hidden",        
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.leavingScreen,
        }),
        "overflow-y": "visible",

    }  
})

class Monitor extends Component{
    state = {
        isOpen: false,
        menu: {},
        form: {},
        tab: 0
    };

    componentWillMount(){
        // Select menu monitor from store        
        const menu = this.props.form.find((item) => (item.tamplate === "monitorMenu"));
        this.setState({menu});
        const mapMenu = []
        menu.menu.forEach(itemMenu=>{
            if(itemMenu.isAddr){
                mapMenu.push({
                    name: itemMenu.name,
                    addr: Number(itemMenu.addr),
                    val: 11
                })
            }
        })
        // Select all forms monitor from store
        const form = this.props.form.filter((item) => (item.tamplate === "monitorData"));
        this.setState({form});
        // Start form monitor
        const formFirst = form.find((item)=>(item.window_tab === 0));

        const mapForm = [];
        formFirst.data.forEach((item)=>{
            if(item.isAddr === true){
                mapForm.push({
                    name: item.name,
                    addr: Number(item.addr),
                    val: 0
                })
            }
        });
        // Concat mapMenu and mapForm
        const map = mapForm;
        mapMenu.forEach(itemMenu => {
            if(!map.some(item => (item.addr === itemMenu.addr))){
                map.push(itemMenu)  
            }
        })

        // Config map for form
        this.props.mapInit(mapForm);
        this.setState({ tab: 0 });

        this.interval = setInterval(() => {this.getValueMap()}, 250);
    }

    componentDidMount() {
       // this.interval = setInterval(() => {this.getValueMap()}, 250);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getValueMap = () => {
        const {map} = this.props;
        getValue(map, this.props.mapUpdate);        
    }

    toggleDrawer = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    toggleContent = (index) => {
        // Select menu monitor from store        
        const menu = this.props.form.find((item) => (item.tamplate === "monitorMenu"));
        this.setState({menu});
        const mapMenu = []
        menu.menu.forEach(itemMenu=>{
            if(itemMenu.isAddr){
                mapMenu.push({
                    name: itemMenu.name,
                    addr: Number(itemMenu.addr),
                    val: 11
                })
            }
        })
        // Select current form
        const formFirst = this.state.form.find((item)=>(item.window_tab === index));

        const mapForm = [];
        formFirst.data.forEach((item)=>{
            if(item.isAddr === true){
                mapForm.push({
                    name: item.name,
                    addr: Number(item.addr),
                    val: 0
                })
            }
        });
        // Concat mapMenu and mapForm
        const map = mapForm;
        mapMenu.forEach(itemMenu => {
            if(!map.some(item => (item.addr === itemMenu.addr))){
                map.push(itemMenu)  
            }
        })

        this.props.mapInit(map);
        this.setState({ tab: index });
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <StatusMenu open={this.state.isOpen} toggleDrawer={this.toggleDrawer}  menu={this.state.menu} />
                <div className={this.state.isOpen ? classes.contanerOpen : classes.contanerClose}  > 
                    <ToolBar open={this.state.isOpen} toggleContent={this.toggleContent} form={this.state.form} tab={this.state.tab} />
                    <Content open={this.state.isOpen} form={this.state.form.find(item=>item.window_tab === this.state.tab)} />
                </div>  
            </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ 
    mapInit: (val) => dispatch({type: NEW_MAP, map: val}),
    mapUpdate: (val) =>  dispatch({type: UPDATE_MAP, map: val})
})

const mapStateToProps = store => ({
    form: store.app.form,
    map: store.map,
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Monitor))
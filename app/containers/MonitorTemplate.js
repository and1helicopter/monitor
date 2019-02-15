/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import StatusMenu from '../components/StatusMenu';
import ToolBar from '../components/ToolBar';
import { NEW_MAP, UPDATE_MAP } from '../actions/actions';
import { getValue } from './ModBus';
import ViewTemplate from './ViewTemplate';


const statusMenuWidthMin = 72;
const statusMenuWidthMax = 216;
const bottomMenuHeight = 56;

const styles =  theme => ({
    containerOpen:{
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
    containerClose:{
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
        const {form, mapInit} = this.props;

        const menu = form.find((item) => (item.template === "monitorMenu"));

        this.setState({menu});
        const mapMenu = []
        menu.menu.forEach(itemMenu=>{
            if(itemMenu.isAddr){
                mapMenu.push({
                    addr: Number(itemMenu.addr),
                    val: 0,
                    count: 1
                })
            }
        })
        // Select all forms monitor from store
        const formTemp = form.filter((item) => (item.template === "monitorData"));
        console.log("formTemp");
        console.log(formTemp);
        this.setState({form: formTemp});
        // Start form monitor
        const formFirst = form.find((item)=>(Number(item.window_tab) === 0));

        const mapForm = [];
        formFirst.data.forEach((item)=>{
            if(item.isAddr === true){
                if(!mapForm.some(itemMap => (Number(itemMap.addr) === Number(item.addr)))){
                    mapForm.push({
                        addr: Number(item.addr),
                        val: 0,
                        count: item.count !== undefined ? item.count : 1
                    })
                }
            }
        });

        // Concat mapMenu and mapForm
        const map = mapForm;
        mapMenu.forEach(itemMenu => {
            if(!map.some(item => (Number(item.addr) === Number(itemMenu.addr)))){
                map.push(itemMenu)  
            }
        })

        // Config map for form
        mapInit(mapForm);
        this.setState({ tab: 0 });

        // this.getValueMap();
        this.interval = setInterval(() => {this.getValueMap()}, 250);
    }

    componentWillUnmount() {
        const {mapInit} = this.props;

        clearInterval(this.interval);
        // mapInit([]);
    }

    // read ModBus
    getValueMap = () => {
        const {map, mapUpdate} = this.props;
        getValue(map, mapUpdate);        
    }

    // toggle menu drawer
    toggleDrawer = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    // toggle this.state.form
    toggleContent = (index) => {
        // Select menu monitor from store        
        const menu = this.props.form.find((item) => (item.template === "monitorMenu"));
        this.setState({menu});
        const mapMenu = []
        menu.menu.forEach(itemMenu=>{
            if(itemMenu.isAddr){
                mapMenu.push({
                    addr: Number(itemMenu.addr),
                    val: 0,
                    count: 1
                })
            }
        })
        // Select current form
        const formFirst = this.state.form.find((item)=>(Number(item.window_tab) === Number(index)));

        const mapForm = [];
        formFirst.data.forEach((item)=>{
            if(item.isAddr === true){
                mapForm.push({
                    addr: Number(item.addr),
                    val: 0,
                    count: item.count !== undefined ? item.count : 1
                })
            }
        });
        // Concat mapMenu and mapForm
        const map = mapForm;
        mapMenu.forEach(itemMenu => {
            if(!map.some(item => (Number(item.addr) === Number(itemMenu.addr)))){
                map.push(itemMenu)  
            }
        })

        this.props.mapInit(map);
        this.setState({ tab: index });
    }

    render(){
        const { classes } = this.props;
        const { tab, isOpen, form, menu } = this.state;
        console.log(this.state)
        return (
            <div>
                <StatusMenu open={isOpen} toggleDrawer={this.toggleDrawer}  menu={menu} />
                <div className={isOpen ? classes.containerOpen : classes.containerClose}  > 
                    <ToolBar open={isOpen} toggleContent={this.toggleContent} form={form} tab={tab} />
                    <ViewTemplate open={isOpen} data={form.find(item=>Number(item.window_tab) === Number(tab))}/>
                </div>  
            </div>
    );
  }
}


Monitor.propTypes = {
    map: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    mapUpdate: PropTypes.func.isRequired,
    mapInit: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    // style: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ 
    mapInit: (val) => dispatch({type: NEW_MAP, map: val}),
    mapUpdate: (val) =>  dispatch({type: UPDATE_MAP, map: val})
})

const mapStateToProps = store => ({
    form: store.app.form,
    map: store.map,
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Monitor))
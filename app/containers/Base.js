import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel'

export default class Base extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            counter: 0
        };
        this.counter = this.counter.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({date: new Date()});
    }

    counter (){
        this.setState((state)=>({counter: state.counter + 1}));}

    render(){
        return (
            <div>
                <Button className="button" onClick={this.counter} variant="contained" color="secondary">Hi, Holo!)))</Button>
                <br/>
                <FormLabel >Time: {this.state.date.toLocaleTimeString()}</FormLabel >
                <br/>
                <FormLabel >Count: {this.state.counter}</FormLabel >
            </div>
        );
    }
}

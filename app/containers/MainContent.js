import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel'
// import '../styles/style.css';

class MainContent extends Component<Props> {
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            date: new Date(),
            counter: 0
        };
        this.counter = this.counter.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({date: new Date()});
    }

    counter (){
        console.log(this.props.journal);
        this.setState((state)=>({counter: state.counter + 1}));}

    render(){
        return(
            <div className="mainContent">
                <Button className="button" onClick={this.counter} variant="contained" color="secondary">Hi, Holo!)))</Button>
                <br/>
                <FormLabel className="label" >Time: {this.state.date.toLocaleTimeString()}.{this.state.date.getMilliseconds()}</FormLabel >
                <br/>
                <FormLabel >Count: {this.state.counter}</FormLabel >
            </div>   
        );
    }
}


// MiniContent.propTypes = {
//     journal: PropTypes.string.isRequired,
//     monitor: PropTypes.string.isRequired,
//     settings: PropTypes.string.isRequired
// };
  
export default (MainContent);

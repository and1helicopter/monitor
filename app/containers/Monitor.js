// @flow
import React, { Component } from 'react'
// import '../styles/style.css';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import MainContent from '../components/MainContent'
import BottomMenu from '../components/BottomMenu';

export default class Monitor extends Component<Props>{
  constructor(props){
      super(props);
      this.props = props;
  }

  render(){
      return (
          <div>
              {/* <AppBar className="appBar">
                  <Toolbar >
                      <IconButton className="hamburger">
                          <MenuIcon />
                      </IconButton>
                  </Toolbar>
              </AppBar> */}
              <BottomMenu journal={this.props.journal} monitor={this.props.monitor} settings={this.props.settings} />
          </div>
      );
  }
}

// Monitor.propTypes = {
//     journal: PropTypes.string.isRequired,
//   };
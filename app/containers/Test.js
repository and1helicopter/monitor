import React, { Component } from 'react';
import FormLabel from '@material-ui/core/FormLabel'
// import '../styles/style.css';

class Test extends Component<Props> {
    render(){
        return(
            <div className="mainContent">
                <FormLabel className="label">Text</FormLabel >
            </div>   
        );
    }
}


// MiniContent.propTypes = {
//     journal: PropTypes.string.isRequired,
//     monitor: PropTypes.string.isRequired,
//     settings: PropTypes.string.isRequired
// };
  
export default (Test);

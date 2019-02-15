import React, { Component } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import ToolbarWithBack from '../components/ToolBarWithBack';

// import '../styles/style.css';

class JournalTemplate extends Component<Props> {
    

    render(){
        return(
            <div className="mainContent">
                <ToolbarWithBack isBack={false} name="journal"/>
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
  
export default (JournalTemplate);
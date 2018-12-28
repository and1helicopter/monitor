import React, { Component } from 'react';
// import ReactDOM, { render } from 'react-dom';
import { MuiThemeProvider} from '@material-ui/core/styles';
import Monitor from './Monitor';
import theme from '../themes/theme';

type Props = {
    children: React.Node
};

export default class App extends Component<Props>{
    props: Props;

    render(){
        const { children } = this.props;
        return(
            <MuiThemeProvider theme={theme}>
                <React.Fragment>{children}</React.Fragment>
                <Monitor journal="Журнал" monitor="Монитор" settings="Параметры" />
            </MuiThemeProvider>
        );
    };
}
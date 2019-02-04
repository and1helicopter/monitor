import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Datum from '../../app/components/Datum';

test('render Datum',()=>{
    const component = renderer.create(
        <Datum
            name={"value"} 
            value={10} 
            units={"A"} 
            toggleDatum={()=>{}}
            isEditable = {false}
            edit = {() => {}}
            style = {true}
        />  
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
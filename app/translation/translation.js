// import { store} from '../store/configureStore';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = store => {
    console.log("store.app.lang"); // посмотрим, что же у нас в store?
    console.log(store.app.lang); // посмотрим, что же у нас в store?
    return store.app.lang;
}

export default function(){
     store => {return store.app.lang}
};

function xxx(){
    return "xxx"
}


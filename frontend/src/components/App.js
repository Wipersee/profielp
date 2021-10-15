import React, { Component } from 'react';
import { render } from "react-dom";
import { Calendar } from 'antd';

const App = () => {
    return <Calendar/>
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
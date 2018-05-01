import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Panel, PanelGroup, Form, FormGroup, InputGroup, FormControl, ControlLabel, Accordion, Badge, Glyphicon, Modal } from 'react-bootstrap';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Header from './components/Header.js';
import Recipes from './components/Recipes.js';


class App extends React.Component {
  constructor(props) {
    super(props);
  } 
  
  render () {
    return (
      <div className="app">
        <Header />  
        <Recipes />
      </div>
    );
  };
};


ReactDOM.render(<App />, document.getElementById('app'));
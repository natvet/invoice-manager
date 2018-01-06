import React, { Component } from 'react';
import FormComponent from './FormComponent.js';
import Logo from './Logo.js';
import { Card, Menu } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  state={activeItem: 'enter'}

  render() {
    return (
      <div className="c-App">
        <Menu pointing secondary>
          <Menu.Item><Logo/></Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name='enter invoice' active={this.state.activeItem === 'enter'}/>
            <Menu.Item name='manage invoices' active={this.state.activeItem === 'manage'}/>
          </Menu.Menu>
        </Menu>
        <Card className='c-Form' fluid>
          <Card.Content>
            <FormComponent/>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default App;

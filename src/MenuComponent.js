import React, { Component } from 'react';
import Logo from './Logo.js';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class MenuComponent extends Component {

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item><Logo/></Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item
            name='enter invoice'
            active={this.props.history.location.pathname === '/'}
            as={Link}
            to='/'
          />
          <Menu.Item
            name='manage invoices'
            active={this.props.history.location.pathname === '/manage'}
            as={Link}
            to='/manage'
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(MenuComponent);

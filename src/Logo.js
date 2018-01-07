import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Logo.css';

class Logo extends Component {

  render() {
    return (
      <Link className='c-Logo' to='/'>
        <Icon name='tasks'/>
        <span>Invoice Manager</span>
      </Link>
    );
  }
}

export default Logo;

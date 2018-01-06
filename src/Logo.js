import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import './Logo.css';

class Logo extends Component {

  render() {
    return (
      <div className='c-Logo'>
        <Icon name='tasks'/>
        <span>Invoice Manager</span>
      </div>
    );
  }
}

export default Logo;

import React from 'react';
import BaseComponent from 'blocks/BaseComponent';
import './Navbar.scss';

export default class Navbar extends BaseComponent {
  render(){
    return <div>{ this.props.children }</div>
  }
}
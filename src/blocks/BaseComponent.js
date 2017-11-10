import React, { Component } from 'react';

export default class BaseComponent extends Component {
  render(){
    return <div>{ this.props.children }</div>    
  }
}
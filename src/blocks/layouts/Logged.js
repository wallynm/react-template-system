import React from 'react';
import BaseComponent from 'blocks/BaseComponent';
import { Navbar } from 'blocks/components/navbar';

export default class Logged extends BaseComponent {
  render(){
    return (
      <div>
        <Navbar>
          Teste
        </Navbar>
      </div>
    )
  }
}
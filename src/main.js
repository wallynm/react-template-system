import React from 'react';
import ReactDOM from 'react-dom';
import { Logged } from 'blocks/layouts';
import 'styles/main.scss';

const template = 'clubx';
import bundle from './templates/clubx/Navigator.bundle.js';
console.info(bundle)


bundle((file) => {
  alert('aa')
})

ReactDOM.render(<Logged/>, document.getElementById('root'));

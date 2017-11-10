import React from 'react';
import ReactDOM from 'react-dom';
import { Logged } from 'blocks/layouts';
import 'styles/main.scss';

var qs = (function(a) {
  if (a == "") return {};
  var b = {};
  for (var i = 0; i < a.length; ++i)
  {
      var p=a[i].split('=', 2);
      if (p.length == 1)
          b[p[0]] = "";
      else
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
})(window.location.search.substr(1).split('&'));
const template = qs["theme"];

function loadPage(template, callback) {
  try {
    // var templateBundle = require("bundle-loader?lazy!./templates/" + template + "/index.js")
    var templateBundle = require("bundle-loader?lazy&name=[name]!./templates/" + template + "/" + template + ".bundle.js");
  } catch(e) {
    return callback(e);
  }
  templateBundle(function(tpl) { callback(null, tpl); })
}

function loadAsyncStyleSheets(style) {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  var rel = document.createAttribute('rel');
  var href = document.createAttribute('href');

  rel.value = 'stylesheet';
  href.value = style;

  link.setAttributeNode(rel);
  link.setAttributeNode(href); 

  head.appendChild(link);
}

loadAsyncStyleSheets('./.build/templates/' + template + '.css');

loadPage(template, (a, b)=>{
  console.info(a,b);
  ReactDOM.render(<b.Navigator/>, document.getElementById('root'));
})


// const template = './templates/clubx';
// const template = 'templates/default';


// require.ensure(['./templates/clubx', './templates/academy', './templates/default'], function(require) {
//   let Template = require('./templates/clubx')
//   ReactDOM.render(<Template.Navigator/>, document.getElementById('root'));
// })




// const loadTemplate = function(tpl, callback) {
//   if(tpl === 'clubx'){
//     console.log('clubx!')
//     import bundle from 'templates/clubx.bundle.js';
//     bundle((file))
//     const waitFor = require('bundle-loader?lazy&./templates/clubx');
//     waitFor(callback);
//   }  
//   if(tpl === 'academy'){
//     const waitFor = require('bundle-loader?lazy!./templates/academy');
//     waitFor(callback);
//   }
// } 

// loadTemplate(template, ()=>{
//   let Template = require('./templates/clubx')
//   ReactDOM.render(<Template.Navigator/>, document.getElementById('root'));
// })




// const a = require(`bundle-loader!./templates/`);
// const b = require("bundle-loader!./templates/academy");
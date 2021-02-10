// import App from './components/App';
import React from 'react';
import Router from './components/Router';
import { render } from 'react-dom';
import './css/style.css';

// render(<App />, document.querySelector('#main'));
// render(<Tick input="inputX" />, document.getElementById('elementx'));

// function renderTick() {
//   let count = 0;
//   return function () {
//     render(<Tick input={count++} />, document.getElementById('elementx'));
//   };
// }
// setInterval(renderTick(), 1000);

render(
  <>
    {/* <App /> */}
    <Router />
  </>,
  document.getElementById('main')
);

// render(
//   <>
//     <Playground />
//   </>,
//   document.querySelector('#playground')
// );

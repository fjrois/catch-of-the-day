import React from 'react';
import Clock from './playground/Clock';
import ItemsList from './playground/ItemsList';
import LoginControl from './playground/LoginControl';
import SampleForm from './playground/SampleForm';
// import Tick from './playground/Tick';
import Toggle from './Toggle';

function Playground() {
  return (
    <>
      <div>
        <Clock />
        <Clock />
      </div>
      <div>
        <Toggle />
      </div>
      <div>
        <LoginControl />
      </div>
      <div>
        <ItemsList list={[3245, 4356, 23, 678]} />
      </div>
      <div>
        <SampleForm />
      </div>
    </>
  );
}

export default Playground;

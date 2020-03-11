import React from 'react';
import './App.css';
import './SpaceDatetimePicker.css';
import SpaceDatetimePicker from './SpaceDatetimePicker';

function App() {
  return (
    <div className="App">

      <SpaceDatetimePicker
        onChange={e => { console.log('onchange = ', e); }}
        hour12={true}
        locale={'en-US'}
        weekday={'short'}
        month={'long'}
        placeholder={'toto'}
        format={'DD/MM/YYYY HH:mm:ss'}
        showTime={true}></SpaceDatetimePicker>
    </div>
  );
}

export default App;

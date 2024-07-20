import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const buildIncrementArray = () => {
    const array = [];
    for (let i = 0; i <= 1440; i += 30) {
      array.push(i);
    }
    return array;
  }

  return (
    <div className="App">
      <h1>Calculate Sleep Score</h1>
      <div>
        <label htmlFor="durationInBed">Duration in bed:</label>
        <select name="durationInBed" id="durationInBed">
          { buildIncrementArray().map((increment) => {
            return <option value={increment}>{increment/60} hours</option>
          })}
        </select>
        
        <label htmlFor="durationAsleep">Duration in bed:</label>
        <select name="durationAsleep" id="durationAsleep">
          { buildIncrementArray().map((increment) => {
            return <option value={increment}>{increment/60} hours</option>
          })}
        </select>
      </div>
    </div>
  );
}

export default App;

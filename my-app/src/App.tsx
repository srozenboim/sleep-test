import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [durationInBed, setDurationInBed] = React.useState();
  const [durationAsleep, setDurationAsleep] = React.useState();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const buildIncrementArray = () => {
    const array = [];
    for (let i = 0; i <= 1440; i += 30) {
      array.push(i);
    }
    return array;
  }

  const handleDurationInBedChange = (e: React.ChangeEvent<any>) => {
    if (!durationInBed) {
      setDurationInBed(e.target.value);
    }
  };


  const handleDurationAsleepChange = (e: React.ChangeEvent<any>) => {
    if (!durationAsleep) {
      setDurationAsleep(e.target.value);
    }
  };

  return (
    <div className="App">
      <h1>Calculate Sleep Score</h1>
      <div>
        <label htmlFor="durationInBed">Duration in bed:</label>
        <select name="durationInBed" id="durationInBed" onChange={(e) => handleDurationInBedChange(e)}>
          <option value="" selected>Select...</option>
          { buildIncrementArray().map((increment) => {
            return <option value={increment}>{increment/60} hours</option>
          })}
        </select>
        
        <label htmlFor="durationAsleep">Duration asleep:</label>
        <select name="durationAsleep" id="durationAsleep">
          <option value="" selected>Select...</option>
          { buildIncrementArray().map((increment) => {
            return <option value={increment}>{increment/60} hours</option>
          })}
        </select>
      </div>
      <button disabled={buttonDisabled}>Calculate</button>
    </div>
  );
}

export default App;

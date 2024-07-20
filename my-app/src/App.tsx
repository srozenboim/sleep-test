import React from 'react';
import logo from './logo.svg';
import HoursDropdown from './Dropdown';
import './App.css';

function App() {
  const [durationInBed, setDurationInBed] = React.useState();
  const [durationAsleep, setDurationAsleep] = React.useState();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  React.useEffect(() => {
    if(durationInBed && durationAsleep && durationInBed >= 0 && durationAsleep >= 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [durationAsleep, durationInBed])

  const buildIncrementArray = () => {
    const array = [];
    for (let i = 0; i <= 1440; i += 30) {
      array.push(i);
    }
    return array;
  }

  const handleDurationInBedChange = (e: React.ChangeEvent<any>) => {
    console.log(e.target.value)
    setDurationInBed(e.target.value);
  };


  const handleDurationAsleepChange = (e: React.ChangeEvent<any>) => {
    setDurationAsleep(e.target.value);
  };

  return (
    <div className="App">
      <h1>Calculate Sleep Score</h1>
      <div>
        <HoursDropdown label="Duration in bed:" dropdownName="durationInBed" onChange={handleDurationInBedChange} options={buildIncrementArray()}/>
        <HoursDropdown label="Duration asleep:" dropdownName="durationAsleep" onChange={handleDurationAsleepChange} options={buildIncrementArray()}/>
      </div>
      <button disabled={buttonDisabled}>Calculate</button>
    </div>
  );
}

export default App;

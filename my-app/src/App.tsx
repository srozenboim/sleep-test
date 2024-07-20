import React from 'react';
import logo from './logo.svg';
import HoursDropdown from './Dropdown';
import axios from 'axios';
import './App.css';

function App() {
  const [durationInBed, setDurationInBed] = React.useState<undefined | number>();
  const [durationAsleep, setDurationAsleep] = React.useState<undefined | number>();
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<undefined | string>();

  React.useEffect(() => {
    if(durationInBed && durationAsleep && durationInBed >= 0 && durationAsleep >= 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [durationAsleep, durationInBed])

  const buildIncrementArray = (): number[] => {
    const array = [];
    for (let i = 0; i <= 1440; i += 30) {
      array.push(i);
    }
    return array;
  }

  const handleDurationInBedChange = (e: React.ChangeEvent<any>) => {
    setDurationInBed(e.target.value);
  };


  const handleDurationAsleepChange = (e: React.ChangeEvent<any>) => {
    setDurationAsleep(e.target.value);
  };

  const submitScore = async (score: number) => {
    try {
      const res = await axios.post('http://localhost:5001/api/submit', { number: score });
      setMessage(res.data.success ? `Sleep score: ${score.toString()}` : 'Something went wrong');
    } catch (error) {
      setMessage('Something went wrong');
    }
  }

  const calculateScore = () => {
    if(durationAsleep && durationInBed) {
      setMessage("Loading...")
      let score;
      if(durationAsleep == 0 || durationInBed == 0) {
        score = 0
      } else {
        score = 100 * (durationAsleep/durationInBed);
      } 
      submitScore(score);
    }
  }

  return (
    <div className="App">
      <h1>Calculate Sleep Score</h1>
      <div>
        <HoursDropdown label="Duration in bed:" dropdownName="durationInBed" onChange={handleDurationInBedChange} options={buildIncrementArray()}/>
        <HoursDropdown label="Duration asleep:" dropdownName="durationAsleep" onChange={handleDurationAsleepChange} options={buildIncrementArray()}/>
      </div>
      <button disabled={buttonDisabled} onClick={calculateScore}>Calculate</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

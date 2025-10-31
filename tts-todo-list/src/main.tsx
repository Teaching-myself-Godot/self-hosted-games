import './index.css'

import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './App.tsx'
import { store } from './store.ts';
import { setMinutesLeft, toTime } from './components/departureTimeSlice.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);

function makeMessage(tooLate : boolean, delta : number, name : string, activity : string) {
    const deltaSeconds = Math.floor(delta / 1000);
    const deltaMinutes = Math.floor(delta / 60 / 1000);
    const deltaHours = Math.floor(delta / 60 / 60 / 1000);
    const realMinutesLeft = deltaMinutes - (deltaHours * 60);
    const realSecondsLeft = deltaSeconds - (deltaMinutes * 60);
    if (deltaMinutes === 0) {
      return `${name}, ${tooLate ? "je bent nu" : "je hebt nog"} ${realSecondsLeft === 1 ? `${realSecondsLeft} seconde` : `${realSecondsLeft} seconden`}${tooLate ? " te laat" : ""}, ${activity}`;
    } else {
      return `${name}, ${tooLate ? "je bent nu" : "je hebt nog"} ${deltaHours > 0 ? `${deltaHours} uur en ` : ""}${realMinutesLeft === 1 ? `${realMinutesLeft} minuut` : `${realMinutesLeft} minuten`}${tooLate ? " te laat" : ""}, ${activity}`;
    }
}

setInterval(() => {
  const now = new Date();
  const targetTime = new Date();
  const { departureTime, storedMinutesLeft } = store.getState().departureTime
  const [hrs, mins] = toTime(departureTime);

  targetTime.setHours(hrs)
  targetTime.setMinutes(mins)
  targetTime.setSeconds(0);
  targetTime.setMilliseconds(0);
  const tooLate = targetTime.getTime() < now.getTime();
  const delta = tooLate ? now.getTime() - targetTime.getTime() : targetTime.getTime() - now.getTime();
  const deltaMinutes = Math.floor(delta / 60 / 1000);
  const deltaSeconds = Math.floor(delta / 1000);
  if ((deltaMinutes === 0 && !tooLate &&  deltaSeconds % 10 === 0) || deltaMinutes !== storedMinutesLeft) {
    console.warn(makeMessage(tooLate, delta, "Chris", "kleed je aan"))
  }
  store.dispatch(setMinutesLeft(deltaMinutes));

}, 1000);
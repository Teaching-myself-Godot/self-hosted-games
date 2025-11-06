import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface DepartureTimeState {
    departureTime : string
    storedSecondsLeft : number
    personName : string
    endGoal : string
}

const DEP_TIME_KEY = "deptime";
const KID_KEY = "naampje";
const END_GOAL_KEY = "doello";

const initialState : DepartureTimeState = {
    departureTime: localStorage.getItem(DEP_TIME_KEY) ?? "08:00",
    storedSecondsLeft: -1,
    personName : localStorage.getItem(KID_KEY) ?? "Kind",
    endGoal : localStorage.getItem(END_GOAL_KEY) ?? "totdat je weg moet"
};

export const isValidTime = (payload : string) => {
    if (payload.match(/^\d\d:\d\d$/)) {
        const [hrs, mins] = payload.split(":");
        if (parseInt(hrs) < 24 && parseInt(mins) < 60) {
            return true;
        }
    }
    return false;
}

export const toTime = (payload : string) => {
    const [hrs, mins] = payload.split(":");

    return [parseInt(hrs), parseInt(mins)]
}

export const departureTimeSlice = createSlice({
    name: 'departureTime',
    initialState,
    reducers: {
        setDepartureTime(state, { payload } : { payload : string}) {
            if (isValidTime(payload)) {
                state.departureTime = payload
                localStorage.setItem(DEP_TIME_KEY, payload);
            }
        },
        setPersonName(state, { payload }) {
            state.personName = payload
            localStorage.setItem(KID_KEY, payload);
        },
        setSecondsLeft(state, { payload }) {
            state.storedSecondsLeft = payload
        },
        setEndGoal(state, { payload }) {
            state.endGoal = payload
            localStorage.setItem(END_GOAL_KEY, payload)
        }
    }
});

export const { setDepartureTime, setSecondsLeft, setPersonName, setEndGoal  } = departureTimeSlice.actions;
export const selectDepartureTime = (state : RootState) => state.departureTime;
export default departureTimeSlice.reducer;
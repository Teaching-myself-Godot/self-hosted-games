import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface DepartureTimeState {
    departureTime : string
    storedMinutesLeft : number
    personName : string
}

const DEP_TIME_KEY = "deptime";
const KID_KEY = "naampje";
const initialState : DepartureTimeState = {
    departureTime: localStorage.getItem(DEP_TIME_KEY) ?? "08:00",
    storedMinutesLeft: -1,
    personName : localStorage.getItem(KID_KEY) ?? "Kind"
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
        setMinutesLeft(state, { payload }) {
            state.storedMinutesLeft = payload
        }
    }
});

export const { setDepartureTime, setMinutesLeft, setPersonName  } = departureTimeSlice.actions;
export const selectDepartureTime = (state : RootState) => state.departureTime;
export default departureTimeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface DepartureTimeState {
    departureTime : string
}

const DEP_TIME_KEY = "deptime";
const initialState : DepartureTimeState = {
    departureTime: localStorage.getItem(DEP_TIME_KEY) ?? "08:00"
};

export const isValidTime = (payload : string) => {
    console.log(payload)
    if (payload.match(/^\d\d:\d\d$/)) {
        const [hrs, mins] = payload.split(":");
        if (parseInt(hrs) < 24 && parseInt(mins) < 60) {
            return true;
        }
    }
    return false;
}

export const departureTimeSlice = createSlice({
    name: 'departureTime',
    initialState,
    reducers: {
        setDepartureTime(state, { payload } : { payload : string}) {
            if (isValidTime(payload)) {
                
                state.departureTime = payload
            }
        }
    }
});

export const { setDepartureTime  } = departureTimeSlice.actions;
export const selectDepartureTime = (state : RootState) => state.departureTime;
export default departureTimeSlice.reducer;
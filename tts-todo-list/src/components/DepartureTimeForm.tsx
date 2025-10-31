import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store"
import { isValidTime, selectDepartureTime, setDepartureTime } from "./departureTimeSlice"
import { selectCredentials } from "./superSafeCredentialsSlice";

export function DepartureTimeForm() {
    const dispatch = useAppDispatch();
    const { unlocked } = useAppSelector(selectCredentials)
    const { departureTime } = useAppSelector(selectDepartureTime);
    const [newTime, setNewTime] = useState<string>(departureTime);

    
    return unlocked ? (
        <>
        <div>Vertrektijd aanpassen (huidig: {departureTime})</div>
        <form onSubmit={(ev) => {ev.preventDefault(); dispatch(setDepartureTime(newTime))}}>
            <input type="text" disabled={!unlocked} value={newTime} onChange={(ev) => setNewTime(ev.target.value)}/>
            <button type="submit" disabled={!unlocked || !isValidTime(newTime)}>Ok</button>
        </form>
        </>
    ) : <div>Vertrektijd: {departureTime}</div>
}
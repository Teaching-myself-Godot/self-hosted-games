import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store"
import { isValidTime, selectDepartureTime, setDepartureTime, setPersonName } from "./departureTimeSlice"
import { selectCredentials } from "./superSafeCredentialsSlice";

export function DepartureTimeForm() {
    const dispatch = useAppDispatch();
    const { unlocked } = useAppSelector(selectCredentials)
    const { departureTime, personName } = useAppSelector(selectDepartureTime);
    const [newTime, setNewTime] = useState<string>(departureTime);
    const [newName, setNewName] = useState<string>(personName)
    
    return unlocked ? (
        <>
        <div><label htmlFor="naam">Naam aanpassen (is: {personName})</label></div>
        <form onSubmit={(ev) => {ev.preventDefault(); dispatch(setPersonName(newName))}}>
            <input autoComplete="none"  id="naam" type="text" disabled={!unlocked} value={newName} onChange={(ev) => setNewName(ev.target.value)}/>
            <button type="submit" disabled={!unlocked || newName.length < 2}>Ok</button>
        </form>
        <div><label htmlFor="vtijd">Vertrektijd aanpassen (huidig: {departureTime})</label></div>
        <form onSubmit={(ev) => {ev.preventDefault(); dispatch(setDepartureTime(newTime))}}>
            <input autoComplete="none"  id="vtijd" type="text" disabled={!unlocked} value={newTime} onChange={(ev) => setNewTime(ev.target.value)}/>
            <button type="submit" disabled={!unlocked || !isValidTime(newTime)}>Ok</button>
        </form>
        </>
    ) : (<>
        <div>{personName}, vertrektijd: {departureTime}</div>
    </>)
}
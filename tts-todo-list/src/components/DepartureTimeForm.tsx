import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store"
import { isValidTime, selectDepartureTime, setDepartureTime, setEndGoal, setPersonName } from "./departureTimeSlice"
import { selectCredentials } from "./superSafeCredentialsSlice";

export function DepartureTimeForm() {
    const dispatch = useAppDispatch();
    const { unlocked } = useAppSelector(selectCredentials)
    const { departureTime, personName, endGoal } = useAppSelector(selectDepartureTime);
    const [newTime, setNewTime] = useState<string>(departureTime);
    const [newName, setNewName] = useState<string>(personName)
    const [newEndGoal, setNewEndGoal] = useState<string>(endGoal)

    return unlocked ? (
        <>
        <div><label htmlFor="naam">Naam aanpassen (is: {personName})</label></div>
        <form onSubmit={(ev) => {ev.preventDefault(); dispatch(setPersonName(newName))}}>
            <input autoComplete="none"  id="naam" type="text" disabled={!unlocked} value={newName} onChange={(ev) => setNewName(ev.target.value)}/>
            <button type="submit" disabled={!unlocked || newName.length < 2}>Ok</button>
        </form>
        <div><label htmlFor="vtijd">Doeltijd aanpassen (huidig: {departureTime})</label></div>
        <form onSubmit={(ev) => {ev.preventDefault(); dispatch(setDepartureTime(newTime))}}>
            <input autoComplete="none"  id="vtijd" type="text" disabled={!unlocked} value={newTime} onChange={(ev) => setNewTime(ev.target.value)}/>
            <button type="submit" disabled={!unlocked || !isValidTime(newTime)}>Ok</button>
        </form>
        <div><label htmlFor="doelding">Einddoel (is: "{endGoal}")</label></div>
        <form onSubmit={(ev) => {ev.preventDefault(); dispatch(setEndGoal(newEndGoal))}}>
            <input autoComplete="none"  id="doelding" type="text" disabled={!unlocked} value={newEndGoal} onChange={(ev) => setNewEndGoal(ev.target.value)}/>
            <button type="submit">Ok</button>
        </form>
        </>
    ) : (<>
        <div>{personName}, vertrektijd: {departureTime}</div>
    </>)
}
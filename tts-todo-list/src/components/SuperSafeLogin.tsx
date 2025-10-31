import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { selectCredentials, setLock, setSuperSecretPassword, unlock } from "./superSafeCredentialsSlice";

export function SuperSafeLogin() {
    const dispatch = useAppDispatch();
    const { superSecretPassword, unlocked } = useAppSelector(selectCredentials)
    const [ passwd, setPasswd ] = useState<string>("");

    if (!superSecretPassword) {
        return (
            <form style={{position: "fixed", zIndex: "1000", top: "0", left: "0", height: "100%", width: "100%", backgroundColor: "black"}} onSubmit={(ev) => {ev.preventDefault(); dispatch(setSuperSecretPassword(passwd)); setPasswd("")}}>
                <input type="password" autoComplete="none" placeholder="Maak een ontgrendelwachtwoord..." onChange={(ev) => setPasswd(ev.target.value)}/>
                <button type="submit" disabled={passwd.length < 3}>
                    OK
                </button>
            </form>
        )
    }
    if (unlocked) {
        return (
            <button type="button" onClick={() => {dispatch(setLock()); setPasswd("")} }>
                Vergrendel
            </button>
        )
    }
    return (
        <form onSubmit={(ev) => {ev.preventDefault(); dispatch(unlock(passwd)); setPasswd("") }}>
            <input type="password" autoComplete="none" placeholder="Ontgrendelwachtwoord..." onChange={(ev) => setPasswd(ev.target.value)}/>
            <button type="submit" disabled={passwd !== superSecretPassword}>Ontgrendel</button>
        </form>
    );
}
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CredentialsState {
    superSecretPassword? : string
    unlocked : boolean
}

const SUPERSECRETPASSWORDKEY = "supersecretpassword";
const initialState : CredentialsState = {
    superSecretPassword: localStorage.getItem(SUPERSECRETPASSWORDKEY) ?? undefined,
    unlocked: false
};

export const superSafeCredentialsSlice = createSlice({
    name: 'credentials',
    initialState,
    reducers: {
        setSuperSecretPassword(state, { payload }) {
            state.superSecretPassword = payload;
            localStorage.setItem(SUPERSECRETPASSWORDKEY, payload);
        },
        unlock(state, { payload }) {
            if (state.superSecretPassword && payload === state.superSecretPassword) {
                state.unlocked = true;
            } else {
                state.unlocked = false;
            }
        },
        setLock(state) {
            state.unlocked = false;
        }
    }
});

export const { setSuperSecretPassword, unlock, setLock } = superSafeCredentialsSlice.actions;
export const selectCredentials = (state : RootState) => state.credentials;
export default superSafeCredentialsSlice.reducer;
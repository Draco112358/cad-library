import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UsersState = {
    userName: string|undefined,
    userRole: string|undefined
}

const initialState: UsersState = {
    userName: undefined,
    userRole: undefined
}

export const UsersSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        //qui vanno inserite le azioni
        setUser(state: UsersState, action: PayloadAction<{userName: string, userRole: string}>){
            state.userName = action.payload.userName
            state.userRole = action.payload.userRole
        },
        unsetUser(state: UsersState){
            state.userName = undefined
            state.userRole = undefined
        }
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
    }
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    setUser, unsetUser
} = UsersSlice.actions

export const usersStateSelector = (state: { user: UsersState }) => state.user;
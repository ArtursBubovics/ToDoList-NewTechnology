import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IHeaderMenuState from '../../Models/Interfaces/IHeaderMenuState';

const initialState: IHeaderMenuState = {
    isArchiveOpen: false,
    isNotificationOpen: false
}

export const headerMenuSlice = createSlice({
    name: 'headerMenu',
    initialState,
    reducers: {
        setArchiveValue(state, action: PayloadAction<boolean>){
            state.isArchiveOpen = action.payload;
        },
        setNotficationOpenValue(state, action: PayloadAction<boolean>){
            state.isNotificationOpen = action.payload;
        }
    }
})

export const {setArchiveValue} = headerMenuSlice.actions;
export const {setNotficationOpenValue} = headerMenuSlice.actions;

export default headerMenuSlice.reducer;
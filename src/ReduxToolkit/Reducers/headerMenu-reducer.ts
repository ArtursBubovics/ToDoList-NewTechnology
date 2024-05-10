import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IHeaderMenuState } from '../../Models/Interfaces/IHeaderMenuState';

const initialState: IHeaderMenuState = {
    isArchiveOpen: false
}

export const headerMenuSlice = createSlice({
    name: 'headerMenu',
    initialState,
    reducers: {
        setArchiveValue(state, action: PayloadAction<boolean>){
            state.isArchiveOpen = action.payload;
        }
    }
})

export const {setArchiveValue} = headerMenuSlice.actions;

export default headerMenuSlice.reducer;
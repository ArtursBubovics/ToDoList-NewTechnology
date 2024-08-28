import { createSlice } from '@reduxjs/toolkit'
import IMenuState from '../../Models/Interfaces/IMenuState';

const initialState: IMenuState = {
    isOpen: true
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuSize(state){
            state.isOpen = !state.isOpen;
        }
    }
})

export const {setMenuSize} = menuSlice.actions;

export default menuSlice.reducer;
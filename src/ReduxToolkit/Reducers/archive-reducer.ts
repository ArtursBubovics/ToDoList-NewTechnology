import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IArchiveState } from '../../Models/Interfaces/IArchiveState';

const initialState: IArchiveState = {
    isOpen: false
}

export const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {
        setArchiveValue(state, action: PayloadAction<boolean>){
            state.isOpen = action.payload;
        }
    }
})

export const {setArchiveValue} = archiveSlice.actions;

export default archiveSlice.reducer;
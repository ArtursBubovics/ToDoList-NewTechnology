import { createSlice } from '@reduxjs/toolkit'
import IProfileDataState from '../../Models/Interfaces/IProfileDataState';

const initialState: IProfileDataState = {
  name: '',
  gmail: '',
  currentPassword: '',
  newPassword: '',
}

export const profileDataSlice = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.gmail = action.payload.gmail;
    },
    setNewPasswordInfo: (state, action) => {
      state.newPassword = action.payload.newPassword;
    }, 
    setCurrentPasswordInfo: (state, action) => {
      state.currentPassword = action.payload.currentPassword;
    }
  }
})

export const { setUserInfo, setNewPasswordInfo, setCurrentPasswordInfo } = profileDataSlice.actions;

export default profileDataSlice.reducer;
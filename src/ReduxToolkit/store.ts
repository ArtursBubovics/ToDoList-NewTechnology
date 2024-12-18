import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./Reducers/menu-reducer";
import headerMenuReducer from "./Reducers/headerMenu-reducer";
import profileDataReducer from "./Reducers/profileData-reducer";

const store = configureStore({
    reducer:{
        menu: menuReducer,
        headerMenu: headerMenuReducer,
        profile: profileDataReducer,
    }
})

export default store;
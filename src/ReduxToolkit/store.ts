import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./Reducers/menu-reducer";
import headerMenuReducer from "./Reducers/headerMenu-reducer";

const store = configureStore({
    reducer:{
        menu: menuReducer,
        headerMenu: headerMenuReducer
    }
})

export default store;
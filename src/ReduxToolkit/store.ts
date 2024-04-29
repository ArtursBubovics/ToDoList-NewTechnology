import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./Reducers/menu-reducer";
import archiveReducer from "./Reducers/archive-reducer";

const store = configureStore({
    reducer:{
        menu: menuReducer,
        archive: archiveReducer
    }
})

export default store;
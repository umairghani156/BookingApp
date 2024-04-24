import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import hotelSlice from "./hotelSlice"

export const store = configureStore({
    reducer:{
        user: userSlice,
        hotel: hotelSlice
    }
},
+window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
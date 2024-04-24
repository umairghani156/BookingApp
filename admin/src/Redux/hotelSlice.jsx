import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hotel: {
        name: "marathi",
    },
    loading: false,
    error: false
}

const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers:{
        gethotelPending: (state) => {
            state.loading = true
        },
        gethotelSuccess: (state, { payload }) => {
            state.hotel = payload
            state.loading = false
            state.error = ''
        },
        gethotelFailure: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
     
    }
});

const {actions, reducer} = hotelSlice;

export const {gethotelPending, gethotelSuccess, gethotelFailure} = actions

export default reducer;
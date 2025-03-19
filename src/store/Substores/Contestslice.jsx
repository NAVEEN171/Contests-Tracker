import { createSlice } from '@reduxjs/toolkit';


const InitialState = {
    totalPages: 0,
    totalContestsMatched: 0,
    DarkMode: false,
    Page: 1,
}

const contestSlice = createSlice({
    name: 'contests',
    initialState: InitialState,
    reducers: {
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        },
        setTotalContestsMatched(state, action) {
            state.totalContestsMatched = action.payload;
        },
        setDarkMode(state, action) {
            state.DarkMode = action.payload;
        },
        setPage(state, action) {
            state.Page = action.payload;
        }

    }
});

export const contestActions = contestSlice.actions;
export const contestSliceReducer = contestSlice.reducer;
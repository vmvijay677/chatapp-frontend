import { createSlice } from "@reduxjs/toolkit";
import appApi from "../Services/appApi";

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addNotifications: (state, { payload }) => {
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, { payload }) => {
            delete state.newMessages[payload];
        },
    },

    extraReducers: (builder) => {
        //saving user after signup
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload);

        //saving user after login
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => payload);

        //logout user
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
    },
});

export const { addNotifications, resetNotifications } = userSlice.actions;

export default userSlice.reducer;
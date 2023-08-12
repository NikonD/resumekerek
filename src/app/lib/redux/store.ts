import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "lib/redux/resumeSlice";
import settingsReducer from "lib/redux/settingsSlice";
import loginReducer from "lib/redux/loginSlice"

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    settings: settingsReducer,
    login: loginReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

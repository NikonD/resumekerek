// store.js
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  topNavBarOpen: false,
  authContainerOpen: false,
};

// Define reducer to handle state updates
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_TOPNAVBAR_OPEN':
      return { ...state, topNavBarOpen: action.payload };
    case 'SET_AUTHCONTAINER_OPEN':
      return { ...state, authContainerOpen: action.payload };
    default:
      return state;
  }
};

// Create Redux store using configureStore
const store = configureStore({
  reducer,
});

export default store;

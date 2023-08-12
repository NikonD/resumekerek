import { createSlice } from "@reduxjs/toolkit";
import { IUserData } from "./types";
import { useDispatch } from "react-redux";
import { RootState } from "./store";

export const initialUserData: IUserData = {
  islogin: false,
  fullname: "",
  email: "",
  plan: "",
  active_until: new Date(),
};

export const initialLoginState = {
  user: initialUserData,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    changeUser: (state, action) => {
      // Реализация редюсера changeUser
      // Мы будем использовать payload, переданный в action, чтобы обновить данные пользователя
      state.user = action.payload;
    },

    loginUser: (state, action) => {
      // Реализация редюсера loginUser
      // Этот редюсер может устанавливать значения в state для залогиненного пользователя
      const { fullname, email, plan, active_until } = action.payload;
      state.user = {
        islogin: true,
        fullname,
        email,
        plan,
        active_until,
      };
      // if (fullname && email && plan && active_until) {
      //   
      // } else {
      //   state.user = {
      //     islogin: false
      //   } ; // Устанавливаем user в undefined, если данные неполные или пустые
      // }

    },

    logoutUser: (state) => {
      // Реализация редюсера logoutUser
      // Этот редюсер сбрасывает пользователя в начальное состояние
      state.user = {
        islogin: false,
      };
      localStorage.removeItem("token")
    }
  }
})

export const { changeUser, loginUser, logoutUser } = loginSlice.actions;

// Создание хука useSelector для доступа к данным пользователя
export const selectUser = (state: RootState) => state.login.user;

// Создание хука useDispatch для отправки действий
export const useLoginDispatch = () => {
  const dispatch = useDispatch();
  return {
    changeUser: (user: IUserData) => dispatch(changeUser(user)),
    loginUser: (user: IUserData) => dispatch(loginUser(user)),
    logoutUser: () => dispatch(logoutUser()),
  };
};


export default loginSlice.reducer
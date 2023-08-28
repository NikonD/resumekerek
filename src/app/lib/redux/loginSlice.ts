import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserData } from "./types";
import { useDispatch } from "react-redux";
import { RootState } from "./store";

export const initialUserData: IUserData = {
  id: 0,
  islogin: false,
  photo: "",
  fullname: "",
  language: "ru",
  address: "",
  phone: "",
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
    autoLogin: () => {

    },

    changeUser: (state, action) => {
      // Реализация редюсера changeUser
      // Мы будем использовать payload, переданный в action, чтобы обновить данные пользователя
      state.user = action.payload;
    },

    loginUser: (state, action) => {
      // Реализация редюсера loginUser
      // Этот редюсер может устанавливать значения в state для залогиненного пользователя
      const { id, fullname, email, plan, active_until, address, language, phone, photo } = action.payload;
      state.user = {
        id,
        islogin: true,
        fullname,
        email,
        plan,
        phone,
        address,
        language,
        photo,
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
        id: 0,
        islogin: false,
        photo: "",
        fullname: "",
        language: "ru",
        address: "",
        phone: "",
        email: "",
        plan: "",
        active_until: new Date(),
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
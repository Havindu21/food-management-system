import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userType: "educator",
    token: {
      key: false,
    },

    userData : false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setToken, setUserType,setUserData } = userSlice.actions;

export default userSlice.reducer;

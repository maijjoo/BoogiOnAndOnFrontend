import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil";
import { loginPost } from "../api/memberApi";

const initState = {
  email: "",
  username: "",
  roleNames: [],
  isLoading: false,
  error: null,
};

export const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  if (memberInfo && memberInfo.username) {
    memberInfo.username = decodeURIComponent(memberInfo.username);
  }
  return memberInfo || initState;
};

export const loginPostAsync = createAsyncThunk(
  "login/loginPost",
  async (param, { rejectWithValue }) => {
    try {
      const response = await loginPost(param);

      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: loadMemberCookie(),
  reducers: {
    login: (state, action) => {
      console.log("login.....");
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      console.log("logout....");
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled...");

        const payload = action.payload;

        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1);
          console.log(payload);

          state.username = payload.username;
          state.role = payload.roleNames[0];
          state.name = payload.name;
          state.workGroup = payload.workGroup;
          state.department =
            payload.roleNames[0] === "Admin" ? payload.department : null;
          state.vehicleCapacity = payload.vehicleCapacity;
          state.managerId = payload.managerId;
        }
        state.isLoading = false;
        state.error = payload.error;
      })
      .addCase(loginPostAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("pending...");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected...");
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

const userSlice = createSlice({
  initialState,
  name: "userId",
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;

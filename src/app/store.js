import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../features/userDetailSlice";
import employeeDetail from "../features/employeeDetailSlice";

export const store = configureStore({
  reducer: {
    userData: userDetail,  
    employeeData: employeeDetail,

  },
});

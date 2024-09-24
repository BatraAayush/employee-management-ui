import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

export const createEmployee = createAsyncThunk(
  "createEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/employee`, employeeData);
      const result = response.data.createdEmployee;
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//update employee

export const updateEmployee = createAsyncThunk(
  "updateEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const { id, name, email, mobileNo, designation, gender, course, image } =
        data;
      const response = await axios.post(`${BASE_URL}/employee/${id}`, {
        name,
        email,
        mobileNo,
        designation,
        gender,
        course,
        image,
      });
      const result = response.data.updatedEmployee;
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//read all employees
export const showEmployee = createAsyncThunk(
  "showEmployee",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/employees`);
      const result = await response.data;
      return result.employees;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete employee

export const deleteEmployee = createAsyncThunk(
  "deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/employee/${id}`);
      const result = await response.data;
      console.log(result);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//show single employee
export const showSingleEmployee = createAsyncThunk(
  "showSingleEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/employee/${id}`);
      const result = await response.data;
      console.log(result);
      return result.employee;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const employeeDetail = createSlice({
  name: "employeeDetail",
  initialState: {
    employees: [],
    employee: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
        state.error = null;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(showEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.error = null;
      })
      .addCase(showEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showSingleEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(showSingleEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(showSingleEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = {};
        state.employees = state.employees.map((emp) => {
          if (emp._id === state.employee._id) {
            return state.employee;
          } else return emp;
        });
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeDetail.reducer;

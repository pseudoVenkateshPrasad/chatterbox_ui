import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CustomAxios from '../../utility/axios';

const initialState = {
  isLoading: false,
  data: null,
  hasError: false,
  errorMessage: '', // Added for better error handling
};

export const loginApi = createAsyncThunk(
  'loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await CustomAxios.post('/loginUser', payload);

      if(response?.data?.isSuccess === true) {
        let userData = response.data?.userData;
        sessionStorage.setItem('email', userData.email);
        sessionStorage.setItem('name', userData.name);
        sessionStorage.setItem('id', userData._id);
      }
      console.log("Login Response: ",response);
      return response.data;
    } catch (error) {
      // Return a custom error message
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginApi.pending, (state) => {
      state.isLoading = true;
      state.hasError = false; // Reset error state when request starts
      state.errorMessage = ''; // Reset error message when request starts
    });
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.hasError = false; // Ensure no error state when request is successful
      state.errorMessage = ''; // Clear error message
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = action.payload; // Set error message
    });
  },
});

export default loginSlice.reducer;

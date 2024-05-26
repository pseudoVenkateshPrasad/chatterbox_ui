import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomAxios from "../../utility/axios";


const initialState = {
    isLoading: false,
    data: null,
    hasError: false,
}

export const GetAllApi = createAsyncThunk("/getAll", async () => {
    let response = await CustomAxios.get("/getAllUsers");
    return response;
})

export const getAllSlice = createSlice({
    name: "all users",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(GetAllApi.pending, (state, action) => {
            state.isLoading = true;
            state.data = null;
            state.hasError = false;
        })
        builder.addCase(GetAllApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.hasError = false;
        })
        builder.addCase(GetAllApi.rejected, (state, action) => {
            state.isLoading = false;
            state.data = null;
            state.hasError = action.payload;
        })
    }
});

export default getAllSlice.reducer;
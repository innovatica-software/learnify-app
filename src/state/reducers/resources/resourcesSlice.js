import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicGet } from '../../../utilities/apiCaller';



export const fetchResources = createAsyncThunk('resources/fetchResources', async (_, { rejectWithValue }) => {
    try {
        const response = await publicGet('/resource/get');
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response);
    }
});

export const rsesourcesSlice = createSlice({
    name: 'resources',
    initialState: {
        resource: [],
        isLoading: false,
        error: false,
        success: false,
        errorMessage: ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResources.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchResources.fulfilled, (state, action) => {
                state.resource = action.payload;
                state.isLoading = false;
                state.errorMessage = "";
                state.success = true;
            })
            .addCase(fetchResources.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.errorMessage = action.payload.data.message;
                state.resource = [];
            });
    },
});

export default rsesourcesSlice.reducer;
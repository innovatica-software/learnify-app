import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicGet } from '../../../utilities/apiCaller';



export const fetchCountries = createAsyncThunk('Countries/fetchCountries', async (_, { rejectWithValue }) => {
    try {
        const response = await publicGet('/country/get');
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response);
    }
});

export const countriesSlice = createSlice({
    name: 'Countries',
    initialState: {
        countries: [],
        isLoading: false,
        error: false,
        success: false,
        errorMessage: ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.countries = action.payload;
                state.isLoading = false;
                state.errorMessage = "";
                state.success = true;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.errorMessage = action.payload.data.message;
                state.countries = [];
            });
    },
});

export default countriesSlice.reducer;
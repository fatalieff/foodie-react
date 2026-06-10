import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFoods = createAsyncThunk("foods/fetchFoods", async () => {
  const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  return res.data.meals;
});
console.log(fetchFoods);

const foodSlice = createSlice({
  name: "foods",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        // Add a price property to each item since the API doesn't provide one
        state.items = action.payload?.map(item => ({
          ...item,
          price: (parseFloat((parseInt(item.idMeal) % 50) + 10.99)).toFixed(2)
        })) || [];
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default foodSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const exists = state.favourites.find(item => item.key === action.payload.key);
      if (!exists) {
        state.favourites.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(item => item.key !== action.payload);
    },
    clearFavourites: (state) => {
      state.favourites = [];
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;

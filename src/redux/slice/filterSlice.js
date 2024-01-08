import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = tempProducts;
    },

    // Sort by options
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let tempSortProduct = [];
      if (sort === "latest") {
        tempSortProduct = products;
      }
      if (sort === "lowest-price") {
        tempSortProduct = products.slice().sort((a, b) => a.price - b.price);
      }
      if (sort === "highest-price") {
        tempSortProduct = products.slice().sort((a, b) => b.price - a.price);
      }
      if (sort === "a-z") {
        tempSortProduct = products
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
      }

      if (sort === "z-a") {
        tempSortProduct = products
          .slice()
          .sort((a, b) => b.name.localeCompare(a.name));
      }

      state.filteredProducts = tempSortProduct;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS } = filterSlice.actions;
export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;

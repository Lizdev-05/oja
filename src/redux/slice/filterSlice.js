import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
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

    // Filter by search
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = tempProducts;
    },

    // Filter by category
    FILTER_BY_CATEGORY: (state, action) => {
      const { products, category } = action.payload;
      let tempProducts = [];
      if (category === "all") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProducts;
    },

    // Fiilter by brand
    FILTER_BY_BRAND: (state, action) => {
      const { products, brand } = action.payload;
      let tempProducts = [];
      if (brand === "all") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = tempProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  SORT_PRODUCTS,
} = filterSlice.actions;
export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;

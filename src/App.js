import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import { Home, Contact, Cart, Admin } from "./pages";

// component
import { Header, Footer } from "./components";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;

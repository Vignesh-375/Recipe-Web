import Home from "./Home.jsx";
import Cuisine from "./Cuisine.jsx";
import Searched from "./Searched.jsx";
import Recipe from "./Recipe.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";

import { AnimatePresence } from "framer-motion"; // for fading out animations 
import { Route, Routes, useLocation } from "react-router-dom";  // useLocation for the fade animation too

function Pages() {
  // contains all the pages (for routing)

  const location=useLocation()
  return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>    
      <Route path="/" element={<Home />} />
      <Route path="/Recipe_Book_App/" element={<Home />} />
      <Route path="/register/" element={<Register />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/cuisine/:type" element={<Cuisine />} />
      {/** to bind the cuisine type as a parameter to the page */}
      <Route path="/searched/:search" element={<Searched />} />
      <Route path="/recipe/:id" element={<Recipe />} />
    </Routes>
    </AnimatePresence>
  );
}

export default Pages;

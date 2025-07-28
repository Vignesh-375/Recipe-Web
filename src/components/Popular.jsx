import { useState, useEffect } from "react";

import RecipeSplide from "./RecipeSplide.jsx";
import { fetchRecipes } from "../services/apiService.jsx";

const Popular = () => {
  const fetchData = async () => {
    return fetchRecipes(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }&number=9`
    );
  };

  const [populars, setPopulars] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setPopulars(data));
  }, []);

  return (
    <>
      <h3>Popular Recipes:</h3>
      <RecipeSplide recipes={populars} />
    </>
  );
};

export default Popular;

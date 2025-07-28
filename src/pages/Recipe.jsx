import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchData, fetchRecipes } from "../services/apiService.jsx";
import {
  DetailsWrapper,
  Info,
  DetailsButton,
} from "../components/StyledComponents.jsx";
import RecipeSplide from "../components/RecipeSplide.jsx";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [similars, setSimilars] = useState([]);

  const fetchDetails = async () => {
    return fetchData(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    );
  };

  const fetchSimilars = async () => {
    // Check if cuisines and diets arrays exist and have elements
    const cuisineTag =
      details.cuisines && details.cuisines.length > 0
        ? details.cuisines.join(",")
        : "";
    const dietTag =
      details.diets && details.diets.length > 0 ? details.diets.join(",") : "";

    // Construct the API request with cuisine and diet tags
    return fetchRecipes(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }&number=9&cuisine=${cuisineTag}&diet=${dietTag}`
    );
  };

  useEffect(() => {
    fetchDetails().then((data) => setDetails(data));
    fetchSimilars().then((data) => setSimilars(data));
  }, [params.id]);

  return (
    <>
      <DetailsWrapper>
        <div>
          <h2>{details.title}</h2>
          <img src={details.image} alt={details.title} />
        </div>
        <Info>
          <DetailsButton
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </DetailsButton>
          <DetailsButton
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </DetailsButton>
          {activeTab === "instructions" && (
            <div>
              <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>{" "}
              {/** writing out an html paragraph */}
              <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
            </div>
          )}
          {activeTab === "ingredients" && (
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <p>{ingredient.original}</p>
                </li>
              ))}
            </ul>
          )}
        </Info>
      </DetailsWrapper>
      <div>
        <h3>Discover New Favorites:</h3>
        <RecipeSplide recipes={similars} />
      </div>
    </>
  );
}

export default Recipe;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, CuisineCard } from "../components/StyledComponents.jsx";

function Searched() {
  const [result, setResult] = useState([]); // will present the results to the user
  let params = useParams(); // for binding the user input to query

  useEffect(() => {
    getResults(params.search);
  }, [params.search]);

  const getResults = async (queryFor) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }&number=12&query=${queryFor}`
      );
      setResult(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Grid>
      {result.map((item) => (
        <CuisineCard key={item.id}>
          <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt={item.title} />
            <h4 style={{ textDecoration: "none", color: "black" }}>
              {item.title}
            </h4>
          </Link>
        </CuisineCard>
      ))}
    </Grid>
  );
}

export default Searched;

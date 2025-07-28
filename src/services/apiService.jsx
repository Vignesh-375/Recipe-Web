import axios from "axios";

const fetchRecipes = async (url) => {
  try {
    const response = await axios.get(url);
    console.log("API Response:", response.data);
    return response.data.recipes || []; // Ensure recipes property exists in the response
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { fetchRecipes ,fetchData};

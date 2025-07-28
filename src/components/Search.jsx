import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { FormStyle } from "./StyledComponents.jsx";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.trim() === "") {      // if an empty string submitted, route to home page
      navigate("/");
    } else {
      navigate("/searched/" + input);
    }
  };

  const triggerSearch = () => {
    submitHandler({ preventDefault: () => {} });
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <FaSearch onClick={triggerSearch} />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Find delicious recipes..."
      />
    </FormStyle>
  );
}

export default Search;

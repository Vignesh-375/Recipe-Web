import styled from "styled-components";
import { motion } from "framer-motion";

export const FormStyle = styled.form`
  margin: 2% 1% 0% 30%;
  position: relative;
  max-width: 100%;
  input {
    width: 100%;
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    color: white;
    transform: translate(100%, -50%);
  }
`;

export const SplideWrapper = styled.div`
  margin: 2rem;
`;

export const SplideCard = styled.div`
  max-height: 20rem;
  max-width: 16rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  
  a {
  text-decoration: none;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    display: block;
    margin-top: auto;
  }

  .text-container {
    background: black;
    padding: 1rem;
    box-sizing: border-box;
    color: white;
    text-align: center;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.5rem;
  margin: 0 4%;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const CuisineCard = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export const DetailsWrapper = styled.div`
  margin: 4%;
  display: grid;
  grid-template-columns: 1fr;

  h2 {
    margin: 0% 5% 2% 0%;
    font-size: 1.2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.4rem;
  }
  ul {
    margin-top: 2rem;
  }

  @media (min-width: 1000px) {
    grid-template-columns: 2fr 3fr;
  }

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;
export const DetailsButton = styled.button`
  padding: 1rem 2rem;
  margin: 1% 2% 5% 1%;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`;
export const Info = styled.div`
  margin-left: 10%;
  p {
    font-size: 1.3rem;
    line-height: 1.5;
  }
  ul {
    margin: 0% 30% 0% 2%;
  }
`;
export const RegisterSection = styled.section`
  max-width: 50%;
  min-height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3%;
  background-color: #ffffff;
  border: 1.5rem solid #494949;
  margin: 0% 15% 10% 20%;
`;
export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  label {
    font-size: 1.1rem;
    font-weight: 500;
  }
  input {
    min-height: 2.4rem;
    font-size: 1.4rem;
  }
  button {
    background-color: #494949;
    padding: 3%;
    color: white;
    margin-top: 2%;
    cursor: pointer;
  }
`;
export const PasswordField = styled.div`
  display: grid;
  grid-template-columns: 97% 3%;
  max-width: 90%;
  button {
    font-size: 1rem;
    background-color: white;
    margin-left: 5%;
    color: #313131;
    border: none;
  }
`;

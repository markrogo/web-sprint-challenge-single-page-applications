import React from "react";
import { Route, Switch, Link } from 'react-router-dom';


const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div>
      <Link to={`/pizza`}>
           Order a Pizza?
      </Link>
      </div>
    </>
  );
};
export default Home;

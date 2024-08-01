import React from "react";
import { Link } from "react-router-dom";
import backgroundImg from "../photos/frontpage.jpg"; // Replace with your background image path
import "../App.css"; // Import your existing styles

const Home = () => {
  return (
    <div className="frontpage-container">
      <div
        className="frontpage-background"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>

      <div className="frontpage-content">
        <div className="jumbotron">
          <h1 className="display-4">Welcome to Hostel-Hunt!</h1>
          <p className="lead">
            Find the perfect hostel for your stay. Explore, discover, and enjoy
            your journey.
          </p>
          <hr className="my-4" />
          {!localStorage.getItem('token') ? (
              <>
                <p>Ready to get started?</p>
                <Link to="/login" className="btn btn-primary btn-lg">
                  Login
                </Link>
              </>
            ) : (
              <p>You are logged in</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;

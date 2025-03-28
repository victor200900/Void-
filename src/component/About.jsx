import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';

const About = () => {
  return (
    <>
    <div className="position-relative w-100 vh-100 d-flex flex-column align-items-center justify-content-center text-center text-white bg-black">
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-dark"></div>
      <div className="position-relative z-2 container px-4">
        <h1 className="display-3 fw-bold mb-4">Unlimited Movies, TV Shows, and More</h1>
        <p className="fs-5 mb-3">
          Watch anywhere. Cancel anytime. Dive into a world of entertainment with the best
          selection of blockbusters, series, and exclusive originals.
        </p>
        <p className="fs-5 mb-3">
          Experience seamless streaming in high definition with personalized
          recommendations tailored just for you.
        </p>
        <Link to ='/movie'>
        <button className="btn btn-danger btn-lg mt-4 px-5 py-3 fw-semibold shadow-lg">
          Get Started
        </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default About;

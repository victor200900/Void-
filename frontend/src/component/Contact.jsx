import React from "react";

const Contact = () => {
  return (
    <div className="bg-black text-white py-5 min-vh-100">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5">Contact Us</h2>
          <p className="text-muted fs-5">
            Questions? Feedback? We’re always listening.
          </p>
        </div>

        <form className="mx-auto" style={{ maxWidth: "600px" }}>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              id="name"
              placeholder="Full Name"
            />
            <label htmlFor="name" className="text-secondary">Full Name</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control bg-dark text-white border-secondary"
              id="email"
              placeholder="Email Address"
            />
            <label htmlFor="email" className="text-secondary">Email Address</label>
          </div>

          <div className="form-floating mb-4">
            <textarea
              className="form-control bg-dark text-white border-secondary"
              placeholder="Your Message"
              id="message"
              style={{ height: "150px" }}
            ></textarea>
            <label htmlFor="message" className="text-secondary">Your Message</label>
          </div>

          <button type="submit" className="btn btn-danger w-100 py-3 fw-bold">
            Send Message
          </button>
        </form>

        <div className="text-center text-muted mt-5 small">
          &copy; {new Date().getFullYear()} Your Movie App. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Contact;

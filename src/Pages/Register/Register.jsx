import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Utils/axiosConfig"; // Import the configured axios instance
import "./Register.css";
import "./bg.jpg";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    try {
      const response = await axios.post("/api/register", { email, password });
      if (response.data.success) {
        navigate("/");  // Redirect to home page after successful registration
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("There was an error registering!", error);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <Link to="/login">
            <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input" onSubmit={handleFinish}>
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" type="submit">
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

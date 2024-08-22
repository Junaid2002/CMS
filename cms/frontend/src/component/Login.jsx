import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Validation from "./Validation";
import { Box, Button, Card, Input } from "@chakra-ui/react";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(Validation(values));

    if (Object.keys(errors).length === 0 && values.email !== "" && values.password !== "") {
      try {
        const res = await fetch("http://localhost:5000/api/admins/login", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await res.json();

        if (result.success) {
          alert("Logged in successfully");
          // Store the token (optional, depending on your authentication strategy)
          localStorage.setItem('token', result.token);
          // Redirect to the dashboard page
          navigate("/dashboard");
        } else {
          alert(result.message || "Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="outerBox">
      <Box className="outerBoxs">
        <Card className="loginBox">
          <h2>LOGIN</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>Email</label>
            <Input
              type="email"
              focusBorderColor="darkblue"
              placeholder="Email"
              name="email"
              borderRadius="none"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p style={{ color: "red", fontSize: "10px" }}>{errors.email}</p>}

            <label>Password</label>
            <Input
              type="password"
              focusBorderColor="darkblue"
              placeholder="Password"
              borderRadius="none"
              value={values.password}
              name="password"
              onChange={handleChange}
            />
            {errors.password && <p style={{ color: "red", fontSize: "10px" }}>{errors.password}</p>}

            <a href="#">Forget Password?</a>

            <Button
              className="button"
              color="white"
              colorScheme="facebook"
              size="md"
              variant="solid"
              type="submit"
            >
              LOG IN
            </Button>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default Login;

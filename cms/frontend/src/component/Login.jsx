import  {useEffect, useState } from "react";
import "./Login.css";
import Validation from "./Validation";
import { Box, Button, Card, effect, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {Alert, AlertIcon,} from '@chakra-ui/react'

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  
  const [data,setData]=useState([])

  async function fetchData()
  {
    let res = await fetch("http://localhost:5000/api/admins");
    let loginarr = await res.json()
    setData(loginarr)
  }
  
  fetchData();

  function handleChange(e) {
    // console.log("asdad");
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setErrors(Validation(values));
    console.log("runing");
  }

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      values.email !== "" &&
      values.password !== ""
    ) {
      const user = data.find((el) => el.email === values.email);

      if (user) {
        if (user.password === values.password) {
          handleNavigate();
        } else {
          alert("Wrong password");
        }
      } else {
        alert("Email is not registered, you can create a new");
      }
    }
  }, [errors]);

  const nav = useNavigate();

  function handleNavigate() {
    nav("/dashboard");
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

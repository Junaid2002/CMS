import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Validation from "./Validation";
import { Box, Button, Card, Input, Spacer } from "@chakra-ui/react";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  
  const [data,setData]=useState([])

  async function fetchData()
  {
    let res = await fetch("http://localhost:3000/user");
    let loginarr = await res.json()
    setData(loginarr)
  }
  
  fetchData();

  function handlechange(e) {
    console.log("asdad");
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("run");
    setErrors(Validation(values));
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
          alert("Submitted");
        } else {
          alert("Wrong password");
        }
      } else {
        alert("Email is not registered, you can create a new");
      }
    }
  }, [errors]);

  const nav = useNavigate();


  return (
    <div className="outerBox">
      <Box className="outerBoxs">
        <Card className="loginBox">
          <h2>LOGIN</h2>
          <form className="form">
            <label style={{ textAlign: "left" }}>Email</label>
            <br />
            <Input
              type="email"
              focusBorderColor="darkblue"
              placeholder="Email"
              name="email"
              borderRadius="none"
              value={values.email}
              onChange={handlechange}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "10px" }}>{errors.email}</p>
            )}
            <br></br>
            <label style={{ textAlign: "initial" }}>Password</label>
            <br />
            <Input
              type="password"
              focusBorderColor="darkblue"
              placeholder="Password"
              borderRadius="none"
              value={values.password}
              name="password"
              onChange={handlechange}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "10px" }}>
                {errors.password}
              </p>
            )}
            <br />
            <a href="#">ForgetPassword?</a>
            <br />
            <Button
              className="button"
              color="white"
              colorScheme="facebook"
              size="md"
              variant="solid"
              w="100%"
              borderRadius="none"
              onClick={handleSubmit}
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
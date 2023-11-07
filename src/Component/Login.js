import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, isLoggedIn, setisLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn || localStorage.getItem("login") == "true") {
      navigate("/dashboard");
    }
  }, []);
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .email("not a valid email")
      .required("email is requried"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(12),
  });
  console.log(isLoggedIn);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const LoginPage = (data) => {
    setLoading(true);
    let formdata = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("http://localhost:5000/signin", formdata)
      .then(function (response) {
        setAuthUser(response?.data?.user);
        setisLoggedIn(true);
        localStorage.setItem('user' , JSON.stringify(response?.data?.user))
        localStorage.setItem('login' , true)
        if (response?.data?.user) {
          navigate("/dashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Can Not find user");
        setAuthUser(null);
        setisLoggedIn(false);
      })
      .finally(function () {
        setLoading(false);
      });
  };



  return (
    <div className="cantainer">
      <div className="row" style={{justifyContent:"center",alignItems:"center"}}>
        <div className="col-md-4" >
      <RingLoader color="#d65836" loading={loading} size={50} />
      <h1>Login Form</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          {...register("email")}
        />
        <p style={{ color: "#ff0000" }}> {errors.email?.message} </p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          {...register("password")}
        />
        <p style={{ color: "#ff0000" }}> {errors.password?.message} </p>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit(LoginPage)}>
        Submit
      </Button>
      <ToastContainer />
    </div>
    </div>
    </div>
  );
}
export default Login;

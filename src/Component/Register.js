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

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authUser = useAuth()?.authUser;
  const isLoggedIn = useAuth()?.isLoggedIn;
  useEffect(() => {
    if (isLoggedIn || localStorage.getItem("login") == "true") {
      navigate("/dashboard");
    }
  }, []);

  const schema = yup.object({
    name: yup.string().required("name is required"),
    email: yup
      .string()
      .email("not a valid email")
      .required("email is requried"),
    phonenumber: yup
      .string()
      .required("Phone number is required")
      .min(10)
      .max(12),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters")
      .max(12),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const RegisterPage = (data) => {
    setLoading(true);
    let formdata = {
      name: data.name,
      email: data.email,
      phonenumber: data.phonenumber,
      password: data.password,
    };
    axios
      .post("http://localhost:5000/register", formdata)
      .then(function (response) {
        console.log(response);
        if (response.data) {
          navigate("/login");
          toast.success("Register Successfully");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("User already exist");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="cantainer">
      <div
        className="row"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div className="col-md-4">
          <RingLoader color="#d65836" loading={loading} size={50} />
          <h1>Registration Form</h1>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              {...register("name")}
            />
            <p style={{ color: "#ff0000" }}> {errors.name?.message} </p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              {...register("email")}
            />
            <p style={{ color: "#ff0000" }}> {errors.email?.message} </p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter Phone Number"
              {...register("phonenumber")}
            />
            <p style={{ color: "#ff0000" }}> {errors.phonenumber?.message} </p>
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
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(RegisterPage)}
          >
            Submit
          </Button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
export default Register;

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "@/components/userContext";

const AuthPage = () => {
  const [pageType, setPageType] = useState("login");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const initialRegisterValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialLoginValues = {
    email: "",
    password: "",
  };

  const registerSchema = yup.object().shape({
    username: yup.string().required("username is required"),
    email: yup
      .string()
      .email("enter a valid email")
      .required("email is required"),
    password: yup.string().min(6).required("password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "passwords must match"),
  });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("enter a valid email")
      .required("email is required"),
    password: yup.string().min(6).required("password is required"),
  });

  const login = async (values, onSubmitProps) => {
    try {
      const response = await fetch("http://127.0.0.1:3001/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const userData = await response.json();

      onSubmitProps.resetForm();
      if (userData) {
        alert("logged in successfully");
        setUser(userData);
        navigate("/account");
      }
    } catch (err) {
      alert("login failed");
    }
  };

  const register = async (values, onSubmitProps) => {
    try {
      const request = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await request.json();
      onSubmitProps.resetForm();
      if (result.email) {
        alert("registered successfully");
        setPageType("login");
      } else {
        alert("registeration failed");
      }
    } catch (err) {
      alert("registeration failed");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (pageType === "login") await login(values, onSubmitProps);
    if (pageType === "register") await register(values, onSubmitProps);
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    touched,
  } = useFormik({
    initialValues:
      pageType === "login" ? initialLoginValues : initialRegisterValues,
    validationSchema: pageType === "login" ? loginSchema : registerSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="border rounded-md shadow-md p-8  w-1/3">
        <h2 className="font-poppins font-bold text-2xl text-center text-gray-700 ">
          {pageType === "login" ? "Login" : "Register"}
        </h2>
        <form className="" onSubmit={handleSubmit}>
          {pageType === "register" ? (
            <>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="username"
                id="username"
                value={values.username}
                type="text"
                className="block w-full border rounded-md p-2 mt-4"
                placeholder="Username"
              />
              {errors.username && touched.username ? (
                <p className="font-poppins font-light text-xs text-red-700 ml-1 mt-1">
                  {errors.username}
                </p>
              ) : null}
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                id="email"
                value={values.email}
                type="email"
                placeholder="Email"
                className="block w-full border rounded-md p-2 mt-4"
              />
              {errors.email && touched.email ? (
                <p className="font-poppins font-light text-xs text-red-700 ml-1 mt-1">
                  {errors.email}
                </p>
              ) : null}
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                id="Password"
                value={values.password}
                type="password"
                placeholder="Password"
                className="block w-full border rounded-md p-2 mt-4"
              />
              {errors.password && touched.password ? (
                <p className="font-poppins font-light text-xs text-red-700 ml-1 mt-1">
                  {errors.password}
                </p>
              ) : null}
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="confirmPassword"
                id="confirmPassword"
                value={values.confirmPassword}
                type="password"
                placeholder="Confirm password"
                className="block w-full border rounded-md p-2 mt-4"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="font-poppins font-light text-xs text-red-700 ml-1 mt-1">
                  {errors.confirmPassword}
                </p>
              ) : null}
              <button
                type="submit"
                className="w-full text-center bg-primary text-white rounded-md font-bold p-2 mt-4"
              >
                Register
              </button>
              <div className="mt-4 font-poppins font-light text-gray-500">
                Already have an account?
                <span
                  onClick={() => {
                    setPageType("login");
                    resetForm();
                  }}
                  className="underline font-bold text-blue-800 hover:cursor-pointer"
                >
                  Login
                </span>
              </div>
            </>
          ) : (
            <>
              <input
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                className="block w-full border rounded-md p-2 mt-4"
                placeholder="email"
              />
              {errors.email && touched.email ? (
                <p className="font-poppins font-light text-xs text-red-700 ml-1 mt-1">
                  {errors.email}
                </p>
              ) : null}
              <input
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                placeholder="password"
                className="block w-full border rounded-md p-2 mt-4"
              />
              {errors.password && touched.password ? (
                <p className="font-poppins font-light text-xs text-red-700 ml-1 mt-1">
                  {errors.password}
                </p>
              ) : null}
              <button
                type="submit"
                className="w-full text-center bg-primary text-white rounded-md font-bold p-2 mt-4"
              >
                log in
              </button>

              <div className="mt-4 font-poppins font-light text-gray-500">
                Dont have an account?
                <span
                  onClick={() => {
                    setPageType("register");
                    resetForm();
                  }}
                  className="underline font-bold  text-blue-800 hover:cursor-pointer"
                >
                  Register
                </span>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;

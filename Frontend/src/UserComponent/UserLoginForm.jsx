
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const initialValues = {
    emailId: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object({
    role: Yup.string()
      .oneOf(["Admin", "Customer", "Delivery"], "Invalid Role")
      .required("User Role is required"),
    emailId: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const loginAction = (values, { setSubmitting }) => {
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          if (res.jwtToken) {
            sessionStorage.setItem(`active-${res.user.role.toLowerCase()}`, JSON.stringify(res.user));
            sessionStorage.setItem(`${res.user.role.toLowerCase()}-jwtToken`, res.jwtToken);
            
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
            });
            setTimeout(() => {
              window.location.href = "/home";
            }, 1000);
          } else {
            toast.error(res.responseMessage, { position: "top-center", autoClose: 1000 });
          }
        } else {
          toast.error(res.responseMessage, { position: "top-center", autoClose: 1000 });
        }
      })
      .catch(() => {
        toast.error("It seems server is down", { position: "top-center", autoClose: 1000 });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="login-container">
      <div className="mt-2 d-flex align-items-center justify-content-center">
        <div className="form-cardd border-color custom-bg" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{ borderRadius: "1em", height: "38px" }}
            >
              <h4 className="card-title">User Login</h4>
            </div>
            <div className="card-body mt-3">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={loginAction}>
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3 text-color">
                      <label htmlFor="emailId" className="form-label">
                        <b>Email Id</b>
                      </label>
                      <Field type="email" className="form-control" name="emailId" style={{textTransform:"none"}}/>
                      <ErrorMessage name="emailId" component="div" className="text-danger"  />
                    </div>

                    <div className="mb-3 text-color">
                      <label htmlFor="password" className="form-label">
                        <b>Password</b>
                      </label>
                      <Field type="password" className="form-control" name="password" autoComplete="on" style={{textTransform:"none"}}/>
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3 text-color">
                      <label htmlFor="role" className="form-label">
                        <b>User Role</b>
                      </label>
                      <Field as="select" name="role" className="form-control">
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer & Seller</option>
                        <option value="Delivery">Delivery Person</option>
                      </Field>
                      <ErrorMessage name="role" component="div" className="text-danger" />
                    </div>

                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <button type="submit" className="btn bg-color custom-bg-text" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                      </button>
                    </div>
                    <ToastContainer />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;

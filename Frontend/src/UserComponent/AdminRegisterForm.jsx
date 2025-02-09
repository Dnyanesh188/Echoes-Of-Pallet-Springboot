

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AdminRegisterForm = () => {
  let navigate = useNavigate();
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const initialValues = {
    emailId: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailId: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const registerAdmin = (values, { setSubmitting }) => {
    fetch("http://localhost:8080/api/user/admin/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(values),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => {
            navigate("/home");
          }, 1000);
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
    <div className="admin-container">
      <div className="mt-2 d-flex align-items-center justify-content-center">
        <div className="form-card border-color custom-bg mb-2" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center" style={{ borderRadius: "1em", height: "38px" }}>
              <h4 className="card-title">Admin Register</h4>
            </div>
            <div className="card-body mt-3">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={registerAdmin}>
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3 text-color">
                      <label htmlFor="emailId" className="form-label"><b>Email Id</b></label>
                      <Field type="email" className="form-control" name="emailId" />
                      <ErrorMessage name="emailId" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3 text-color">
                      <label htmlFor="password" className="form-label"><b>Password</b></label>
                      <Field type="password" className="form-control" name="password" autoComplete="on" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <button type="submit" className="btn bg-color custom-bg-text mb-2" disabled={isSubmitting}>
                        {isSubmitting ? "Registering..." : "Register"}
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

export default AdminRegisterForm;

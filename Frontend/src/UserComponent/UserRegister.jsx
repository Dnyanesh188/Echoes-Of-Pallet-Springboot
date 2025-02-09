


import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./UserRegister.css"; // Ensure your background styles are intact

const UserRegister = () => {
  const navigate = useNavigate();
  const seller = JSON.parse(sessionStorage.getItem("active-customer"));

  const [role, setRole] = useState("");

  useEffect(() => {
    if (document.URL.indexOf("customer") !== -1) {
      setRole("Customer");
    } else if (document.URL.indexOf("delivery") !== -1) {
      setRole("Delivery");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Only letters allowed")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Only letters allowed")
      .required("Last Name is required"),
    emailId: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone Number is required"),
    uidNo: Yup.string()
      .matches(/^[0-9]{12}$/, "UID must be 12 digits")
      .required("UID is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Only letters allowed")
      .required("City is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    values.role = role;
    if (role === "Delivery") {
      values.sellerId = seller?.id;
    }

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { autoClose: 1000 });
          setTimeout(() => navigate("/user/login"), 1000);
        } else {
          toast.error(res.responseMessage, { autoClose: 1000 });
        }
      })
      .catch(() => toast.error("Server error", { autoClose: 1000 }));

    setSubmitting(false);
  };

  return (
    <div className="register-container">
      <div className="mt-2 d-flex align-items-center justify-content-center ms-2 me-2 mb-2">
        <div className="form-card border-color text-color custom-bg" style={{ width: "50rem" }}>
          <div className="container-fluid">
            <div className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center" style={{ borderRadius: "1em", height: "45px" }}>
              <h5 className="card-title">Register Here!!!</h5>
            </div>
            <div className="card-body mt-3">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  emailId: "",
                  password: "",
                  phoneNo: "",
                  uidNo: "",
                  street: "",
                  city: "",
                  pincode: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="row g-3">
                    {[
                      { label: "First Name", name: "firstName", type: "text"},
                      { label: "Last Name", name: "lastName", type: "text" },
                      { label: "Email Id", name: "emailId", type: "email" },
                      { label: "Password", name: "password", type: "password" },
                      { label: "Contact No", name: "phoneNo", type: "text" },
                      { label: "UID No", name: "uidNo", type: "text" },
                      { label: "Street", name: "street", type: "text" },
                      { label: "City", name: "city", type: "text" },
                      { label: "Pincode", name: "pincode", type: "text" },
                    ].map((field, index) => (
                      <div key={index} className="col-md-6 mb-3">
                        <label className="form-label">
                          <b>{field.label}</b>
                        </label>
                        <Field type={field.type} name={field.name} className="form-control" style={{textTransform:"none"}} />
                        <ErrorMessage name={field.name} component="div" className="text-danger small" />
                      </div>
                    ))}
                    <div className="d-flex align-items-center justify-content-center">
                      <button type="submit" className="btn bg-color custom-bg-text" disabled={isSubmitting}>
                        Register User
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

export default UserRegister;

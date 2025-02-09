import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddCategoryForm = () => {
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  let navigate = useNavigate();

  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Category title is required"),
    description: Yup.string()
      .min(5, "Description must be at least 5 characters")
      .required("Category description is required"),
  });

  const saveCategory = (values, { setSubmitting, resetForm }) => {
    fetch("http://localhost:8080/api/category/add", {
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
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => navigate("/home"), 2000);
        } else {
          toast.error(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
          });
        }
      })
      .catch(() => {
        toast.error("It seems the server is down", {
          position: "top-center",
          autoClose: 1000,
        });
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  return (
    <div className="admin-container">
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="form-card border-color custom-bg" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center" style={{ borderRadius: "1em", height: "38px" }}>
              <h5 className="card-title">Add Category</h5>
            </div>
            <div className="card-body text-color mt-3">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={saveCategory}>
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        <b>Category Title</b>
                      </label>
                      <Field type="text" className="form-control" id="name" name="name" placeholder="Enter title.." />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        <b>Category Description</b>
                      </label>
                      <Field as="textarea" className="form-control" id="description" name="description" rows="3" placeholder="Enter description.." />
                      <ErrorMessage name="description" component="div" className="text-danger" />
                    </div>

                    <div className="d-flex aligns-items-center justify-content-center mb-2">
                      <button type="submit" className="btn bg-color custom-bg-text" disabled={isSubmitting}>
                        {isSubmitting ? "Adding..." : "Add Category"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;

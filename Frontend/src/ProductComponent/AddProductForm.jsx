


import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);
  const seller = JSON.parse(sessionStorage.getItem("active-customer"));
  const seller_jwtToken = sessionStorage.getItem("customer-jwtToken");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category/fetch/all");
        if (response.data) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Product title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
    quantity: Yup.number().required("Quantity is required").min(1, "At least 1 quantity is required"),
    categoryId: Yup.string().required("Category is required"),
    endDate: Yup.date().required("Expiry time is required"),
    image1: Yup.mixed().required("First image is required"),
    image2: Yup.mixed().required("Second image is required"),
    image3: Yup.mixed().required("Third image is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!seller) {
      toast.error("Seller Id is missing!!!");
      return;
    }

    const formData = new FormData();
    formData.append("image1", values.image1);
    formData.append("image2", values.image2);
    formData.append("image3", values.image3);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("categoryId", values.categoryId);
    formData.append("sellerId", seller.id);
    formData.append("endDate", new Date(values.endDate).getTime());

    try {
      const response = await axios.post("http://localhost:8080/api/product/add", formData, {
        headers: { Authorization: "Bearer " + seller_jwtToken },
      });
      
      if (response.data.success) {
        toast.success(response.data.responseMessage);
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(response.data.responseMessage);
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (error) {
      console.error("Error adding product", error);
      toast.error("It seems server is down");
      setTimeout(() => window.location.reload(), 2000);
    }
    setSubmitting(false);
  };

  return (
    <div className="admin-container">
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="card form-card custom-bg shadow-lg" style={{ width: "45rem" }}>
          <div className="container-fluid">
            <div className="card-header bg-color custom-bg-text mt-2 text-center" style={{ borderRadius: "1em", height: "45px" }}>
              <h5 className="card-title">Add Product</h5>
            </div>
            <div className="card-body text-color">
              <Formik
                initialValues={{ name: "", description: "", price: "", quantity: "", categoryId: "", endDate: "", image1: null, image2: null, image3: null }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, isSubmitting }) => (
                  <Form className="row g-3">
                    <div className="col-md-6 mb-3">
                      <label><b>Product Title</b></label>
                      <Field type="text" className="form-control" name="name" />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label><b>Product Description</b></label>
                      <Field as="textarea" className="form-control" name="description" rows="3" />
                      <ErrorMessage name="description" component="div" className="text-danger" />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label><b>Category</b></label>
                      <Field as="select" className="form-control" name="categoryId">
                        <option value="">Select Category</option>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                      </Field>
                      <ErrorMessage name="categoryId" component="div" className="text-danger" />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label><b>Product Quantity</b></label>
                      <Field type="number" className="form-control" name="quantity" />
                      <ErrorMessage name="quantity" component="div" className="text-danger" />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label><b>Product Price</b></label>
                      <Field type="number" className="form-control" name="price" />
                      <ErrorMessage name="price" component="div" className="text-danger" />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label><b>Select Expiry Time</b></label>
                      <Field type="datetime-local" className="form-control" name="endDate" />
                      <ErrorMessage name="endDate" component="div" className="text-danger" />
                    </div>

                    {['image1', 'image2', 'image3'].map((img, index) => (
                      <div className="col-md-6 mb-3" key={index}>
                        <label><b>Select {index + 1}st Image</b></label>
                        <input type="file" className="form-control" onChange={e => setFieldValue(img, e.target.files[0])} />
                        <ErrorMessage name={img} component="div" className="text-danger" />
                      </div>
                    ))}

                    <div className="d-flex aligns-items-center justify-content-center mb-2">
                      <button type="submit" className="btn bg-color custom-bg-text" disabled={isSubmitting}>Add Product</button>
                    </div>
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

export default AddProductForm;


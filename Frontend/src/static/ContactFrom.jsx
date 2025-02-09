import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 CSS

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      from_name: '',
      user_email: '',
      number: '',
      message: '',
    },
    validationSchema: Yup.object({
      from_name: Yup.string().min(4, 'Full name Must').max(30).required('Full Name is Required'),
      user_email: Yup.string().email('Invalid email address').required('Email is Required'),
      number: Yup.string().min(10, 'Mobile number should be 10 digit').max(10).required('Mobile number is Required'),
      message: Yup.string().min(50, 'Message should be 50 charecter atleast').required('Message is Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      emailjs
        .send('YOUR_SERVICE_KEY', 'YOUR_TEMPLATE_KEY', values, 'YOUR_PUBLIC_KEY')
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Message has been sent sucessfully to CodeWitharrays.',
          });
          resetForm(); // Clear form fields after successful submission
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to send the message. Please try again later.',
          });
          console.error('FAILED...', error);
        });
    },
  });

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop:"30px"}}>
      <div className="card bg-dark">
        <div className="card-body">
          <h1 className="card-title" style={{textAlign:"center",fontSize:"30px", color:"purple",fontWeight:"bold"}}>Contact Us</h1>
          <hr style={{ borderBottom: '2px solid white' }} />
          <p className="card-text text-white">Feel free to reach out to us if you have a query, our associates are available on chat 24/7.</p>
          <hr style={{ borderBottom: '2px solid white' }} />
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-white">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="from_name"
                value={formik.values.from_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.from_name && formik.errors.from_name ? (
                <div className="text-danger">{formik.errors.from_name}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input
                type="email"
                className="form-control"
                name="user_email"
                value={formik.values.user_email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.user_email && formik.errors.user_email ? (
                <div className="text-danger">{formik.errors.user_email}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Mobile Number</label>
              <input
                type="number"
                className="form-control"
                name="number"
                value={formik.values.number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.number && formik.errors.number ? (
                <div className="text-danger">{formik.errors.number}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Message</label>
              <textarea
                className="form-control"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="text-danger">{formik.errors.message}</div>
              ) : null}
            </div>
            <button 
    type="submit" 
    className="btn btn-primary" 
    style={{ 
        backgroundColor: '#007bff', 
        borderColor: '#007bff',
        ':hover': {
            backgroundColor: '#007bff',
            borderColor: '#007bff'
        }
    }}
>
    Send
</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

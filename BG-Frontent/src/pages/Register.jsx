import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Navbar from '../components/Navbar';
import { registerValidation } from '../validationSchema/Register';
import { loginSuccess } from '../store/reducers/authSlice';
import { useDispatch } from 'react-redux';
import API from '../api/axios';

const Register = () => {
  const [loading,setLoading]= useState(false);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const handleRegister = async (values) => {
    try {
      setLoading(true);
      const response = await API.post('user/register', {
      ...values
      });
  
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess(response.data.user));
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error('register failed:', error.response?.data?.message || error.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: registerValidation,
    onSubmit:handleRegister ,
  });

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full border rounded p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border rounded p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border rounded p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Wait...":"Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;

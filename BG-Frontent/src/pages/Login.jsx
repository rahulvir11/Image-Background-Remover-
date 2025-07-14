import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Navbar from '../components/Navbar';
import { loginVaildation } from '../validationSchema/Login';
import API from '../api/axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/reducers/authSlice';

const Login = () => {
  const [loading,setLoading]= useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await API.post('user/login', {
        email: values.email,
        password: values.password,
      });
  
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess(response.data.user));
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginVaildation,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

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
            {loading ? "Wait...":"Login"}
          </button>

          <p className="text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

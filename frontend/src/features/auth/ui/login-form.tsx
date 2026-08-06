import { Link } from "react-router-dom";
import { useState } from 'react';
import { login } from '@/features/auth/auth.api.js';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import type { LoginErrorResponse } from "@/features/auth/auth.types.js";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      setEmailError("");
      setPasswordError("");
      setGeneralError("");

      const data = await login({ email, password });
      navigate('/');
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse: LoginErrorResponse = error.response?.data;
        console.log(errorResponse);
        if (errorResponse.errors) {
          if (errorResponse.errors.email) {
            setEmailError(errorResponse.errors.email);
          }
          if (errorResponse.errors.password) {
            setPasswordError(errorResponse.errors.password);
          }
        }
        else {
          if (errorResponse.message) {
            setGeneralError(errorResponse.message);
          }
        }
      }
      else {
        setGeneralError("An unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <form method="post" onSubmit={(e) => handleSubmit(e)} className="border-2 rounded-card border-primary p-8">
      <h2 className="text-heading font-heading mb-12 mx-8">Log in into your account</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email mb-2">Email</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} className="border rounded-input h-8 px-2"></input>
          <div className="text-danger">{emailError}</div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password mb-2">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="border rounded-input h-8 px-2"></input>
          <div className="text-danger">{passwordError}</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-danger">{generalError}</div>
        <input type="submit" value="Log in" className="bg-primary hover:bg-primary-hover text-white w-full py-2 mt-2 rounded-button"></input>
        <div className="mt-4">Dont have an account? <Link to="/register" className='cursor-pointer text-primary hover:text-primary-hover font-button'>Create one</Link> now</div>
      </div>
    </form>
  );
}

export default LoginForm;
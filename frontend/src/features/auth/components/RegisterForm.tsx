import { Link } from "react-router-dom";
import { useState } from 'react';
import { register } from '@/features/auth/auth.api.js';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import type { RegisterErrorResponse } from "@/features/auth/auth.types.ts";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      setEmailError("");
      setPasswordError("");
      setPasswordConfirmError("");
      setGeneralError("");

      const data = await register({ email, password, passwordConfirm });
      navigate('/');
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse: RegisterErrorResponse = error.response?.data;
        console.log(errorResponse);
        if (errorResponse?.errors) {
          if (errorResponse.errors?.email) {
            setEmailError(errorResponse.errors.email);
          }
          if (errorResponse.errors?.password) {
            setPasswordError(errorResponse.errors.password);
          }
          if (errorResponse.errors?.passwordConfirm) {
            setPasswordConfirmError(errorResponse.errors.passwordConfirm);
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
      <h2 className="text-heading font-heading mb-12 mx-8">Create new Ivesome account</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} className="border rounded-input h-8 px-2"></input>
          <div className="text-error">{emailError}</div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="border rounded-input h-8 px-2"></input>
          <div className="text-error">{passwordError}</div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Confirm password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPasswordConfirm(e.target.value)} className="border rounded-input h-8 px-2"></input>
          <div className="text-error">{passwordConfirmError}</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-error">{generalError}</div>
        <input type="submit" value="Create account" className="bg-primary hover:bg-primary-hover text-white w-full py-2 mt-2 rounded-button"></input>
        <div className="mt-4">Already have an account? <Link to="/login" className='cursor-pointer text-primary hover:text-primary-hover font-button'>Log in</Link></div>
      </div>
    </form>
  );
}

export default RegisterForm;
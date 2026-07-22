import { Link } from "react-router-dom";
import { useState } from 'react';
import { register } from '@/features/auth/auth.api.js';
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = await register({ email, password, passwordConfirm });
    navigate('/');
  }

  return (
    <form method="post" onSubmit={(e) => handleSubmit(e)} className="border-2 rounded-card border-primary p-8">
      <h2 className="text-heading font-heading mb-12 mx-8">Create new Ivesome account</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} className="border rounded-input h-8 px-2"></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="border rounded-input h-8 px-2"></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Confirm password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPasswordConfirm(e.target.value)} className="border rounded-input h-8 px-2"></input>
        </div>
      </div>

      <input type="submit" value="Create account" className="bg-primary hover:bg-primary-hover text-white w-full py-2 mt-8 rounded-button"></input>
      <div className="mt-4">Already have an account? <Link to="/login" className='cursor-pointer text-primary hover:text-primary-hover font-button'>Log in</Link></div>
    </form>
  );
}

export default RegisterForm;
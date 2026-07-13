import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { register } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await register(
        name,
        email,
        password
      );

      login(
        response.data.token,
        response.data.user
      );

      toast.success("Registration Successful!");

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -top-40 -left-32 w-[420px] h-[420px] bg-blue-600/30 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-120px] right-[-80px] w-[380px] h-[380px] bg-indigo-600/30 rounded-full blur-[120px]" />

      {/* Register Card */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          bg-[#141b2d]/80
          backdrop-blur-xl
          border
          border-slate-700
          rounded-3xl
          shadow-2xl
          p-10
        "
      >

        {/* Logo */}

        <div className="text-center mb-10">

          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              flex
              items-center
              justify-center
              text-4xl
              shadow-xl
            "
          >
            📁
          </div>

          <h1 className="text-4xl font-bold text-white mt-6">
            CollabSpace AI
          </h1>

          <p className="text-slate-400 mt-3">
            Create your AI-powered workspace account.
          </p>

        </div>

        {/* Inputs */}

        <div className="space-y-5">

          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        {/* Register Button */}

        <div className="mt-8">

          <Button
            onClick={handleRegister}
            className="w-full"
          >
            Create Account
          </Button>

        </div>

        {/* Footer */}

        <p className="text-center text-slate-400 mt-8">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;
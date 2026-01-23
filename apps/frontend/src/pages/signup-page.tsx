import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, User, UserPlus, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import config from "@/config";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  username: string;
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupProps>({
    email: "",
    name: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useAuthGuard("/workflow", true);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${config.serverApiUrl}/auth/signup`, {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        name: formData.name,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Successfully signed up! Please sign in.");
        navigate("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ error: string }>;
        toast.error(err.response?.data?.error || "Signup failed");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof SignupProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Subtle n8n-style grid pattern */}
      <div className="absolute inset-0 bg-grid-slate-800/20 [background-image:linear-gradient(rgba(255,255,255,.1),transparent_1px,transparent)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_40%,black,transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-0 bg-slate-800/90 backdrop-blur-md shadow-2xl border-slate-700/50">
          <CardHeader className="text-center space-y-2 pb-8">
            <div className="mx-auto w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center shadow-lg mb-6 border border-slate-600">
              <UserPlus className="h-8 w-8 text-slate-300" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-100">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate-400">
              Get started with your workflow automation
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-8">
            {/* Email */}
            <div className="relative">
              <Mail className="h-5 w-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <Input
                type="email"
                placeholder="your-email@example.com"
                value={formData.email}
                onChange={handleInputChange("email")}
                disabled={loading}
                className="h-14 pl-12 bg-slate-750/50 border-slate-600 hover:border-slate-500 focus:border-white focus:ring-white/20 rounded-xl text-slate-200 placeholder-slate-500 transition-all shadow-sm hover:shadow-md"
              />
            </div>

            {/* Name */}
            <div className="relative">
              <User className="h-5 w-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange("name")}
                disabled={loading}
                className="h-14 pl-12 bg-slate-750/50 border-slate-600 hover:border-slate-500 focus:border-white focus:ring-white/20 rounded-xl text-slate-200 placeholder-slate-500 transition-all shadow-sm hover:shadow-md"
              />
            </div>

            {/* Username */}
            <div className="relative">
              <UserPlus className="h-5 w-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange("username")}
                disabled={loading}
                className="h-14 pl-12 bg-slate-750/50 border-slate-600 hover:border-slate-500 focus:border-white focus:ring-white/20 rounded-xl text-slate-200 placeholder-slate-500 transition-all shadow-sm hover:shadow-md"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="h-5 w-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange("password")}
                disabled={loading}
                className="h-14 pl-12 bg-slate-750/50 border-slate-600 hover:border-slate-500 focus:border-white focus:ring-white/20 rounded-xl text-slate-200 placeholder-slate-500 transition-all shadow-sm hover:shadow-md"
              />
            </div>

            <Button
              onClick={handleSignup}
              disabled={
                loading ||
                !formData.email ||
                !formData.name ||
                !formData.username ||
                !formData.password
              }
              className="w-full h-14 bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-100 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-slate-400/30 border-t-slate-200 rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors border-b border-blue-400/50 hover:border-blue-300/50 pb-1"
                >
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;

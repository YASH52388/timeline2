import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  GraduationCap,
  User,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { getUsers, createUser, setSession, getSession } from "../api/users";
import { cn } from "../utils/cn";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "student" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getSession()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = getUsers().find(
      u => u.username === form.username && u.password === form.password
    );

    if (user) {
      setSession(user);
      navigate("/dashboard");
    } else {
      setErrors({ general: "Invalid username or password" });
    }
    
    setIsLoading(false);
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getUsers();
    if (users.find(u => u.username === form.username)) {
      setErrors({ username: "Username already exists" });
      setIsLoading(false);
      return;
    }
    
    const newUser = {
      ...form,
      id: Date.now(),
      parentId: null 
    };
    createUser(newUser);
    setSession(newUser);
    navigate("/dashboard");
  };

  const roleOptions = [
    { value: "student", label: "Student", icon: GraduationCap },
    { value: "teacher", label: "Teacher", icon: User },
    { value: "admin", label: "Administrator", icon: User },
    { value: "parent", label: "Parent", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-secondary-100/20"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Main Card */}
        <div className="card shadow-large">
          {/* Header */}
          <div className="card-header text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-gradient-primary font-display mb-2">
              EduSmart
            </h1>
            
            <p className="text-neutral-600">
              {isSignup ? "Create your account" : "Welcome back"}
            </p>
          </div>

          <div className="card-body">
            {/* Error Message */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-error-50 border border-error-200 rounded-lg mb-4"
              >
                <AlertCircle className="w-4 h-4 text-error-600" />
                <span className="text-sm text-error-700">{errors.general}</span>
              </motion.div>
            )}

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={form.username}
                    onChange={handleChange}
                    className={cn(
                      "input pl-10",
                      errors.username ? "input-error" : ""
                    )}
                  />
                </div>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-error-600"
                  >
                    {errors.username}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className={cn(
                      "input pl-10 pr-10",
                      errors.password ? "input-error" : ""
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-error-600"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Role Selection (Signup only) */}
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {roleOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setForm({ ...form, role: option.value })}
                          className={cn(
                            "flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200",
                            form.role === option.value
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-neutral-200 hover:border-neutral-300 text-neutral-600"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={isSignup ? handleSignup : handleLogin}
                disabled={isLoading}
                className="btn-primary w-full btn-lg group"
              >
                {isLoading ? (
                  <div className="loading-spinner w-5 h-5 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>{isSignup ? "Create Account" : "Sign In"}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-neutral-600">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setErrors({});
                    setForm({ username: "", password: "", role: "student" });
                  }}
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  {isSignup ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-200"
        >
          <h3 className="text-sm font-semibold text-neutral-700 mb-2 flex items-center">
            <CheckCircle className="w-4 h-4 text-success-600 mr-2" />
            Demo Credentials
          </h3>
          <div className="text-xs text-neutral-600 space-y-1">
            <p><strong>Admin:</strong> admin / password</p>
            <p><strong>Teacher:</strong> teacher / password</p>
            <p><strong>Student:</strong> student / password</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  BookOpen,
  Bus,
  Clock,
  UserCheck,
  GraduationCap,
  LogOut,
  Menu,
  X,
  Settings,
  Bell,
  Search,
  ChevronDown,
  User,
} from "lucide-react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Timeline from "./components/Timeline/Timeline";
import Attendance from "./components/Attendance/Attendance";
import Marks from "./components/Marks/Marks";
import { getSession, clearSession } from "./api/users";
import { cn } from "./utils/cn";

// Navigation items for different roles
const navigationItems = {
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Class Management", path: "/admin/my-classes" },
    { icon: Calendar, label: "Schedule", path: "/timetable" },
    { icon: MessageSquare, label: "Messages", path: "/admin/messages" },
    { icon: BookOpen, label: "Digital Library", path: "/admin/library" },
    { icon: Bus, label: "Bus Tracking", path: "/admin/bus-tracking" },
    { icon: Clock, label: "Timeline", path: "/timeline" },
    { icon: UserCheck, label: "Attendance", path: "/attendance" },
    { icon: GraduationCap, label: "Student Marks", path: "/students-marks" },
  ],
  teacher: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: User, label: "My Profile", path: "/my-profile" },
    { icon: Users, label: "My Classes", path: "/my-classes" },
    { icon: Calendar, label: "Schedule", path: "/class-timetable" },
    { icon: BookOpen, label: "Lesson Planner", path: "/exams-and-lesson-planner" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: BookOpen, label: "Digital Library", path: "/library" },
    { icon: Bus, label: "Bus Tracking", path: "/bus-tracking" },
    { icon: Clock, label: "Timeline", path: "/timeline" },
    { icon: UserCheck, label: "Attendance", path: "/attendance" },
    { icon: GraduationCap, label: "Student Marks", path: "/students-marks" },
  ],
  student: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "My Class", path: "/student/my-classes" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: GraduationCap, label: "Fee Status", path: "/student/fee-status" },
    { icon: BookOpen, label: "Digital Library", path: "/library" },
    { icon: Bus, label: "Bus Tracking", path: "/bus-tracking" },
  ],
};

// Sidebar Component
function Sidebar({ user, role, isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = navigationItems[role] || [];

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "fixed left-0 top-0 h-full w-72 bg-white border-r border-neutral-200 z-50 flex flex-col",
          "lg:translate-x-0 lg:static lg:z-auto"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-primary font-display">
                EduSmart
              </h1>
              <p className="text-xs text-neutral-500 capitalize">{role} Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-900 truncate">
                {user?.username}
              </p>
              <p className="text-sm text-neutral-500 capitalize">{role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.button
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                  isActive
                    ? "bg-primary-50 text-primary-700 border border-primary-200"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-primary-600" : "text-neutral-400")} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-error-600 hover:bg-error-50 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}

// Header Component
function Header({ onMenuClick, user }) {
  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-80 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-neutral-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
          </button>
          
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-neutral-600" />
          </button>
          
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Main App Layout Component
function AppLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const sessionUser = getSession();
    if (!sessionUser) {
      navigate("/");
    } else {
      setUser(sessionUser);
      setRole(sessionUser.role);
    }
  }, []); // Empty dependency array to run only once

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <Sidebar
        user={user}
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
        />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/dashboard" element={<Dashboard user={user} role={role} />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/students-marks" element={<Marks />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const isLoggedIn = !!getSession();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/*"
          element={isLoggedIn ? <AppLayout /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}


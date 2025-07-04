import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Bell,
  MessageSquare,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Star,
  ChevronRight,
  Plus,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react';
import { cn } from '../utils/cn';

// Mock data for different roles
const mockData = {
  admin: {
    stats: [
      { label: 'Total Students', value: '1,234', change: '+12%', icon: Users, color: 'primary' },
      { label: 'Total Teachers', value: '89', change: '+5%', icon: BookOpen, color: 'secondary' },
      { label: 'Active Classes', value: '45', change: '+8%', icon: Calendar, color: 'success' },
      { label: 'Revenue', value: '$125K', change: '+15%', icon: TrendingUp, color: 'warning' },
    ],
    recentActivities: [
      { type: 'enrollment', message: 'New student enrolled in Grade 10', time: '2 hours ago' },
      { type: 'payment', message: 'Fee payment received from John Doe', time: '4 hours ago' },
      { type: 'teacher', message: 'New teacher Sarah Johnson joined', time: '1 day ago' },
      { type: 'event', message: 'Science fair scheduled for next week', time: '2 days ago' },
    ],
  },
  teacher: {
    stats: [
      { label: 'My Classes', value: '6', change: '+1', icon: BookOpen, color: 'primary' },
      { label: 'Total Students', value: '156', change: '+8', icon: Users, color: 'secondary' },
      { label: 'Assignments', value: '23', change: '+3', icon: Award, color: 'success' },
      { label: 'Avg. Grade', value: '85%', change: '+2%', icon: TrendingUp, color: 'warning' },
    ],
    recentActivities: [
      { type: 'assignment', message: 'Math homework submitted by 24 students', time: '1 hour ago' },
      { type: 'grade', message: 'Graded Science test for Class 9A', time: '3 hours ago' },
      { type: 'meeting', message: 'Parent-teacher meeting scheduled', time: '5 hours ago' },
      { type: 'lesson', message: 'Uploaded new lesson plan for Physics', time: '1 day ago' },
    ],
  },
  student: {
    stats: [
      { label: 'Current GPA', value: '3.8', change: '+0.2', icon: Star, color: 'primary' },
      { label: 'Assignments', value: '12', change: '+2', icon: BookOpen, color: 'secondary' },
      { label: 'Attendance', value: '94%', change: '+1%', icon: Calendar, color: 'success' },
      { label: 'Rank', value: '#15', change: '+3', icon: Award, color: 'warning' },
    ],
    recentActivities: [
      { type: 'assignment', message: 'Math assignment due tomorrow', time: '2 hours ago' },
      { type: 'grade', message: 'Received grade for English essay: A-', time: '1 day ago' },
      { type: 'event', message: 'Science fair participation confirmed', time: '2 days ago' },
      { type: 'library', message: 'Borrowed "Advanced Physics" from library', time: '3 days ago' },
    ],
  },
};

// Stat Card Component
function StatCard({ stat, index }) {
  const Icon = stat.icon;
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    success: 'from-success-500 to-success-600',
    warning: 'from-warning-500 to-warning-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-hover"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-neutral-900 mb-2">{stat.value}</p>
            <div className="flex items-center">
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                stat.change.startsWith('+') 
                  ? "bg-success-100 text-success-700" 
                  : "bg-error-100 text-error-700"
              )}>
                {stat.change}
              </span>
              <span className="text-xs text-neutral-500 ml-2">vs last month</span>
            </div>
          </div>
          <div className={cn(
            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
            colorClasses[stat.color]
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Activity Item Component
function ActivityItem({ activity, index }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'enrollment': return Users;
      case 'payment': return TrendingUp;
      case 'teacher': return BookOpen;
      case 'event': return Calendar;
      case 'assignment': return Award;
      case 'grade': return Star;
      case 'meeting': return MessageSquare;
      case 'lesson': return BookOpen;
      case 'library': return BookOpen;
      default: return Bell;
    }
  };

  const Icon = getActivityIcon(activity.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start space-x-3 p-3 hover:bg-neutral-50 rounded-lg transition-colors"
    >
      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-primary-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-neutral-900 mb-1">{activity.message}</p>
        <p className="text-xs text-neutral-500">{activity.time}</p>
      </div>
    </motion.div>
  );
}

// Quick Actions Component
function QuickActions({ role }) {
  const actions = {
    admin: [
      { label: 'Add Student', icon: Plus, color: 'primary' },
      { label: 'Generate Report', icon: BarChart3, color: 'secondary' },
      { label: 'Schedule Event', icon: Calendar, color: 'success' },
      { label: 'Send Notice', icon: MessageSquare, color: 'warning' },
    ],
    teacher: [
      { label: 'Create Assignment', icon: Plus, color: 'primary' },
      { label: 'Grade Papers', icon: Award, color: 'secondary' },
      { label: 'Schedule Class', icon: Calendar, color: 'success' },
      { label: 'Message Parents', icon: MessageSquare, color: 'warning' },
    ],
    student: [
      { label: 'Submit Assignment', icon: Plus, color: 'primary' },
      { label: 'View Grades', icon: Star, color: 'secondary' },
      { label: 'Check Schedule', icon: Calendar, color: 'success' },
      { label: 'Library Search', icon: BookOpen, color: 'warning' },
    ],
  };

  const roleActions = actions[role] || actions.student;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {roleActions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-medium transition-all duration-200 group"
          >
            <Icon className="w-6 h-6 text-neutral-600 group-hover:text-primary-600 mx-auto mb-2 transition-colors" />
            <p className="text-sm font-medium text-neutral-700 group-hover:text-primary-700 transition-colors">
              {action.label}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard({ user, role = 'student' }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const data = mockData[role] || mockData.student;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-display mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-neutral-600">
            Here's what's happening in your {role} dashboard today.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          
          <button className="btn-outline btn-sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          
          <button className="btn-primary btn-sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Quick Actions</h2>
        </div>
        <div className="card-body">
          <QuickActions role={role} />
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 card"
        >
          <div className="card-header flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">Recent Activities</h2>
            <button className="btn-ghost btn-sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
          <div className="card-body">
            <div className="space-y-1">
              {data.recentActivities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} index={index} />
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center group">
              View all activities
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="card-header">
            <h2 className="text-lg font-semibold text-neutral-900">Performance</h2>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {/* Mock Chart */}
              <div className="h-32 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-600">Chart visualization</p>
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Overall Score</span>
                  <span className="text-sm font-semibold text-neutral-900">92%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Improvement</span>
                  <span className="text-sm font-semibold text-success-600">+8%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Upcoming Events</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Science Fair', date: 'Dec 15', time: '10:00 AM', type: 'event' },
              { title: 'Parent Meeting', date: 'Dec 18', time: '2:00 PM', type: 'meeting' },
              { title: 'Math Exam', date: 'Dec 20', time: '9:00 AM', type: 'exam' },
            ].map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
              >
                <h3 className="font-semibold text-neutral-900 mb-1">{event.title}</h3>
                <div className="flex items-center text-sm text-neutral-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-neutral-600 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {event.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}


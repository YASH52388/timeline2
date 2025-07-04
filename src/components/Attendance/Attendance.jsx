import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  UserCheck,
  UserX,
  Clock,
  Filter,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
} from 'lucide-react';
import { cn } from '../../utils/cn';

// Mock attendance data
const mockAttendanceData = {
  summary: {
    totalStudents: 156,
    presentToday: 142,
    absentToday: 14,
    attendanceRate: 91.0,
    weeklyTrend: '+2.3%',
  },
  students: [
    {
      id: 1,
      name: 'John Smith',
      studentId: 'STU001',
      grade: '10th Grade',
      status: 'present',
      checkInTime: '08:15 AM',
      avatar: 'JS',
      attendanceRate: 95.2,
      daysPresent: 18,
      daysAbsent: 1,
      lastAbsent: '2024-01-10',
    },
    {
      id: 2,
      name: 'Emma Wilson',
      studentId: 'STU002',
      grade: '9th Grade',
      status: 'absent',
      checkInTime: null,
      avatar: 'EW',
      attendanceRate: 88.7,
      daysPresent: 16,
      daysAbsent: 3,
      lastAbsent: '2024-01-15',
      reason: 'Sick leave',
    },
    {
      id: 3,
      name: 'Michael Brown',
      studentId: 'STU003',
      grade: '11th Grade',
      status: 'late',
      checkInTime: '08:45 AM',
      avatar: 'MB',
      attendanceRate: 92.1,
      daysPresent: 17,
      daysAbsent: 2,
      lastAbsent: '2024-01-08',
    },
    {
      id: 4,
      name: 'Sarah Davis',
      studentId: 'STU004',
      grade: '10th Grade',
      status: 'present',
      checkInTime: '08:10 AM',
      avatar: 'SD',
      attendanceRate: 97.8,
      daysPresent: 19,
      daysAbsent: 0,
      lastAbsent: null,
    },
    {
      id: 5,
      name: 'David Johnson',
      studentId: 'STU005',
      grade: '9th Grade',
      status: 'present',
      checkInTime: '08:20 AM',
      avatar: 'DJ',
      attendanceRate: 89.5,
      daysPresent: 17,
      daysAbsent: 2,
      lastAbsent: '2024-01-12',
    },
  ],
  weeklyData: [
    { day: 'Mon', present: 148, absent: 8, rate: 94.9 },
    { day: 'Tue', present: 145, absent: 11, rate: 92.9 },
    { day: 'Wed', present: 150, absent: 6, rate: 96.2 },
    { day: 'Thu', present: 142, absent: 14, rate: 91.0 },
    { day: 'Fri', present: 144, absent: 12, rate: 92.3 },
  ],
};

// Summary Card Component
function SummaryCard({ title, value, subtitle, icon: Icon, color, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-hover"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-neutral-900 mb-2">{value}</p>
            {subtitle && (
              <p className="text-sm text-neutral-500">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center mt-2">
                {trend.startsWith('+') ? (
                  <TrendingUp className="w-4 h-4 text-success-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-error-600 mr-1" />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  trend.startsWith('+') ? "text-success-600" : "text-error-600"
                )}>
                  {trend}
                </span>
                <span className="text-sm text-neutral-500 ml-1">vs last week</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            color === 'primary' && 'bg-primary-100',
            color === 'success' && 'bg-success-100',
            color === 'error' && 'bg-error-100',
            color === 'warning' && 'bg-warning-100',
          )}>
            <Icon className={cn(
              "w-6 h-6",
              color === 'primary' && 'text-primary-600',
              color === 'success' && 'text-success-600',
              color === 'error' && 'text-error-600',
              color === 'warning' && 'text-warning-600',
            )} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Student Row Component
function StudentRow({ student, index }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return CheckCircle;
      case 'absent': return XCircle;
      case 'late': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'error';
      case 'late': return 'warning';
      default: return 'neutral';
    }
  };

  const StatusIcon = getStatusIcon(student.status);
  const statusColor = getStatusColor(student.status);

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="hover:bg-neutral-50 transition-colors"
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">{student.avatar}</span>
          </div>
          <div>
            <p className="font-semibold text-neutral-900">{student.name}</p>
            <p className="text-sm text-neutral-500">{student.studentId}</p>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-900">{student.grade}</span>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <StatusIcon className={cn(
            "w-5 h-5",
            statusColor === 'success' && 'text-success-600',
            statusColor === 'error' && 'text-error-600',
            statusColor === 'warning' && 'text-warning-600',
          )} />
          <span className={cn(
            "font-medium capitalize",
            statusColor === 'success' && 'text-success-700',
            statusColor === 'error' && 'text-error-700',
            statusColor === 'warning' && 'text-warning-700',
          )}>
            {student.status}
          </span>
        </div>
        {student.reason && (
          <p className="text-xs text-neutral-500 mt-1">{student.reason}</p>
        )}
      </td>
      
      <td className="px-6 py-4">
        <span className="text-sm text-neutral-900">
          {student.checkInTime || '-'}
        </span>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-neutral-200 rounded-full h-2">
            <div 
              className={cn(
                "h-2 rounded-full",
                student.attendanceRate >= 95 ? "bg-success-500" :
                student.attendanceRate >= 85 ? "bg-warning-500" : "bg-error-500"
              )}
              style={{ width: `${student.attendanceRate}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            {student.attendanceRate}%
          </span>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <button className="btn-ghost btn-sm">
            <Eye className="w-4 h-4" />
          </button>
          <button className="btn-ghost btn-sm">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

// Weekly Chart Component
function WeeklyChart({ data }) {
  const maxValue = Math.max(...data.map(d => d.present));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900">Weekly Attendance</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <span className="text-neutral-600">Present</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error-500 rounded-full"></div>
            <span className="text-neutral-600">Absent</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        {data.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="h-32 flex items-end justify-center space-x-1 mb-2">
              <div
                className="w-6 bg-success-500 rounded-t"
                style={{ height: `${(day.present / maxValue) * 100}%` }}
              ></div>
              <div
                className="w-6 bg-error-500 rounded-t"
                style={{ height: `${(day.absent / maxValue) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium text-neutral-900">{day.day}</p>
            <p className="text-xs text-neutral-500">{day.rate}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Main Attendance Component
export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState(mockAttendanceData);
  const [filteredStudents, setFilteredStudents] = useState(mockAttendanceData.students);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    grade: 'all',
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = attendanceData.students;

    if (filters.search) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.studentId.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(student => student.status === filters.status);
    }

    if (filters.grade !== 'all') {
      filtered = filtered.filter(student => student.grade === filters.grade);
    }

    setFilteredStudents(filtered);
  }, [filters, attendanceData]);

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
            Attendance Management
          </h1>
          <p className="text-neutral-600">
            Track and manage student attendance records.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input text-sm"
          />
          <button className="btn-outline btn-sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn-primary btn-sm">
            <Plus className="w-4 h-4 mr-2" />
            Mark Attendance
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Students"
          value={attendanceData.summary.totalStudents}
          icon={Users}
          color="primary"
        />
        <SummaryCard
          title="Present Today"
          value={attendanceData.summary.presentToday}
          subtitle={`${attendanceData.summary.attendanceRate}% attendance rate`}
          icon={UserCheck}
          color="success"
          trend={attendanceData.summary.weeklyTrend}
        />
        <SummaryCard
          title="Absent Today"
          value={attendanceData.summary.absentToday}
          icon={UserX}
          color="error"
        />
        <SummaryCard
          title="Attendance Rate"
          value={`${attendanceData.summary.attendanceRate}%`}
          icon={BarChart3}
          color="warning"
          trend={attendanceData.summary.weeklyTrend}
        />
      </div>

      {/* Charts and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 card"
        >
          <div className="card-body">
            <WeeklyChart data={attendanceData.weeklyData} />
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="card-header">
            <h3 className="font-semibold text-neutral-900">Quick Stats</h3>
          </div>
          <div className="card-body space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">On Time</span>
              <span className="text-sm font-semibold text-success-600">89%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Late Arrivals</span>
              <span className="text-sm font-semibold text-warning-600">8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Early Dismissals</span>
              <span className="text-sm font-semibold text-neutral-600">3%</span>
            </div>
            <div className="pt-4 border-t border-neutral-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-900">142</p>
                <p className="text-sm text-neutral-600">Students present</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <div className="card-body">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="input pl-10"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="input text-sm"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>

              <select
                value={filters.grade}
                onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
                className="input text-sm"
              >
                <option value="all">All Grades</option>
                <option value="9th Grade">9th Grade</option>
                <option value="10th Grade">10th Grade</option>
                <option value="11th Grade">11th Grade</option>
                <option value="12th Grade">12th Grade</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <div className="card-header">
          <h3 className="font-semibold text-neutral-900">
            Student Attendance ({filteredStudents.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Check-in Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Attendance Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredStudents.map((student, index) => (
                <StudentRow key={student.id} student={student} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}


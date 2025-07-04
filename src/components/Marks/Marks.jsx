import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Award,
  BookOpen,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Search,
  Plus,
  Eye,
  Edit,
  Star,
  Target,
  Users,
  Calendar,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '../../utils/cn';

// Mock marks data
const mockMarksData = {
  summary: {
    totalStudents: 156,
    averageGrade: 85.2,
    topPerformer: 'Sarah Davis',
    improvementRate: '+3.2%',
  },
  subjects: [
    { name: 'Mathematics', average: 87.5, students: 156, color: 'primary' },
    { name: 'Science', average: 84.2, students: 156, color: 'secondary' },
    { name: 'English', average: 88.1, students: 156, color: 'success' },
    { name: 'History', average: 82.7, students: 156, color: 'warning' },
    { name: 'Geography', average: 85.9, students: 156, color: 'accent' },
  ],
  students: [
    {
      id: 1,
      name: 'Sarah Davis',
      studentId: 'STU004',
      grade: '10th Grade',
      avatar: 'SD',
      overallGrade: 94.5,
      rank: 1,
      subjects: {
        Mathematics: { score: 96, grade: 'A+', trend: 'up' },
        Science: { score: 94, grade: 'A', trend: 'up' },
        English: { score: 95, grade: 'A+', trend: 'stable' },
        History: { score: 92, grade: 'A', trend: 'up' },
        Geography: { score: 95, grade: 'A+', trend: 'up' },
      },
      attendance: 97.8,
      lastUpdated: '2024-01-15',
    },
    {
      id: 2,
      name: 'John Smith',
      studentId: 'STU001',
      grade: '10th Grade',
      avatar: 'JS',
      overallGrade: 89.2,
      rank: 5,
      subjects: {
        Mathematics: { score: 92, grade: 'A', trend: 'up' },
        Science: { score: 88, grade: 'B+', trend: 'stable' },
        English: { score: 87, grade: 'B+', trend: 'down' },
        History: { score: 85, grade: 'B+', trend: 'up' },
        Geography: { score: 94, grade: 'A', trend: 'up' },
      },
      attendance: 95.2,
      lastUpdated: '2024-01-15',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      studentId: 'STU002',
      grade: '9th Grade',
      avatar: 'EW',
      overallGrade: 86.7,
      rank: 8,
      subjects: {
        Mathematics: { score: 84, grade: 'B+', trend: 'up' },
        Science: { score: 89, grade: 'B+', trend: 'up' },
        English: { score: 91, grade: 'A', trend: 'stable' },
        History: { score: 82, grade: 'B', trend: 'down' },
        Geography: { score: 87, grade: 'B+', trend: 'up' },
      },
      attendance: 88.7,
      lastUpdated: '2024-01-14',
    },
    {
      id: 4,
      name: 'Michael Brown',
      studentId: 'STU003',
      grade: '11th Grade',
      avatar: 'MB',
      overallGrade: 91.3,
      rank: 3,
      subjects: {
        Mathematics: { score: 93, grade: 'A', trend: 'stable' },
        Science: { score: 90, grade: 'A', trend: 'up' },
        English: { score: 89, grade: 'B+', trend: 'up' },
        History: { score: 94, grade: 'A', trend: 'up' },
        Geography: { score: 90, grade: 'A', trend: 'stable' },
      },
      attendance: 92.1,
      lastUpdated: '2024-01-15',
    },
    {
      id: 5,
      name: 'David Johnson',
      studentId: 'STU005',
      grade: '9th Grade',
      avatar: 'DJ',
      overallGrade: 83.4,
      rank: 12,
      subjects: {
        Mathematics: { score: 81, grade: 'B', trend: 'down' },
        Science: { score: 85, grade: 'B+', trend: 'up' },
        English: { score: 86, grade: 'B+', trend: 'stable' },
        History: { score: 80, grade: 'B', trend: 'down' },
        Geography: { score: 85, grade: 'B+', trend: 'up' },
      },
      attendance: 89.5,
      lastUpdated: '2024-01-13',
    },
  ],
  gradeDistribution: [
    { grade: 'A+', count: 23, percentage: 14.7, color: 'success' },
    { grade: 'A', count: 45, percentage: 28.8, color: 'primary' },
    { grade: 'B+', count: 38, percentage: 24.4, color: 'secondary' },
    { grade: 'B', count: 32, percentage: 20.5, color: 'warning' },
    { grade: 'C+', count: 12, percentage: 7.7, color: 'neutral' },
    { grade: 'C', count: 6, percentage: 3.9, color: 'error' },
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
                <span className="text-sm text-neutral-500 ml-1">vs last term</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            color === 'primary' && 'bg-primary-100',
            color === 'success' && 'bg-success-100',
            color === 'warning' && 'bg-warning-100',
            color === 'secondary' && 'bg-secondary-100',
          )}>
            <Icon className={cn(
              "w-6 h-6",
              color === 'primary' && 'text-primary-600',
              color === 'success' && 'text-success-600',
              color === 'warning' && 'text-warning-600',
              color === 'secondary' && 'text-secondary-600',
            )} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Subject Performance Component
function SubjectPerformance({ subjects }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-neutral-900">Subject Performance</h3>
      <div className="space-y-3">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-3 h-3 rounded-full",
                subject.color === 'primary' && 'bg-primary-500',
                subject.color === 'secondary' && 'bg-secondary-500',
                subject.color === 'success' && 'bg-success-500',
                subject.color === 'warning' && 'bg-warning-500',
                subject.color === 'accent' && 'bg-accent-500',
              )}></div>
              <div>
                <p className="font-medium text-neutral-900">{subject.name}</p>
                <p className="text-sm text-neutral-500">{subject.students} students</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-neutral-900">{subject.average}%</p>
              <div className="w-16 bg-neutral-200 rounded-full h-2 mt-1">
                <div 
                  className={cn(
                    "h-2 rounded-full",
                    subject.color === 'primary' && 'bg-primary-500',
                    subject.color === 'secondary' && 'bg-secondary-500',
                    subject.color === 'success' && 'bg-success-500',
                    subject.color === 'warning' && 'bg-warning-500',
                    subject.color === 'accent' && 'bg-accent-500',
                  )}
                  style={{ width: `${subject.average}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Grade Distribution Component
function GradeDistribution({ distribution }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-neutral-900">Grade Distribution</h3>
      <div className="space-y-3">
        {distribution.map((item, index) => (
          <motion.div
            key={item.grade}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm",
                item.color === 'success' && 'bg-success-500',
                item.color === 'primary' && 'bg-primary-500',
                item.color === 'secondary' && 'bg-secondary-500',
                item.color === 'warning' && 'bg-warning-500',
                item.color === 'neutral' && 'bg-neutral-500',
                item.color === 'error' && 'bg-error-500',
              )}>
                {item.grade}
              </div>
              <span className="font-medium text-neutral-900">{item.count} students</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-neutral-200 rounded-full h-2">
                <div 
                  className={cn(
                    "h-2 rounded-full",
                    item.color === 'success' && 'bg-success-500',
                    item.color === 'primary' && 'bg-primary-500',
                    item.color === 'secondary' && 'bg-secondary-500',
                    item.color === 'warning' && 'bg-warning-500',
                    item.color === 'neutral' && 'bg-neutral-500',
                    item.color === 'error' && 'bg-error-500',
                  )}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-neutral-600 w-12 text-right">
                {item.percentage}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Student Row Component
function StudentRow({ student, index, expandedStudent, setExpandedStudent }) {
  const isExpanded = expandedStudent === student.id;

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-error-600" />;
      default: return <div className="w-4 h-4 bg-neutral-400 rounded-full"></div>;
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'primary';
    if (grade.startsWith('C')) return 'warning';
    return 'error';
  };

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="hover:bg-neutral-50 transition-colors cursor-pointer"
        onClick={() => setExpandedStudent(isExpanded ? null : student.id)}
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
            <span className="text-lg font-bold text-neutral-900">{student.overallGrade}%</span>
            <div className={cn(
              "badge",
              student.overallGrade >= 90 ? "badge-success" :
              student.overallGrade >= 80 ? "badge-primary" :
              student.overallGrade >= 70 ? "badge-warning" : "badge-error"
            )}>
              {student.overallGrade >= 90 ? 'A' :
               student.overallGrade >= 80 ? 'B' :
               student.overallGrade >= 70 ? 'C' : 'D'}
            </div>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-warning-600" />
            <span className="font-medium text-neutral-900">#{student.rank}</span>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <span className="text-sm text-neutral-600">{student.lastUpdated}</span>
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <button className="btn-ghost btn-sm">
              <Eye className="w-4 h-4" />
            </button>
            <button className="btn-ghost btn-sm">
              <Edit className="w-4 h-4" />
            </button>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-neutral-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            )}
          </div>
        </td>
      </motion.tr>
      
      {/* Expanded Row */}
      {isExpanded && (
        <motion.tr
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <td colSpan="6" className="px-6 py-4 bg-neutral-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(student.subjects).map(([subject, data]) => (
                <div key={subject} className="bg-white p-4 rounded-lg border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-neutral-900 text-sm">{subject}</h4>
                    {getTrendIcon(data.trend)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-neutral-900">{data.score}%</span>
                    <span className={cn(
                      "badge text-xs",
                      `badge-${getGradeColor(data.grade)}`
                    )}>
                      {data.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </td>
        </motion.tr>
      )}
    </>
  );
}

// Main Marks Component
export default function Marks() {
  const [marksData, setMarksData] = useState(mockMarksData);
  const [filteredStudents, setFilteredStudents] = useState(mockMarksData.students);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    grade: 'all',
    subject: 'all',
    performance: 'all',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = marksData.students;

    if (filters.search) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.studentId.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.grade !== 'all') {
      filtered = filtered.filter(student => student.grade === filters.grade);
    }

    if (filters.performance !== 'all') {
      filtered = filtered.filter(student => {
        switch (filters.performance) {
          case 'excellent': return student.overallGrade >= 90;
          case 'good': return student.overallGrade >= 80 && student.overallGrade < 90;
          case 'average': return student.overallGrade >= 70 && student.overallGrade < 80;
          case 'below': return student.overallGrade < 70;
          default: return true;
        }
      });
    }

    setFilteredStudents(filtered);
  }, [filters, marksData]);

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
            Student Marks & Grades
          </h1>
          <p className="text-neutral-600">
            Track and analyze student academic performance.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="btn-outline btn-sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="btn-primary btn-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Marks
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Students"
          value={marksData.summary.totalStudents}
          icon={Users}
          color="primary"
        />
        <SummaryCard
          title="Average Grade"
          value={`${marksData.summary.averageGrade}%`}
          icon={BarChart3}
          color="success"
          trend={marksData.summary.improvementRate}
        />
        <SummaryCard
          title="Top Performer"
          value={marksData.summary.topPerformer}
          subtitle="Highest overall grade"
          icon={Award}
          color="warning"
        />
        <SummaryCard
          title="Improvement Rate"
          value={marksData.summary.improvementRate}
          subtitle="vs last term"
          icon={TrendingUp}
          color="secondary"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="card-body">
            <SubjectPerformance subjects={marksData.subjects} />
          </div>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="card-body">
            <GradeDistribution distribution={marksData.gradeDistribution} />
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

              <select
                value={filters.performance}
                onChange={(e) => setFilters({ ...filters, performance: e.target.value })}
                className="input text-sm"
              >
                <option value="all">All Performance</option>
                <option value="excellent">Excellent (90%+)</option>
                <option value="good">Good (80-89%)</option>
                <option value="average">Average (70-79%)</option>
                <option value="below">Below Average (&lt;70%)</option>
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
            Student Performance ({filteredStudents.length})
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
                  Overall Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredStudents.map((student, index) => (
                <StudentRow 
                  key={student.id} 
                  student={student} 
                  index={index}
                  expandedStudent={expandedStudent}
                  setExpandedStudent={setExpandedStudent}
                />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}


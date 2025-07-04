import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  Award,
  MessageSquare,
  Bell,
  Filter,
  Search,
  Plus,
  ChevronDown,
  MapPin,
  Users,
  FileText,
  Star,
  TrendingUp,
} from 'lucide-react';
import { cn } from '../../utils/cn';

// Mock timeline data
const mockTimelineData = [
  {
    id: 1,
    type: 'assignment',
    title: 'Mathematics Assignment Submitted',
    description: 'John Smith submitted his calculus homework for review.',
    timestamp: '2024-01-15T10:30:00Z',
    user: 'John Smith',
    avatar: 'JS',
    category: 'Academic',
    priority: 'medium',
    metadata: {
      subject: 'Mathematics',
      grade: 'A-',
      dueDate: '2024-01-15',
    }
  },
  {
    id: 2,
    type: 'event',
    title: 'Science Fair Registration Open',
    description: 'Students can now register for the annual science fair competition.',
    timestamp: '2024-01-15T09:15:00Z',
    user: 'Sarah Johnson',
    avatar: 'SJ',
    category: 'Event',
    priority: 'high',
    metadata: {
      location: 'Main Auditorium',
      deadline: '2024-01-25',
      participants: 45,
    }
  },
  {
    id: 3,
    type: 'grade',
    title: 'Physics Test Results Published',
    description: 'Grade 11 physics test results are now available in the student portal.',
    timestamp: '2024-01-15T08:45:00Z',
    user: 'Emily Davis',
    avatar: 'ED',
    category: 'Academic',
    priority: 'medium',
    metadata: {
      subject: 'Physics',
      averageScore: '78%',
      totalStudents: 32,
    }
  },
  {
    id: 4,
    type: 'announcement',
    title: 'Library Hours Extended',
    description: 'The school library will now be open until 8 PM on weekdays.',
    timestamp: '2024-01-14T16:20:00Z',
    user: 'Administrator',
    avatar: 'AD',
    category: 'Announcement',
    priority: 'low',
    metadata: {
      effectiveDate: '2024-01-20',
      newHours: '7 AM - 8 PM',
    }
  },
  {
    id: 5,
    type: 'meeting',
    title: 'Parent-Teacher Conference Scheduled',
    description: 'Monthly parent-teacher conferences have been scheduled for next week.',
    timestamp: '2024-01-14T14:10:00Z',
    user: 'Sarah Johnson',
    avatar: 'SJ',
    category: 'Meeting',
    priority: 'high',
    metadata: {
      date: '2024-01-22',
      time: '2:00 PM - 5:00 PM',
      location: 'Conference Room A',
    }
  },
  {
    id: 6,
    type: 'achievement',
    title: 'Student of the Month Award',
    description: 'Emma Wilson has been selected as Student of the Month for outstanding performance.',
    timestamp: '2024-01-14T11:30:00Z',
    user: 'Emma Wilson',
    avatar: 'EW',
    category: 'Achievement',
    priority: 'high',
    metadata: {
      award: 'Student of the Month',
      criteria: 'Academic Excellence',
      month: 'January 2024',
    }
  },
];

// Timeline Item Component
function TimelineItem({ item, index }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'assignment': return FileText;
      case 'event': return Calendar;
      case 'grade': return Star;
      case 'announcement': return Bell;
      case 'meeting': return Users;
      case 'achievement': return Award;
      default: return Bell;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'assignment': return 'primary';
      case 'event': return 'secondary';
      case 'grade': return 'success';
      case 'announcement': return 'warning';
      case 'meeting': return 'accent';
      case 'achievement': return 'success';
      default: return 'neutral';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'neutral';
    }
  };

  const Icon = getTypeIcon(item.type);
  const typeColor = getTypeColor(item.type);
  const priorityColor = getPriorityColor(item.priority);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex items-start space-x-4 pb-8"
    >
      {/* Timeline Line */}
      <div className="absolute left-6 top-12 w-0.5 h-full bg-neutral-200"></div>
      
      {/* Icon */}
      <div className={cn(
        "relative z-10 w-12 h-12 rounded-full flex items-center justify-center",
        typeColor === 'primary' && 'bg-primary-100',
        typeColor === 'secondary' && 'bg-secondary-100',
        typeColor === 'success' && 'bg-success-100',
        typeColor === 'warning' && 'bg-warning-100',
        typeColor === 'accent' && 'bg-accent-100',
        typeColor === 'error' && 'bg-error-100',
      )}>
        <Icon className={cn(
          "w-5 h-5",
          typeColor === 'primary' && 'text-primary-600',
          typeColor === 'secondary' && 'text-secondary-600',
          typeColor === 'success' && 'text-success-600',
          typeColor === 'warning' && 'text-warning-600',
          typeColor === 'accent' && 'text-accent-600',
          typeColor === 'error' && 'text-error-600',
        )} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="card-hover">
          <div className="card-body">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-neutral-900 truncate">{item.title}</h3>
                  <span className={cn(
                    "badge",
                    `badge-${priorityColor}`,
                    "text-xs"
                  )}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-2">{item.description}</p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <span className={cn("badge", `badge-${typeColor}`)}>{item.category}</span>
              </div>
            </div>

            {/* Metadata */}
            {item.metadata && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 p-3 bg-neutral-50 rounded-lg">
                {Object.entries(item.metadata).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="text-xs text-neutral-500 capitalize mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm font-medium text-neutral-900">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-neutral-500">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">{item.avatar}</span>
                </div>
                <span>{item.user}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatTime(item.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Filter Component
function TimelineFilters({ filters, onFilterChange }) {
  const categories = ['All', 'Academic', 'Event', 'Announcement', 'Meeting', 'Achievement'];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  return (
    <div className="card mb-6">
      <div className="card-body">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search timeline..."
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="input pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-neutral-700">Category:</label>
              <select
                value={filters.category}
                onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
                className="input text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-neutral-700">Priority:</label>
              <select
                value={filters.priority}
                onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
                className="input text-sm"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            <button className="btn-primary btn-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Timeline Component
export default function Timeline() {
  const [timelineData, setTimelineData] = useState(mockTimelineData);
  const [filteredData, setFilteredData] = useState(mockTimelineData);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    priority: 'All',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = timelineData;

    if (filters.search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.user.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== 'All') {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    if (filters.priority !== 'All') {
      filtered = filtered.filter(item => item.priority.toLowerCase() === filters.priority.toLowerCase());
    }

    setFilteredData(filtered);
  }, [filters, timelineData]);

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
            Timeline
          </h1>
          <p className="text-neutral-600">
            Stay updated with all school activities and events.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <TrendingUp className="w-4 h-4" />
            <span>{filteredData.length} events</span>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <TimelineFilters filters={filters} onFilterChange={setFilters} />

      {/* Timeline */}
      <div className="card">
        <div className="card-body">
          {filteredData.length > 0 ? (
            <div className="space-y-0">
              {filteredData.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">No events found</h3>
              <p className="text-neutral-600 mb-4">
                Try adjusting your filters or add a new event.
              </p>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Load More */}
      {filteredData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button className="btn-outline">
            Load More Events
          </button>
        </motion.div>
      )}
    </div>
  );
}


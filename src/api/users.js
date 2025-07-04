// src/api/users.js

// Initialize demo users if none exist
function initializeDemoUsers() {
  const existingUsers = JSON.parse(localStorage.getItem("school_users") || "[]");
  
  if (existingUsers.length === 0) {
    const demoUsers = [
      {
        id: 1,
        username: "admin",
        password: "password",
        role: "admin",
        parentId: null,
        fullName: "Administrator",
        email: "admin@edumart.com",
        phone: "+1-555-0101",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        username: "teacher",
        password: "password",
        role: "teacher",
        parentId: null,
        fullName: "Sarah Johnson",
        email: "sarah.johnson@edumart.com",
        phone: "+1-555-0102",
        subject: "Mathematics",
        experience: "5 years",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        username: "student",
        password: "password",
        role: "student",
        parentId: 4,
        fullName: "John Smith",
        email: "john.smith@student.edumart.com",
        phone: "+1-555-0103",
        grade: "10th Grade",
        studentId: "STU001",
        dateOfBirth: "2008-05-15",
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        username: "parent",
        password: "password",
        role: "parent",
        parentId: null,
        fullName: "Michael Smith",
        email: "michael.smith@parent.edumart.com",
        phone: "+1-555-0104",
        children: [3],
        occupation: "Engineer",
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        username: "teacher2",
        password: "password",
        role: "teacher",
        parentId: null,
        fullName: "Emily Davis",
        email: "emily.davis@edumart.com",
        phone: "+1-555-0105",
        subject: "Science",
        experience: "8 years",
        createdAt: new Date().toISOString(),
      },
      {
        id: 6,
        username: "student2",
        password: "password",
        role: "student",
        parentId: 7,
        fullName: "Emma Wilson",
        email: "emma.wilson@student.edumart.com",
        phone: "+1-555-0106",
        grade: "9th Grade",
        studentId: "STU002",
        dateOfBirth: "2009-03-22",
        createdAt: new Date().toISOString(),
      },
      {
        id: 7,
        username: "parent2",
        password: "password",
        role: "parent",
        parentId: null,
        fullName: "Jennifer Wilson",
        email: "jennifer.wilson@parent.edumart.com",
        phone: "+1-555-0107",
        children: [6],
        occupation: "Doctor",
        createdAt: new Date().toISOString(),
      },
    ];
    
    localStorage.setItem("school_users", JSON.stringify(demoUsers));
  }
}

// Initialize demo users on module load
initializeDemoUsers();

// Fetch all users from localStorage
export function getUsers() {
  return JSON.parse(localStorage.getItem("school_users") || "[]");
}

// Create/add a new user
export function createUser(user) {
  const users = getUsers();
  const newUser = {
    ...user,
    id: Date.now(),
    fullName: user.fullName || user.username,
    email: user.email || `${user.username}@edumart.com`,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem("school_users", JSON.stringify(users));
  return newUser;
}

// Update user information
export function updateUser(userId, updates) {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    localStorage.setItem("school_users", JSON.stringify(users));
    return users[userIndex];
  }
  
  return null;
}

// Delete user
export function deleteUser(userId) {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== userId);
  localStorage.setItem("school_users", JSON.stringify(filteredUsers));
  return true;
}

// Get user by ID
export function getUserById(userId) {
  const users = getUsers();
  return users.find(user => user.id === userId);
}

// Get users by role
export function getUsersByRole(role) {
  const users = getUsers();
  return users.filter(user => user.role === role);
}

// Set current session (logged-in user)
export function setSession(user) {
  localStorage.setItem("school_session", JSON.stringify(user));
}

// Get current session (logged-in user)
export function getSession() {
  return JSON.parse(localStorage.getItem("school_session"));
}

// Clear session on logout
export function clearSession() {
  localStorage.removeItem("school_session");
}

// Reset all data (for demo purposes)
export function resetDemoData() {
  localStorage.removeItem("school_users");
  localStorage.removeItem("school_session");
  initializeDemoUsers();
}


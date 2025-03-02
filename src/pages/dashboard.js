import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart3, 
  Users as UsersIcon, 
  Dumbbell, 
  Apple, 
  Home, 
  Bell, 
  Settings, 
  Search 
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Users from './Users'; // Assuming Users.js is in the same directory
import Workout from './Workout'; // Assuming Workout.js is in the same directory

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [userCount, setUserCount] = useState(7);
  const [workoutCount, setWorkoutCount] = useState(9);

  // Realistic dummy data with Nepali names and Gmail addresses
  const dummyUsers = [
    { _id: 1, firstName: "Aarav", lastName: "Shrestha", nickName: "Aaru", email: "aarav.shrestha@gmail.com", verified: true, disabled: false, isAdmin: false },
    { _id: 2, firstName: "Bimal", lastName: "Thapa", nickName: "Bim", email: "bimal.thapa90@gmail.com", verified: true, disabled: false, isAdmin: true },
    { _id: 3, firstName: "Chitra", lastName: "Gurung", nickName: "Chi", email: "chitra.gurung22@gmail.com", verified: false, disabled: false, isAdmin: false },
    { _id: 4, firstName: "Dinesh", lastName: "Rai", nickName: "Din", email: "dinesh.rai.np@gmail.com", verified: true, disabled: false, isAdmin: false },
    { _id: 5, firstName: "Esha", lastName: "Karki", nickName: "Esh", email: "esha.karki1995@gmail.com", verified: true, disabled: true, isAdmin: false },
    { _id: 6, firstName: "Gopal", lastName: "Bhandari", nickName: "Gopi", email: "gopal.bhandari88@gmail.com", verified: false, disabled: false, isAdmin: false },
    { _id: 7, firstName: "Hari", lastName: "Magar", nickName: "Haru", email: "hari.magar.np@gmail.com", verified: true, disabled: false, isAdmin: true },
    { _id: 8, firstName: "Indira", lastName: "Poudel", nickName: "Indi", email: "indira.poudel77@gmail.com", verified: true, disabled: false, isAdmin: false },
    { _id: 9, firstName: "Jivan", lastName: "Lama", nickName: "Jivi", email: "jivan.lama123@gmail.com", verified: true, disabled: false, isAdmin: false },
    { _id: 10, firstName: "Kiran", lastName: "Adhikari", nickName: "Kir", email: "kiran.adhikari.np@gmail.com", verified: false, disabled: true, isAdmin: false },
    { _id: 11, firstName: "Laxmi", lastName: "Dahal", nickName: "Lax", email: "laxmi.dahal99@gmail.com", verified: true, disabled: false, isAdmin: false },
    { _id: 12, firstName: "Manoj", lastName: "Bhattarai", nickName: "Manu", email: "manoj.bhattarai85@gmail.com", verified: true, disabled: false, isAdmin: true },
    { _id: 13, firstName: "Nisha", lastName: "Tamang", nickName: "Nish", email: "nisha.tamang22@gmail.com", verified: false, disabled: false, isAdmin: false },
    { _id: 14, firstName: "Om", lastName: "Pradhan", nickName: "Omi", email: "om.pradhan.np@gmail.com", verified: true, disabled: false, isAdmin: false },
    { _id: 15, firstName: "Puja", lastName: "Khanal", nickName: "Puj", email: "puja.khanal88@gmail.com", verified: true, disabled: false, isAdmin: false },
    { _id: 16, firstName: "Rajan", lastName: "Subedi", nickName: "Raj", email: "rajan.subedi77@gmail.com", verified: true, disabled: true, isAdmin: false },
    { _id: 17, firstName: "Sita", lastName: "Pokharel", nickName: "Sit", email: "sita.pokharel@gmail.com", verified: false, disabled: false, isAdmin: false },
    { _id: 18, firstName: "Tara", lastName: "Neupane", nickName: "Tar", email: "tara.neupane.np@gmail.com", verified: true, disabled: false, isAdmin: true },
    { _id: 19, firstName: "Umesh", lastName: "Basnet", nickName: "Umi", email: "umesh.basnet123@gmail.com", verified: true, disabled: false, isAdmin: false },
    { _id: 20, firstName: "Yamuna", lastName: "Sharma", nickName: "Yamu", email: "yamuna.sharma95@gmail.com", verified: true, disabled: false, isAdmin: false },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const usersResponse = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const workoutsResponse = await axios.get('/api/admin/workouts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
        setWorkouts(workoutsResponse.data);
        setUserCount(usersResponse.data.length);
        setWorkoutCount(workoutsResponse.data.length);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // Set realistic dummy data for testing
        setUsers(dummyUsers);
      }
    };
    fetchData();
  }, []);

  const workoutChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Workouts',
        data: [5, 8, 12, 15, 10, 7, 6], // Realistic weekly workout counts
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
      },
      {
        label: 'Calories Burned',
        data: [200, 300, 450, 500, 350, 250, 220], // Realistic calorie burn
        backgroundColor: '#f97316',
        borderColor: '#ea580c',
        borderWidth: 1,
      },
      {
        label: 'Steps',
        data: [8000, 9500, 12000, 11000, 9000, 10000, 8500], // Realistic step counts
        backgroundColor: '#8b5cf6',
        borderColor: '#7c3aed',
        borderWidth: 1,
      },
    ],
  };

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [2, 3, 5, 4, 6, 8], // Realistic monthly user growth
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <h3 className="text-2xl font-bold">{userCount}</h3>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <UsersIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Workouts</p>
                    <h3 className="text-2xl font-bold">{workoutCount}</h3>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Dumbbell className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
                <div className="h-64">
                  <Bar data={workoutChartData} options={chartOptions} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                <div className="h-64">
                  <Line data={userGrowthData} options={chartOptions} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbs</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-500">🍚</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Dal Bhat</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lunch</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">600</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12:30 PM</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">80 gm</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-500">🥟</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Momo</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dinner</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">450</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">07:00 PM</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50 gm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <Users users={users} />;
      case 'workouts':
        return <Workout workouts={workouts} />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Dumbbell className="h-8 w-8 text-orange-500 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">Fitness</h1>
          </div>
        </div>
        <nav className="mt-4">
          <div className="px-4 py-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeTab === 'overview' ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Home className="h-5 w-5 mr-3" />
              <span>Overview</span>
            </button>
          </div>
          <div className="px-4 py-2">
            <button 
              onClick={() => setActiveTab('users')}
              className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeTab === 'users' ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <UsersIcon className="h-5 w-5 mr-3" />
              <span>Users</span>
            </button>
          </div>
          <div className="px-4 py-2">
            <button 
              onClick={() => setActiveTab('workouts')}
              className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeTab === 'workouts' ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Dumbbell className="h-5 w-5 mr-3" />
              <span>Workouts</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm text-gray-500">Good Morning</p>
              <h2 className="text-xl font-semibold text-gray-800">Welcome Back!</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-6 w-6 text-gray-600" />
              </button>
              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                AD
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
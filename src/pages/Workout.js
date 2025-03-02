// src/pages/Workout.js
import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Calendar, 
  Clock, 
  Weight, 
  Repeat, 
  Plus, 
  Trash2, 
  Save, 
  Edit, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

const Workout = () => {
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [exercises, setExercises] = useState([
    {
      id: Date.now().toString(),
      name: '',
      sets: 3,
      reps: 10,
      weight: 0,
      restTime: 60,
      currentRepMax: false
    }
  ]);
  const [categories, setCategories] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [expandedWorkout, setExpandedWorkout] = useState(null);

  useEffect(() => {
    // Simulated API data for categories
    const workoutCategories = [
      { _id: '1', name: 'Chest Day', description: 'Focus on chest muscles', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { _id: '2', name: 'Leg Day', description: 'Focus on leg muscles', imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { _id: '3', name: 'Back & Biceps', description: 'Focus on back and biceps', imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { _id: '4', name: 'Shoulders & Triceps', description: 'Focus on shoulders and triceps', imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { _id: '5', name: 'Full Body', description: 'Full body workout', imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ];
    setCategories(workoutCategories);

    // Simulated 20 workout entries
    const dummyWorkouts = Array.from({ length: 20 }, (_, i) => {
      const category = workoutCategories[i % 5]; // Cycle through categories
      const date = new Date(2025, 2, i + 1).toISOString().split('T')[0]; // March 2025 dates
      return {
        _id: `${101 + i}`,
        exercises: [
          { id: `${1001 + i * 10}`, name: `Exercise ${i + 1}A`, sets: 4, reps: 8, weight: 50 + i * 5, restTime: 60, currentRepMax: i % 2 === 0 },
          { id: `${1002 + i * 10}`, name: `Exercise ${i + 1}B`, sets: 3, reps: 12, weight: 30 + i * 5, restTime: 90, currentRepMax: i % 3 === 0 }
        ],
        category: category,
        date: date,
        user: 'user123'
      };
    });
    setWorkouts(dummyWorkouts);
  }, []);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        id: Date.now().toString(),
        name: '',
        sets: 3,
        reps: 10,
        weight: 0,
        restTime: 60,
        currentRepMax: false
      }
    ]);
  };

  const clearFields = () => {
    setExercises([
      {
        id: Date.now().toString(),
        name: '',
        sets: 3,
        reps: 10,
        weight: 0,
        restTime: 60,
        currentRepMax: false
      }
    ]);
    setSelectedCategory('');
    setWorkoutDate(new Date().toISOString().split('T')[0]);
  };

  const removeExercise = (id) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter(exercise => exercise.id !== id));
    }
  };

  const updateExercise = (id, field, value) => {
    setExercises(
      exercises.map(exercise => 
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!workoutDate) {
      alert('Error: Workout Date is required');
      return;
    }
    if (!selectedCategory) {
      alert('Error: Workout Category is required');
      return;
    }
    if (exercises.some(ex => !ex.name.trim())) {
      alert('Error: All exercise names are required');
      return;
    }

    // Create new workout object
    const newWorkout = {
      _id: Date.now().toString(),
      exercises: exercises,
      category: categories.find(cat => cat._id === selectedCategory),
      date: workoutDate,
      user: 'user123'
    };

    console.log('Submitting workout:', newWorkout);
    setWorkouts([newWorkout, ...workouts]);
    
    // Clear fields and show success message
    clearFields();
    alert('Success: Workout logged successfully!');
  };

  const toggleWorkoutDetails = (workoutId) => {
    if (expandedWorkout === workoutId) {
      setExpandedWorkout(null);
    } else {
      setExpandedWorkout(workoutId);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <Dumbbell className="mr-3 text-orange-500" />
        Workout Tracker
      </h1>

      {/* Workout Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Log New Workout</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                Workout Date
              </label>
              <input
                type="date"
                value={workoutDate}
                onChange={(e) => setWorkoutDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workout Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">Exercises</h3>
              <button
                type="button"
                onClick={() => {
                  if (exercises.some(ex => !ex.name.trim())) {
                    alert('Error: Please fill in all exercise names before adding a new one');
                  } else {
                    addExercise();
                    clearFields();
                    alert('Success: New exercise added!');
                  }
                }}
                className="flex items-center px-3 py-1.5 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Exercise
              </button>
            </div>

            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={exercise.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">Exercise {index + 1}</h4>
                    {exercises.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExercise(exercise.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Exercise Name
                      </label>
                      <input
                        type="text"
                        value={exercise.name}
                        onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., Bench Press"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <Repeat className="h-3 w-3 mr-1 text-orange-500" />
                        Sets
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <Repeat className="h-3 w-3 mr-1 text-orange-500" />
                        Reps
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(exercise.id, 'reps', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <Weight className="h-3 w-3 mr-1 text-orange-500" />
                        Weight (lbs)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="2.5"
                        value={exercise.weight}
                        onChange={(e) => updateExercise(exercise.id, 'weight', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-orange-500" />
                        Rest Time (sec)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="5"
                        value={exercise.restTime}
                        onChange={(e) => updateExercise(exercise.id, 'restTime', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`repmax-${exercise.id}`}
                        checked={exercise.currentRepMax}
                        onChange={(e) => updateExercise(exercise.id, 'currentRepMax', e.target.checked)}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`repmax-${exercise.id}`} className="ml-2 block text-sm text-gray-700">
                        Current Rep Max
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Workout
            </button>
          </div>
        </form>
      </div>

      {/* Workout History Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Workout History</h2>
        
        {workouts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No workouts logged yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exercises</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workouts.map(workout => (
                  <React.Fragment key={workout._id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatDate(workout.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full object-cover" src={workout.category.imageUrl} alt={workout.category.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{workout.category.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{workout.exercises.length} exercises</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => toggleWorkoutDetails(workout._id)}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                          >
                            {expandedWorkout === workout._id ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Hide
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Details
                              </>
                            )}
                          </button>
                          <button className="text-orange-600 hover:text-orange-900 flex items-center">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 flex items-center">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedWorkout === workout._id && (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 bg-gray-50">
                          <div className="border-t border-b border-gray-200 py-3">
                            <h4 className="font-medium text-gray-700 mb-2">Exercise Details:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {workout.exercises.map((exercise) => (
                                <div key={exercise.id} className="bg-white p-3 rounded border border-gray-200">
                                  <div className="font-medium text-gray-800 mb-1">{exercise.name}</div>
                                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                    <div>Sets: {exercise.sets}</div>
                                    <div>Reps: {exercise.reps}</div>
                                    <div>Weight: {exercise.weight} lbs</div>
                                    <div>Rest: {exercise.restTime} sec</div>
                                  </div>
                                  {exercise.currentRepMax && (
                                    <div className="mt-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block">
                                      Current Rep Max
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workout;
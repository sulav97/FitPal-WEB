import React, { useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:8080/';

const FoodSearch = ({ selectedDate, onFoodSuccess }) => {
    const [query, setQuery] = useState('');
    const [macros, setMacros] = useState(null);
    const [servings, setServings] = useState('');
    const email = localStorage.getItem('email');

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${baseURL}api/calories/macros?query=${query}&servings=${servings}`);
            setMacros(response.data);
        } catch (error) {
            alert('Error fetching macro information');
        }
    };

    const handleLogFood = async () => {
        if (macros) {
            const localDate = new Date(selectedDate);
            const utcDate = new Date(Date.UTC(
                localDate.getFullYear(),
                localDate.getMonth(),
                localDate.getDate()
            ));

            try {
                await axios.post(`${baseURL}api/calories/macros/log`, {
                    email,
                    date: utcDate.toISOString(),
                    item: macros.item,
                    calories: macros.calories,
                    protein: macros.proteins,
                    carbohydrates: macros.carbohydrates,
                    fats: macros.fats,
                    servings
                });
                onFoodSuccess();
            } catch (error) {
                alert('Error logging food item');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Food Search</h2>

            {/* Food Search Form */}
            <form onSubmit={handleSearch} className="space-y-4">
                <div>
                    <label className="block font-semibold text-gray-700">Search Food</label>
                    <input
                        type="text"
                        placeholder="Enter food name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-semibold text-gray-700">Servings</label>
                    <input
                        type="number"
                        placeholder="Enter servings"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Search
                </button>
            </form>

            {/* Macros Display */}
            {macros && (
                <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800">{macros.item}</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <p className="text-gray-700"><strong>Carbohydrates:</strong> {macros.carbohydrates} g</p>
                        <p className="text-gray-700"><strong>Fats:</strong> {macros.fats} g</p>
                        <p className="text-gray-700"><strong>Proteins:</strong> {macros.proteins} g</p>
                        <p className="text-gray-700"><strong>Calories:</strong> {macros.calories} kcal</p>
                    </div>
                    <button
                        onClick={handleLogFood}
                        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Log {servings} serving(s) for {selectedDate.toDateString()}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FoodSearch;

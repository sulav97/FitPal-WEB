import React, { useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:8080/';

const LogCalories = ({ selectedDate, onLogSuccess }) => {
    const email = localStorage.getItem('email');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [fats, setFats] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const localDate = new Date(selectedDate);
            const utcDate = new Date(Date.UTC(
                localDate.getFullYear(),
                localDate.getMonth(),
                localDate.getDate()
            ));

            await axios.post(`${baseURL}api/calories/logcalories`, {
                email,
                localDate: utcDate.toISOString(),
                calories,
                protein,
                carbohydrates,
                fats,
            });

            // Clear form after successful submission
            setCalories('');
            setProtein('');
            setCarbohydrates('');
            setFats('');
            onLogSuccess();
        } catch (error) {
            alert('Error logging calories');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Log Calories</h2>
            <p className="text-gray-600 text-center mb-6">Logging calories for <strong>{selectedDate.toDateString()}</strong></p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold text-gray-700">Calories (kcal)</label>
                    <input
                        type="number"
                        placeholder="Enter calories"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block font-semibold text-gray-700">Protein (g)</label>
                        <input
                            type="number"
                            placeholder="Protein"
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Carbs (g)</label>
                        <input
                            type="number"
                            placeholder="Carbs"
                            value={carbohydrates}
                            onChange={(e) => setCarbohydrates(e.target.value)}
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Fats (g)</label>
                        <input
                            type="number"
                            placeholder="Fats"
                            value={fats}
                            onChange={(e) => setFats(e.target.value)}
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Log Calories
                </button>
            </form>
        </div>
    );
};

export default LogCalories;

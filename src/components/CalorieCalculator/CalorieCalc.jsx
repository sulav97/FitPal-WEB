import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : 'https://mustang-central-eb5dd97b4796.herokuapp.com/';

const CalorieCalc = () => {
    const [formData, setFormData] = useState({
        targetWeight: '',
        startDate: '',
        endDate: '',
    });
    const [macroForm, setMacroForm] = useState({
        fat: '',
        protein: '',
        carbohydrates: '',
        type: 'maintenance',
    });
    const [calorieMaintenance, setCalorieMaintenance] = useState(null);
    const [dailyCalories, setDailyCalories] = useState(null);
    const [macroGrams, setMacroGrams] = useState({
        fatGrams: null,
        proteinGrams: null,
        carbGrams: null,
    });
    const [error, setError] = useState('');
    const email = localStorage.getItem('email');

    useEffect(() => {
        const fetchCaloricMaintenance = async () => {
            try {
                const res = await axios.get(`${baseURL}api/calc/calculate/${email}`);
                setCalorieMaintenance(parseFloat(res.data.calorie_Maintenance).toFixed(2));
            } catch (err) {
                setError('Please initialize your profile before calculating Caloric Intake.');
                setCalorieMaintenance(null);
            }
        };
        fetchCaloricMaintenance();
    }, [email]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMacroChange = (e) => {
        setMacroForm({ ...macroForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${baseURL}api/calc/calculate-DC/${email}`, { params: formData });
            setDailyCalories(parseFloat(res.data.dailyCalories).toFixed(2));
            setError('');
        } catch (err) {
            setError('Error calculating daily calories. Please check your input.');
            setDailyCalories(null);
        }
    };

    const handleStoreCaloricValue = async (type) => {
        try {
            const caloricValue = type === 'maintenance' ? calorieMaintenance : dailyCalories;
            await axios.post(`${baseURL}api/calc/store-caloric-value`, {
                email,
                [type === 'maintenance' ? 'caloricMaintenance' : 'dailyCalories']: caloricValue,
            });
            localStorage.setItem('dailyCalories', caloricValue);
        } catch (err) {
            setError('Error storing caloric value. Please try again later.');
        }
    };

    const handleCalculateMacros = async (e) => {
        e.preventDefault();
        const totalPercentage = parseFloat(macroForm.fat) + parseFloat(macroForm.protein) + parseFloat(macroForm.carbohydrates);
        if (totalPercentage !== 100) {
            setError('The total macronutrient percentages must equal 100%.');
            return;
        }
        try {
            const res = await axios.get(`${baseURL}api/calc/calculate-macros/${email}`, { params: macroForm });
            setMacroGrams({
                fatGrams: res.data.fatGrams.toFixed(2),
                proteinGrams: res.data.proteinGrams.toFixed(2),
                carbGrams: res.data.carbGrams.toFixed(2),
            });
            localStorage.setItem("MacroGrams", JSON.stringify(macroGrams));
            setError('');
        } catch (err) {
            setError('Error calculating macros. Please check your input.');
            setMacroGrams({ fatGrams: null, proteinGrams: null, carbGrams: null });
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Caloric & Macro Calculator</h1>
            
            {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

            {/* Daily Caloric Intake Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Target Weight (kg)</label>
                    <input type="number" name="targetWeight" value={formData.targetWeight} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Start Date</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block font-medium">End Date</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Calculate Daily Calories
                </button>
            </form>

            {/* Results */}
            {calorieMaintenance && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
                    <p><strong>Caloric Maintenance:</strong> {calorieMaintenance} kcal/day</p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => handleStoreCaloricValue('maintenance')}>
                        Store Maintenance Calories
                    </button>
                </div>
            )}
            {dailyCalories && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
                    <p><strong>Daily Caloric Intake:</strong> {dailyCalories} kcal/day</p>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => handleStoreCaloricValue('daily')}>
                        Store Daily Calories
                    </button>
                </div>
            )}

            {/* Macronutrient Ratio Form */}
            <h2 className="text-lg font-bold mt-8">Macronutrient Breakdown</h2>
            <form onSubmit={handleCalculateMacros} className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                    {['Fat', 'Protein', 'Carbohydrates'].map((macro) => (
                        <div key={macro}>
                            <label className="block font-medium">{macro} (%)</label>
                            <input type="number" name={macro.toLowerCase()} value={macroForm[macro.toLowerCase()]} onChange={handleMacroChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    ))}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Calculate Macros
                </button>
            </form>
        </div>
    );
};

export default CalorieCalc;

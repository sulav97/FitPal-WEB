import React, { useState } from "react";
import Exercises from "../components/Exercises";
import HeroBanner from "../components/HeroBanner";
import SearchExercises from "../components/SearchExercises";
import homePhoto from "../Assets/homephoto.png"; // ✅ Ensure this is a high-quality image

const Home = () => {
    const [bodyPart, setBodyPart] = useState("all");
    const [exercises, setExercises] = useState([]);

    return (
        <div className="min-h-screen">
            {/* Hero Banner with High-Quality Background */}
            <div 
                className="relative h-[500px] flex items-center justify-center bg-no-repeat"
                style={{ 
                    backgroundImage: `url(${homePhoto})`, 
                    backgroundSize: "cover",   // ✅ High-quality display
                    backgroundPosition: "center", // ✅ Keeps it well aligned
                    backgroundRepeat: "no-repeat"
                }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-4xl font-bold">Welcome to Your Fitness Journey</h1>
                    <p className="mt-4 text-lg">Find the best workouts tailored for you!</p>
                </div>
            </div>

            {/* Search and Exercises Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchExercises
                    setExercises={setExercises}
                    bodyPart={bodyPart}
                    setBodyPart={setBodyPart}
                />
                <Exercises 
                    exercises={exercises} 
                    setExercises={setExercises} 
                    bodyPart={bodyPart} 
                />
            </div>
        </div>
    );
};

export default Home;

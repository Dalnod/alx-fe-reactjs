import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userData from '../data.json';

function Homepage() {
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setData(userData);
    }, []);

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    const handleViewRecipe = (id) => {
        alert(`View Recipe #${id}`);
    };

    if (!data || data.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((recipeData) => {
                    const isFavorite = favorites.includes(recipeData.id);
                    return (
                        <Link to={`/recipe/${recipeData.id}`} key={recipeData.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 block">
                            {/* Recipe Image */}
                            <div className="relative">
                                <img
                                    src={recipeData.image}
                                    alt={recipeData.title}
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    onClick={e => { e.preventDefault(); toggleFavorite(recipeData.id); }}
                                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
                                >
                                    {isFavorite ? (
                                        <span className="text-red-500 text-xl">❤️</span>
                                    ) : (
                                        <span className="text-gray-400 text-xl">🤍</span>
                                    )}
                                </button>
                                {/* Recipe ID Badge */}
                                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                                    Recipe #{recipeData.id}
                                </div>
                            </div>
                            {/* Card Content */}
                            <div className="p-6">
                                {/* Recipe Title */}
                                <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                                    {recipeData.title}
                                </h2>
                                {/* Recipe Summary */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    {recipeData.summary}
                                </p>
                                {/* Recipe Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {recipeData.tags && recipeData.tags.map((tag, idx) => (
                                        <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleViewRecipe(recipeData.id)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        View Recipe
                                    </button>
                                    <button className="px-4 py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Homepage;
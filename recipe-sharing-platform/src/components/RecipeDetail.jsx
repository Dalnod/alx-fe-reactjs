
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import data from '../data.json';

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const found = data.find(r => r.id === Number(id));
        setRecipe(found);
    }, [id]);

    if (!recipe) {
        return <div className="p-8 text-center text-lg text-gray-500">Recipe not found.</div>;
    }

    // Fallbacks for missing fields
    const tags = recipe.tags && Array.isArray(recipe.tags) ? recipe.tags : ["No tags available"];
    const ingredients = Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0
        ? recipe.ingredients
        : ["No ingredients listed for this recipe."];
    const instructions = Array.isArray(recipe.instructions) && recipe.instructions.length > 0
        ? recipe.instructions
        : ["No instructions provided for this recipe."];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-2">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 leading-tight text-center sm:text-left">{recipe.title}</h1>
                    <p className="text-gray-600 text-base mb-2 text-center sm:text-left">{recipe.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
                        {tags.map((tag, idx) => (
                            <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="mb-6 bg-gray-100 rounded-lg p-4 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">Ingredients</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-base">
                            {ingredients.map((ing, idx) => (
                                <li key={idx} className={ingredients[0].startsWith('No ingredients') ? 'italic text-gray-400' : ''}>{ing}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">Instructions</h2>
                        <ol className="list-decimal list-inside text-gray-700 space-y-1 text-base">
                            {instructions.map((step, idx) => (
                                <li key={idx} className={instructions[0].startsWith('No instructions') ? 'italic text-gray-400' : ''}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail;

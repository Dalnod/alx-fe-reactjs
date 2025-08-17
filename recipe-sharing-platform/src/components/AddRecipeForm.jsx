import { useState } from 'react';

function AddRecipeForm() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required.';
        if (!ingredients.trim()) {
            newErrors.ingredients = 'Ingredients are required.';
        } else {
            // Split ingredients by comma and check for at least two items
            const items = ingredients.split(',').map(i => i.trim()).filter(i => i);
            if (items.length < 2) {
                newErrors.ingredients = 'Please enter at least two ingredients, separated by commas.';
            }
        }
        if (!steps.trim()) newErrors.steps = 'Preparation steps are required.';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSuccess(false);
            return;
        }
        setErrors({});
        setSuccess(true);
        // Here you would handle posting the data to your backend or state
        // Reset form (optional)
        setTitle('');
        setIngredients('');
        setSteps('');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-2">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 sm:p-10 md:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">Add New Recipe</h2>
                {success && <div className="mb-4 text-green-600 text-center">Recipe submitted successfully!</div>}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Recipe Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'} transition-all duration-200 text-base sm:text-lg`}
                        placeholder="Enter recipe title"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Ingredients</label>
                    <textarea
                        value={ingredients}
                        onChange={e => setIngredients(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.ingredients ? 'border-red-500' : 'border-gray-300'} transition-all duration-200 text-base sm:text-lg`}
                        placeholder="List ingredients, separated by commas"
                        rows={4}
                    />
                    {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Preparation Steps</label>
                    <textarea
                        value={steps}
                        onChange={e => setSteps(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.steps ? 'border-red-500' : 'border-gray-300'} transition-all duration-200 text-base sm:text-lg`}
                        placeholder="Describe the preparation steps"
                        rows={4}
                    />
                    {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                >
                    Submit Recipe
                </button>
            </form>
        </div>
    );
}

export default AddRecipeForm;

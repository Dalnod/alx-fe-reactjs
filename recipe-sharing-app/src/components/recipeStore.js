import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [], // Initial state: empty array of recipes
  addRecipe: (newRecipe) => 
    set((state) => ({ recipes: [...state.recipes, newRecipe] })), // Add new recipe
  setRecipes: (recipes) => set({ recipes }), // Overwrite entire recipes array
}));

export default useRecipeStore;
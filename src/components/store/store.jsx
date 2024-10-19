import { create } from 'zustand';

const useDictionaryStore = create((set) => ({
  word: '',
  definitions: [],
  error: null,

  
  setWord: (word) => set(() => ({ word })),

  
  fetchDefinitions: async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      
      if (!response.ok) {
        throw new Error('Word not found');
      }

      const data = await response.json();
      
      // Destructuring data for better readability
      set(() => ({
        definitions: data,
        error: null,
      }));
      
    } catch (error) {
      set(() => ({
        error: error.message || 'Word cannot be found',
        definitions: [],
      }));
    }
  },
}));

export default useDictionaryStore;

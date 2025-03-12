
import React from 'react';

const FoodLogTable = ({ entries, deleteEntry }) => {
  return (
    <div className="glass p-8 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6">Today's Food Log</h2>
      
      {entries.length === 0 ? (
        <p className="text-white/80 text-center py-4">No entries yet. Add your first meal above!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4 text-white font-medium">Food</th>
                <th className="text-center py-3 px-4 text-white font-medium">Meal</th>
                <th className="text-center py-3 px-4 text-white font-medium">Time</th>
                <th className="text-center py-3 px-4 text-white font-medium">Calories</th>
                <th className="text-right py-3 px-4 text-white font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(entry => (
                <tr key={entry.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">{entry.food}</td>
                  <td className="py-3 px-4 text-white text-center">{entry.meal}</td>
                  <td className="py-3 px-4 text-white text-center">{entry.time}</td>
                  <td className="py-3 px-4 text-white text-center">{entry.calories}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FoodLogTable;

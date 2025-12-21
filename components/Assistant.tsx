
import React, { useState } from 'react';
import { getGeminiRecommendation } from '../services/geminiService';
import { MOVIES } from '../constants';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    const rec = await getGeminiRecommendation(mood, MOVIES);
    setResponse(rec || "Sorry, I couldn't come up with a suggestion.");
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      {isOpen && (
        <div className="w-72 md:w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 mb-2 pointer-events-auto transform animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <h3 className="font-bold text-rose-500">Vision Smart Assistant</h3>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-zinc-300 leading-relaxed">
              {response || "Hello! How are you feeling today? I'll suggest the perfect movie for your mood."}
            </div>
            
            {!response && !loading && (
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="e.g.: I want something exciting"
                  className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
                />
                <button 
                  onClick={handleAsk}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl py-2 text-sm font-semibold transition-colors"
                >
                  Ask for Suggestion
                </button>
              </div>
            )}
            
            {loading && <div className="text-center text-xs text-zinc-500 py-4 italic">Thinking...</div>}
            
            {response && (
              <button 
                onClick={() => {setResponse(''); setMood('');}}
                className="text-xs text-rose-500 hover:underline"
              >
                Ask another question?
              </button>
            )}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-rose-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform pointer-events-auto"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Assistant;

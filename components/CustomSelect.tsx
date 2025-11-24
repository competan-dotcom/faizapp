import React, { useState, useRef, useEffect } from 'react';
import { CalculationType, FormulaConfig } from '../types';

interface CustomSelectProps {
  options: Record<CalculationType, FormulaConfig>;
  selectedType: CalculationType;
  onChange: (type: CalculationType) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, selectedType, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options[selectedType];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (key: string) => {
    onChange(key as CalculationType);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-8" ref={containerRef}>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
        İşlem Seçiniz
      </label>
      
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-indigo-300 transition-all duration-300 group ${isOpen ? 'ring-4 ring-indigo-500/10 border-indigo-500' : ''}`}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={selectedOption.icon} />
             </svg>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold text-slate-900 text-base">{selectedOption.title}</span>
            <span className="text-xs text-slate-400 hidden sm:block">Hesaplama Aracı</span>
          </div>
        </div>
        
        <div className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-3 w-full bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200 origin-top">
          <div className="max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent p-2 space-y-1">
            {(Object.entries(options) as [string, FormulaConfig][]).map(([key, config]) => {
              const isSelected = selectedType === key;
              return (
                <div
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                    isSelected 
                      ? 'bg-indigo-50 text-indigo-900' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-indigo-500 group-hover:shadow-sm'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
                    </svg>
                  </div>
                  <span className={`font-semibold text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {config.title}
                  </span>
                  
                  {isSelected && (
                    <div className="ml-auto text-indigo-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
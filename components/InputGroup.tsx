import React, { useState, useEffect, useRef } from 'react';
import { InputFieldConfig } from '../types';

interface InputGroupProps {
  config: InputFieldConfig;
  value: number | string;
  onChange: (key: string, value: string) => void;
}

export const InputGroup: React.FC<InputGroupProps> = ({ config, value, onChange }) => {
  const [displayValue, setDisplayValue] = useState<string>('');
  const isFocused = useRef(false);

  // Helper to format numbers with thousands separator (TR locale: 1.000,50)
  const formatNumber = (num: number | string) => {
    if (num === '' || num === undefined) return '';
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(n)) return '';
    
    // Use Intl for nice formatting
    return new Intl.NumberFormat('tr-TR', {
      maximumFractionDigits: 10, // Allow precision but don't force zeros
    }).format(n);
  };

  // Sync prop value to display value when not focused (avoids cursor jumping)
  useEffect(() => {
    if (!isFocused.current) {
      if (value !== undefined && value !== '') {
        setDisplayValue(formatNumber(value));
      } else {
        setDisplayValue('');
      }
    }
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    isFocused.current = true;
    // On focus, show the raw number (with comma for decimal) to make editing easier
    if (value) {
      // Convert standard JS float (dot) to TR input format (comma)
      setDisplayValue(value.toString().replace('.', ','));
    }
  };

  const handleBlur = () => {
    isFocused.current = false;
    // Re-format on blur
    if (value) {
      setDisplayValue(formatNumber(value));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    
    // Allow digits and comma only
    if (!/^[0-9,]*$/.test(rawVal)) {
      return; 
    }

    setDisplayValue(rawVal);

    // Convert to standard format for parent state (replace comma with dot)
    const standardVal = rawVal.replace(',', '.');
    
    // Send to parent.
    onChange(config.key, standardVal);
  };

  return (
    <div className="flex flex-col gap-2 group">
      <label className="text-base font-bold text-slate-500 uppercase tracking-wider group-focus-within:text-indigo-600 transition-colors">
        {config.label}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          placeholder={config.placeholder}
          value={displayValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-full bg-white border-2 border-slate-200 text-slate-900 px-4 py-4 text-lg rounded-xl focus:outline-none focus:ring-0 focus:border-indigo-500 transition-all placeholder-slate-400 font-bold tracking-tight shadow-sm hover:border-slate-300"
        />
      </div>
    </div>
  );
};
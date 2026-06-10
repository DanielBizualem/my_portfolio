'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface Country {
  name: string;
  code: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'Nepal', code: '+977', flag: '🇳🇵' },
  { name: 'Belgium', code: '+32', flag: '🇧🇪' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Denmark', code: '+45', flag: '🇩🇰' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
];

interface CountryPhoneInputProps {
  isDarkMode: boolean;
  phone: string;
  selectedCode: string;
  onChange: (data: { phone: string; countryCode: string }) => void;
}

export default function CountryPhoneInput({ isDarkMode, phone, selectedCode, onChange }: CountryPhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCountry = COUNTRIES.find((c) => c.code === selectedCode) || COUNTRIES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter countries list based on search bar string
  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.includes(searchQuery)
  );

  const handleCountrySelect = (code: string) => {
    onChange({ phone, countryCode: code });
    setIsOpen(false);
    setSearchQuery('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep only numbers and spaces
    const cleanValue = e.target.value.replace(/[^0-9 ]/g, '');
    onChange({ phone: cleanValue, countryCode: selectedCode });
  };

  return (
    <div className="space-y-2 w-full" ref={dropdownRef}>
      <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        Phone Number
      </label>

      {/* Main Container Input Group Box */}
      <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${
        isOpen 
          ? (isDarkMode ? 'border-cyan-500 bg-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'border-blue-500 bg-white shadow-[0_0_15px_rgba(37,99,235,0.1)]')
          : (isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-200')
      }`}>
        
        {/* Interactive Custom Trigger Button Block */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-3 border-r h-full transition-colors font-medium text-sm rounded-l-xl select-none ${
            isDarkMode ? 'border-slate-800/80 hover:bg-slate-800/40 text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-900'
          }`}
        >
          <span className="text-lg leading-none">{currentCountry.flag}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 opacity-70 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Selected Area Dial Code Inline Metric Indicator */}
        <span className={`text-sm font-semibold pl-3 select-none pointer-events-none ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {currentCountry.code}
        </span>

        {/* Core Native Number Input Fields */}
        <input
          type="tel"
          name="phone"
          required
          value={phone}
          onChange={handlePhoneChange}
          placeholder="576 908 413"
          className={`w-full text-sm pl-2 pr-4 py-3 bg-transparent outline-none border-none rounded-r-xl ${
            isDarkMode ? 'text-white placeholder-slate-600' : 'text-slate-900 placeholder-slate-400'
          }`}
        />

        {/* Custom Animated Popup Dropdown Drawer Container */}
        {isOpen && (
          <div className={`absolute left-0 top-[105%] w-72 rounded-xl border z-50 shadow-xl p-2 transition-all overflow-hidden ${
            isDarkMode ? 'bg-[#092230] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Inline Input Filter Bar Section */}
            <div className="relative flex items-center mb-2">
              <Search className={`w-4 h-4 absolute left-3 pointer-events-none ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for country..."
                className={`w-full text-xs pl-9 pr-3 py-2 rounded-lg border outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-800 focus:border-cyan-500/50 text-white placeholder-slate-600' 
                    : 'bg-slate-50 border-slate-200 focus:border-blue-500/50 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* List Loop Context Frame */}
            <div className="max-h-56 overflow-y-auto custom-scrollbar space-y-0.5">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.name}
                    type="button"
                    onClick={() => handleCountrySelect(country.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      isDarkMode 
                        ? 'hover:bg-slate-800/60 text-slate-200 hover:text-white' 
                        : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                    } ${selectedCode === country.code ? (isDarkMode ? 'bg-cyan-950/40 text-cyan-400' : 'bg-blue-50 text-blue-600') : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                    <span className={`font-semibold opacity-60`}>{country.code}</span>
                  </button>
                ))
              ) : (
                <div className="text-center py-4 text-xs opacity-50">No country matched</div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
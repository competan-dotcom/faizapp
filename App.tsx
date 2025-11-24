
import React, { useState } from 'react';
import { CalculationType, InputValues } from './types';
import { FORM_CONFIGS } from './constants';
import { InputGroup } from './components/InputGroup';
import { ResultChart } from './components/ResultChart';
import * as Calculations from './utils/calculations';

function App() {
  const [selectedType, setSelectedType] = useState<CalculationType>(CalculationType.SIMPLE_INTEREST);
  const [inputs, setInputs] = useState<InputValues>({});
  const [result, setResult] = useState<number | null>(null);

  const currentConfig = FORM_CONFIGS[selectedType];

  const handleInputChange = (key: string, value: string) => {
    if (value === '' || value === '.') {
       setInputs((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setResult(null);
      return;
    }

    const floatVal = parseFloat(value);
    
    setInputs((prev) => ({
      ...prev,
      [key]: isNaN(floatVal) ? 0 : floatVal,
    }));
    setResult(null); 
  };

  const handleTypeChange = (key: string) => {
    setSelectedType(key as CalculationType);
    setInputs({});
    setResult(null);
  };

  const handleCalculate = () => {
    const requiredKeys = currentConfig.inputs.map(i => i.key);
    const isValid = requiredKeys.every(key => inputs[key] !== undefined && !isNaN(inputs[key]));

    if (!isValid) {
      alert("Lütfen tüm alanları geçerli sayılarla doldurunuz.");
      return;
    }

    let calculatedValue = 0;

    switch (selectedType) {
      case CalculationType.SIMPLE_INTEREST:
        calculatedValue = Calculations.calculateSimpleInterest(inputs);
        break;
      case CalculationType.COMPOUND_INTEREST:
        calculatedValue = Calculations.calculateCompoundInterest(inputs);
        break;
      case CalculationType.LOAN_PMT:
        calculatedValue = Calculations.calculateLoanPMT(inputs);
        break;
      case CalculationType.REAL_INTEREST:
        calculatedValue = Calculations.calculateRealInterest(inputs);
        break;
      case CalculationType.NPV:
        calculatedValue = Calculations.calculateNPV(inputs);
        break;
      case CalculationType.DEPOSIT_RETURN:
        calculatedValue = Calculations.calculateDepositReturn(inputs);
        break;
      case CalculationType.INTERNAL_DISCOUNT:
        calculatedValue = Calculations.calculateInternalDiscount(inputs);
        break;
      case CalculationType.EXTERNAL_DISCOUNT:
        calculatedValue = Calculations.calculateExternalDiscount(inputs);
        break;
    }

    setResult(calculatedValue);
  };

  const formatResult = (val: number, type: CalculationType) => {
    if (type === CalculationType.REAL_INTEREST) {
      return `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(val)}`;
    }
    return new Intl.NumberFormat('tr-TR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val) + ' TL';
  };

  const getResultLabel = (type: CalculationType) => {
    switch (type) {
        case CalculationType.SIMPLE_INTEREST:
        case CalculationType.COMPOUND_INTEREST:
            return "Hesaplanan Faiz Tutarı";
        case CalculationType.LOAN_PMT:
            return "Aylık Taksit Tutarı";
        case CalculationType.REAL_INTEREST:
            return "Reel Getiri Oranı";
        case CalculationType.DEPOSIT_RETURN:
            return "Net Mevduat Getirisi";
        case CalculationType.NPV:
            return "Net Bugünkü Değer";
        case CalculationType.INTERNAL_DISCOUNT:
        case CalculationType.EXTERNAL_DISCOUNT:
            return "Peşin / İskontolu Değer";
        default:
            return "Hesaplanan Tutar";
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-16 px-4 bg-slate-50 relative overflow-x-hidden font-sans font-bold text-slate-900">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-indigo-50 via-white to-transparent -z-10"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[120px] -z-10 mix-blend-multiply"></div>
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>

      <div className="max-w-4xl mx-auto">
        
        {/* Header - Strictly Aligned Top & Bottom */}
        <header className="mb-8 md:mb-12 flex flex-row items-start justify-start gap-4 md:gap-6">
          {/* Logo Box - Slightly Smaller */}
          <div className="shrink-0 w-24 h-24 min-[400px]:w-28 min-[400px]:h-28 md:w-40 md:h-40 bg-slate-900 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-slate-900/20 text-white transform hover:scale-105 transition-transform duration-300">
             {/* ICON */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 min-[400px]:h-24 min-[400px]:w-24 md:h-32 md:w-32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
               <line x1="19" y1="5" x2="5" y2="19"></line>
               <circle cx="7" cy="7" r="4.5"></circle>
               <circle cx="17" cy="17" r="4.5"></circle>
             </svg>
          </div>
          
          {/* Title Block - Height MATCHES Logo Box */}
          <div className="flex flex-col justify-between h-24 min-[400px]:h-28 md:h-40">
            {/* Title - Aligned to TOP */}
            <h1 
              className="text-7xl min-[400px]:text-6xl md:text-[8rem] lg:text-[9rem] font-black font-logo text-slate-900 tracking-tighter leading-[0.75] -ml-0.5 md:-ml-2"
            >
              FaizApp
            </h1>
            {/* Subtitle - Aligned to BOTTOM */}
            <p className="text-slate-500 font-bold text-md min-[400px]:text-sm md:text-3xl leading-none tracking-wide">
              Basit Finansal Hesap Fonksiyonları
            </p>
          </div>
        </header>

        {/* FUNCTION GRID SELECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {Object.entries(FORM_CONFIGS).map(([key, config]) => {
             const isSelected = selectedType === key;
             return (
               <button
                 key={key}
                 onClick={() => handleTypeChange(key)}
                 className={`
                   relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 group min-h-[110px]
                   ${isSelected 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/30 scale-105 z-10' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1'
                   }
                 `}
               >
                 <div className={`mb-2 p-2 rounded-xl transition-colors ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-50 text-indigo-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={config.icon} />
                    </svg>
                 </div>
                 <span className={`text-sm md:text-base font-bold uppercase tracking-wide text-center leading-tight min-h-[2.5em] flex items-center justify-center max-w-[120px] md:max-w-[140px] ${isSelected ? 'text-indigo-100' : 'text-slate-600'}`}>
                   {config.title}
                 </span>
                 
                 {isSelected && (
                   <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                 )}
               </button>
             );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Calculation Form Card */}
            <div className="flex-1 w-full bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-6 md:p-8 relative overflow-hidden">
                
                {/* Form Header */}
                <div className="mb-8 border-b border-slate-100 pb-5">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
                    {currentConfig.title}
                  </h2>
                  <p className="text-slate-500 text-base md:text-lg font-bold leading-snug opacity-80">
                    {currentConfig.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {currentConfig.inputs.map((field) => (
                    <InputGroup
                      key={field.key}
                      config={field}
                      value={inputs[field.key]}
                      onChange={handleInputChange}
                    />
                  ))}
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-600/30 transform transition-all active:scale-[0.98] hover:-translate-y-1 text-xl tracking-widest uppercase"
                >
                  HESAPLA
                </button>
            </div>

            {/* Result Card (LIGHT THEME) */}
            <div className={`w-full lg:w-96 transition-all duration-500 ease-out transform ${result !== null ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 lg:translate-y-0 lg:opacity-100 grayscale'}`}>
              <div className="bg-indigo-50 border-2 border-indigo-100 text-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden h-full min-h-[400px] flex flex-col justify-between group">
                
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl -mr-16 -mt-16 opacity-50"></div>
                
                <div className="w-full relative z-10">
                  <h3 className="text-slate-400 text-base font-black uppercase tracking-widest mb-8 border-b-2 border-slate-200 pb-4">
                    Hesaplama Özeti
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="block text-slate-500 text-base mb-1 font-bold">İşlem Türü</span>
                      <span className="text-2xl font-black text-indigo-900 leading-tight">
                        {currentConfig.title}
                      </span>
                    </div>

                    <div>
                      <span className="block text-slate-500 text-base mb-1 font-bold">{getResultLabel(selectedType)}</span>
                      {result !== null ? (
                        <span className="text-4xl md:text-5xl font-black tracking-tight text-indigo-700 drop-shadow-sm block break-words leading-tight">
                          {formatResult(result, selectedType)}
                        </span>
                      ) : (
                        <span className="text-5xl font-black text-slate-300">---</span>
                      )}
                    </div>

                    {/* Additional Result Logic */}
                    {(selectedType === CalculationType.SIMPLE_INTEREST || selectedType === CalculationType.COMPOUND_INTEREST || selectedType === CalculationType.DEPOSIT_RETURN) && result !== null && inputs.principal && (
                        <div className="pt-6 border-t-2 border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
                           <span className="block text-slate-500 text-base mb-1 font-bold">
                              {selectedType === CalculationType.DEPOSIT_RETURN ? 'Toplam Net Bakiye' : 'Toplam Brüt Değer'}
                           </span>
                           <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 block break-words">
                             {formatResult(inputs.principal + result, selectedType)}
                           </span>
                        </div>
                    )}

                    {selectedType === CalculationType.LOAN_PMT && result !== null && inputs.months && (
                        <div className="pt-6 border-t-2 border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
                           <span className="block text-slate-500 text-base mb-1 font-bold">Toplam Brüt Değer</span>
                           <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 block break-words">
                             {formatResult(result * inputs.months, selectedType)}
                           </span>
                        </div>
                    )}

                    {/* CHART INTEGRATION */}
                    {result !== null && (
                      <ResultChart type={selectedType} inputs={inputs} result={result} />
                    )}

                  </div>
                </div>
              </div>
            </div>

        </div>

        {/* Disclaimer & Footer Signature */}
        <div className="mt-20 flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-300">
           
           <p className="text-slate-400 text-sm md:text-base font-medium text-center whitespace-nowrap mx-auto">
             [Tüm fonksiyonlar valide edilmiştir. Resmi olarak kullanılamaz.]
           </p>

           <footer className="pb-8 text-center">
             <span className="inline-block py-3 px-10 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-default select-none">
               <span className="font-bold tracking-[0.2em] text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-indigo-600">
                 Z_Bilgin 2025
               </span>
             </span>
          </footer>
        </div>

      </div>
    </div>
  );
}

export default App;

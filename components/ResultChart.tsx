
import React from 'react';
import { CalculationType, InputValues } from '../types';

interface ResultChartProps {
  type: CalculationType;
  inputs: InputValues;
  result: number;
}

export const ResultChart: React.FC<ResultChartProps> = ({ type, inputs, result }) => {
  // Grafik verilerini hazırla
  const getData = () => {
    const principal = inputs.principal || inputs.cashFlow || inputs.nominalValue || 0;
    
    switch (type) {
      case CalculationType.SIMPLE_INTEREST:
      case CalculationType.COMPOUND_INTEREST:
      case CalculationType.DEPOSIT_RETURN:
        // Anapara vs Toplam (Faiz üstüne eklenmiş)
        const total = principal + result;
        return [
          { label: 'Anapara', value: principal, color: 'bg-slate-400' },
          { label: 'Faiz', value: result, color: 'bg-indigo-500' },
          { label: 'Toplam', value: total, color: 'bg-indigo-700' }
        ];

      case CalculationType.LOAN_PMT:
        // Kredi Tutarı vs Toplam Geri Ödeme
        const totalRepayment = result * (inputs.months || 0);
        const totalInterest = totalRepayment - principal;
        return [
          { label: 'Kredi', value: principal, color: 'bg-slate-400' },
          { label: 'Faiz', value: totalInterest, color: 'bg-rose-500' },
          { label: 'Toplam', value: totalRepayment, color: 'bg-slate-800' }
        ];

      case CalculationType.REAL_INTEREST:
         // Oran Karşılaştırması
         return [
           { label: 'Nominal', value: inputs.nominalRate || 0, color: 'bg-slate-400' },
           { label: 'Enflasyon', value: inputs.inflationRate || 0, color: 'bg-rose-500' },
           { label: 'Reel', value: result, color: 'bg-emerald-500' }
         ];

      case CalculationType.NPV:
      case CalculationType.INTERNAL_DISCOUNT:
      case CalculationType.EXTERNAL_DISCOUNT:
         // Gelecek Değer vs Bugünkü Değer
         return [
           { label: 'Gelecek', value: principal, color: 'bg-slate-400' },
           { label: 'Bugünkü', value: result, color: 'bg-indigo-600' }
         ];
         
      default:
        return [];
    }
  };

  const data = getData();
  if (data.length === 0) return null;

  // Ölçekleme için maksimum değeri bul
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="mt-8 pt-6 border-t-2 border-slate-200 w-full animate-in fade-in duration-700">
      <h4 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Grafiksel Gösterim</h4>
      <div className="flex items-end justify-between gap-4 h-40 md:h-48 w-full pb-2">
        {data.map((item, index) => {
          // Yüksekliği hesapla (min %15 görsellik için)
          const heightPercent = Math.max((item.value / maxValue) * 100, 15);
          
          return (
            <div key={index} className="flex flex-col items-center justify-end w-full group h-full">
              {/* Değer Label'ı (Her zaman görünür) */}
              <div className="mb-2 text-sm md:text-base font-black text-slate-700 bg-white/50 px-2 py-1 rounded-md shadow-sm border border-slate-100">
                 {new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(item.value)}
              </div>
              
              {/* Bar */}
              <div 
                className={`w-full max-w-[50px] md:max-w-[80px] rounded-t-xl transition-all duration-1000 ease-out relative overflow-hidden shadow-lg ${item.color}`}
                style={{ height: `${heightPercent}%` }}
              >
                 {/* Shine Effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              
              {/* Label */}
              <span className="mt-3 text-xs md:text-sm text-slate-500 font-bold text-center leading-tight uppercase tracking-tight">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { InputValues } from '../types';

export const calculateSimpleInterest = (vals: InputValues): number => {
  // Basit Faiz: AnaPara * (AylıkFaizOranı / 100) * Süre(Ay)
  return vals.principal * (vals.rate / 100) * vals.time;
};

export const calculateCompoundInterest = (vals: InputValues): number => {
  // Bileşik Faiz Değerleme:
  // AnaPara * (1 + AylıkOran/100)^Ay - AnaPara
  // Geriye sadece elde edilen FAİZ miktarını döndürür.
  const totalAmount = vals.principal * Math.pow(1 + vals.rate / 100, vals.time);
  return totalAmount - vals.principal;
};

export const calculateLoanPMT = (vals: InputValues): number => {
  // Kredi Taksit Hesaplama (PMT)
  // Input: Aylık Faiz Oranı (Örn: 2.89)
  const monthlyRate = vals.rate / 100;
  const n = vals.months; 
  
  if (monthlyRate === 0) return vals.principal / n;

  // Formül: (P * r * (1+r)^n) / ((1+r)^n - 1)
  const numerator = vals.principal * monthlyRate * Math.pow(1 + monthlyRate, n);
  const denominator = Math.pow(1 + monthlyRate, n) - 1;
  return numerator / denominator;
};

export const calculateRealInterest = (vals: InputValues): number => {
  // Reel Faiz: ((1 + Nominal) / (1 + Enflasyon)) - 1
  const nominal = 1 + vals.nominalRate / 100;
  const inflation = 1 + vals.inflationRate / 100;
  const real = (nominal / inflation) - 1;
  return real * 100; // Yüzde olarak döndür
};

export const calculateNPV = (vals: InputValues): number => {
  // NPV: NakitAkışı / (1 + İskonto)^Yıl
  return vals.cashFlow / Math.pow(1 + vals.discountRate / 100, vals.year);
};

export const calculateDepositReturn = (vals: InputValues): number => {
  // Mevduat Faiz Değerleme (Stopajlı)
  // Input: Aylık Faiz Oranı (Örn: 3.5)
  // Gün bazlı hesaplama için yıllık orana çeviriyoruz: Aylık * 12
  const yearlyRate = vals.rate * 12;

  // Formül: (AnaPara * YıllıkFaiz * Gün) / 36500
  const gross = (vals.principal * yearlyRate * vals.days) / 36500;
  
  // Net = Brüt * (1 - Stopaj/100)
  return gross * (1 - vals.taxRate / 100);
};

export const calculateInternalDiscount = (vals: InputValues): number => {
  // İç İskonto: (Nominal * 360) / (360 + (Faiz * Gün))
  const numerator = vals.nominalValue * 360;
  const denominator = 360 + (vals.rate * vals.days);
  return numerator / denominator;
};

export const calculateExternalDiscount = (vals: InputValues): number => {
  // Dış İskonto Peşin Değeri: Nominal * (1 - (Faiz * Gün)/360)
  const discountAmount = vals.nominalValue * (vals.rate * vals.days) / 360;
  return vals.nominalValue - discountAmount;
};

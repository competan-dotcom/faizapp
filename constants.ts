
import { CalculationType, FormulaConfig } from './types';

export const FORM_CONFIGS: Record<CalculationType, FormulaConfig> = {
  [CalculationType.SIMPLE_INTEREST]: {
    title: 'Basit Faiz Değerleme',
    description: 'Anaparanın vade sonundaki brüt faiz değerlemesini hesaplar.',
    icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', // Banknotes
    inputs: [
      { key: 'principal', label: 'Ana Para (TL)', placeholder: 'Örn: 100.000' },
      { key: 'rate', label: 'Aylık Faiz Oranı (%)', placeholder: 'Örn: 4,5' },
      { key: 'time', label: 'Süre (Ay)', placeholder: 'Örn: 12' },
    ],
  },
  [CalculationType.COMPOUND_INTEREST]: {
    title: 'Bileşik Faiz Değerleme',
    description: 'Aylık faiz ve vade üzerinden kümülatif faiz değerlemesini hesaplar.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', // Trending Up
    inputs: [
      { key: 'principal', label: 'Ana Para (TL)', placeholder: 'Örn: 50.000' },
      { key: 'rate', label: 'Aylık Faiz Oranı (%)', placeholder: 'Örn: 3,5' },
      { key: 'time', label: 'Süre (Ay)', placeholder: 'Örn: 12' },
    ],
  },
  [CalculationType.LOAN_PMT]: {
    title: 'Kredi Faiz Değerleme',
    description: 'Aylık eşit taksitli kredi tutar değerlemesini hesaplar. Başka kesintilerin olmadığını varsayar.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', // Building / Bank
    inputs: [
      { key: 'principal', label: 'Kredi Tutarı (TL)', placeholder: 'Örn: 250.000' },
      { key: 'rate', label: 'Aylık Faiz Oranı (%)', placeholder: 'Örn: 2,89' },
      { key: 'months', label: 'Vade (Ay)', placeholder: 'Örn: 36' },
    ],
  },
  [CalculationType.DEPOSIT_RETURN]: {
    title: 'Mevduat Faiz Değerleme',
    description: 'Yasal stopaj kesintileri sonrası net mevduat getirisi.',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', // Lock / Wallet
    inputs: [
      { key: 'principal', label: 'Ana Para (TL)', placeholder: 'Örn: 100.000' },
      { key: 'rate', label: 'Aylık Faiz Oranı (%)', placeholder: 'Örn: 3,5' },
      { key: 'days', label: 'Gün Sayısı', placeholder: 'Örn: 32' },
      { key: 'taxRate', label: 'Stopaj Oranı (%)', placeholder: 'Örn: 17,5' },
    ],
  },
  [CalculationType.NPV]: {
    title: 'Yatırım Değerleme (NPV)',
    description: 'Gelecekteki nakit akışlarının bugünkü değer (Net Present Value) hesabı.',
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', // Briefcase / Value
    inputs: [
      { key: 'cashFlow', label: 'Gelecekteki Nakit (TL)', placeholder: 'Örn: 100.000' },
      { key: 'discountRate', label: 'Yıllık İskonto Oranı (%)', placeholder: 'Örn: 30' },
      { key: 'year', label: 'Süre (Yıl)', placeholder: 'Örn: 3' },
    ],
  },
  [CalculationType.REAL_INTEREST]: {
    title: 'Reel Getiri Analizi',
    description: 'Enflasyon etkisinden arındırılmış gerçek (reel) kazanç oranı.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', // Chart Bar
    inputs: [
      { key: 'nominalRate', label: 'Nominal Faiz (%)', placeholder: 'Örn: 50' },
      { key: 'inflationRate', label: 'Yıllık Enflasyon Oranı (%)', placeholder: 'Örn: 32' },
    ],
  },
  [CalculationType.INTERNAL_DISCOUNT]: {
    title: 'İç İskonto (Peşin Değer)',
    description: 'Senedin iç iskonto yöntemiyle bugünkü peşin değeri.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', // Document
    inputs: [
      { key: 'nominalValue', label: 'Nominal Değer (TL)', placeholder: 'Örn: 50.000' },
      { key: 'rate', label: 'Yıllık Faiz Oranı (%)', placeholder: 'Örn: 30' },
      { key: 'days', label: 'Gün Sayısı', placeholder: 'Örn: 90' },
    ],
  },
  [CalculationType.EXTERNAL_DISCOUNT]: {
    title: 'Dış İskonto (Ticari)',
    description: 'Ticari işlemlerde kullanılan dış iskonto (kesinti) hesabı.',
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', // Tag / Discount
    inputs: [
      { key: 'nominalValue', label: 'Nominal Değer (TL)', placeholder: 'Örn: 50.000' },
      { key: 'rate', label: 'Yıllık Faiz Oranı (%)', placeholder: 'Örn: 30' },
      { key: 'days', label: 'Gün Sayısı', placeholder: 'Örn: 180' },
    ],
  },
};

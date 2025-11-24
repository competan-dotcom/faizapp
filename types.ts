export enum CalculationType {
  SIMPLE_INTEREST = 'SIMPLE_INTEREST',
  COMPOUND_INTEREST = 'COMPOUND_INTEREST',
  LOAN_PMT = 'LOAN_PMT',
  REAL_INTEREST = 'REAL_INTEREST',
  NPV = 'NPV',
  DEPOSIT_RETURN = 'DEPOSIT_RETURN',
  INTERNAL_DISCOUNT = 'INTERNAL_DISCOUNT',
  EXTERNAL_DISCOUNT = 'EXTERNAL_DISCOUNT',
}

export interface InputFieldConfig {
  key: string;
  label: string;
  placeholder?: string;
  step?: string;
}

export interface FormulaConfig {
  title: string;
  description: string;
  icon: string; // SVG path data
  inputs: InputFieldConfig[];
}

export type InputValues = Record<string, number>;
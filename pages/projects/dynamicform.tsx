import { DynamicFormPage } from 'components/DynamicFormPage';
import { InputHTMLAttributes } from 'react';

export interface SelectInputValue {
  value: string,
  label: string,
  selected?: boolean
}
export interface ChartFieldData {
  fieldName: string,
  fieldTitle: string,
  type: 'multi' | 'single' | 'text' | 'number'
}

export interface SelectInputData extends ChartFieldData {
  type: 'multi' | 'single',
  values: SelectInputValue[],
  isCreatable?: boolean
}

export type StandardInputData = ChartFieldData & InputHTMLAttributes<HTMLInputElement>
export type InputType = SelectInputData | ChartFieldData | StandardInputData

export interface ChartFormData {
  sectionTitle: string,
  sectionName: string,
  order: number,
  fields: Array<InputType>
}


export default function Dynamicform(): JSX.Element {
  return <DynamicFormPage />;
}


import type { StripDelimitersProps, GetFormattedValueProps } from './types';
import { getUnformattedValue } from '../general';

export const isDigitChar = (char: string): boolean => /\d/.test(char);

export const isAlphaChar = (char: string): boolean => /[a-zA-Z]/.test(char);

export const getDelimiterRegexByDelimiter = (delimiter: string): RegExp =>
  new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');

export const stripDelimiters = ({
  value,
  delimiter,
}: StripDelimitersProps): string => {
  value = value.replace(getDelimiterRegexByDelimiter(delimiter), '');
  return value;
};

export const getFormattedValue = ({
  value,
  mask,
  delimiter,
}: GetFormattedValueProps): { result: string; unformatted: string } => {
  let result = '';
  let valueIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (valueIndex >= value.length) break;

    const maskChar = mask[i];
    const valueChar = value[valueIndex];

    // Handle digit mask characters ('9' or '0')
    if (maskChar === '9' || maskChar === '0') {
      if (!isDigitChar(valueChar)) break;
      result += valueChar;
      valueIndex++;
      continue;
    }

    // Handle alpha mask characters ('A')
    if (maskChar === 'A') {
      if (!isAlphaChar(valueChar)) break;
      result += valueChar;
      valueIndex++;
      continue;
    }

    // Handle delimiters and other static characters
    result += maskChar;
    if (valueChar === maskChar) {
      valueIndex++;
    }
  }

  return { result, unformatted: getUnformattedValue(result, { delimiter }) };
};

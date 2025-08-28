import { getFormattedValue, stripDelimiters } from '../common/utils';
import type { FormatInputValueOptions } from './types';

export const formatInputValue = (
  value: string,
  options: FormatInputValueOptions,
): { result: string; unformatted: string } => {
  const { mask, delimiter } = options;

  //remove delimiters from the input value before formatting
  value = stripDelimiters({ value, delimiter });

  // apply formatting
  return getFormattedValue({
    value,
    mask,
    delimiter,
  });
};

export const getUnformattedValue = (
  value: string,
  options: Pick<FormatInputValueOptions, 'delimiter'>,
): string => {
  const { delimiter = '' } = options;
  return stripDelimiters({ value, delimiter });
};

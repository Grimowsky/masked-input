export type DelimiterType = string;

export interface StripDelimitersProps {
  value: string;
  delimiter: DelimiterType;
}

export interface GetFormattedValueProps {
  value: string;
  mask: string;
  delimiter: string;
}

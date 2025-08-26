import {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  InputHTMLAttributes,
} from 'react';
import styles from './inputMask.module.css';

// User defined Values
const maskedNumber = '_#dDmMyY9';
const maskedLetter = 'A';

const strippedValue = (isCharsetPresent: boolean, value: string) =>
  isCharsetPresent ? value.replace(/\W/g, '') : value.replace(/\D/g, '');

const isInteger = (value: string) => !Number.isNaN(parseInt(value, 10));

const isLetter = (value: string) => (value ? value.match(/[A-Z]/i) : false);

const handleCurrentValue = (
  value: string,
  placeholder: string,
  isCharsetPresent: boolean,
) => {
  const len = placeholder.length;
  let newValue = '';
  let i;
  let charIndex;

  const strippedVal = strippedValue(isCharsetPresent, value);

  for (i = 0, charIndex = 0; i < len; i += 1) {
    const isInt = isInteger(strippedVal[charIndex]);
    const isLet = isLetter(strippedVal[charIndex]);
    const matchesNumber = maskedNumber.indexOf(placeholder[i]) >= 0;
    const matchesLetter = maskedLetter.indexOf(placeholder[i]) >= 0;

    if (
      (matchesNumber && isInt) ||
      (isCharsetPresent && matchesLetter && isLet)
    ) {
      newValue += strippedVal[charIndex];
      charIndex += 1;
    } else if (
      (!isCharsetPresent && !isInt && matchesNumber) ||
      (isCharsetPresent &&
        ((matchesLetter && !isLet) || (matchesNumber && !isInt)))
    ) {
      return newValue;
    } else {
      newValue += placeholder[i];
    }
    if (strippedVal[charIndex] === undefined) {
      break;
    }
  }

  return newValue;
};

const setValueOfMask = (value: string, placeholder: string) => {
  const placeholderVal = `${placeholder.substr(value.length)}`;
  return [value, placeholderVal];
};

interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  charset?: string;
  value?: string;
}

export default function InputMask({
  id,
  placeholder,
  charset,
  value: propValue = '',
  onChange,
  ...rest
}: InputMaskProps) {
  const [value, setValue] = useState<string>(propValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const isCharsetPresent = !!charset;

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = handleCurrentValue(
      e.target.value,
      placeholder,
      isCharsetPresent,
    );
    setValue(newValue);
    if (onChange) onChange(e);
  };

  const [maskValue, maskPlaceholder] = setValueOfMask(value, placeholder);

  return (
    <span className={styles.usaInputMask} data-mask={placeholder}>
      <span className={styles.usaInputMaskContent} aria-hidden="true">
        <i>{maskValue}</i>
        {maskPlaceholder}
      </span>
      <input
        {...rest}
        ref={inputRef}
        id={id}
        className={styles.usaMasked}
        maxLength={placeholder.length}
        data-placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
    </span>
  );
}

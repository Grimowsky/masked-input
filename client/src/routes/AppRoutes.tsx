import React, { Dispatch, SetStateAction, useState } from 'react';
import { routes } from './routes.schema';
import { Route, Routes } from 'react-router-dom';
import { formatInputValue } from '../input-formatter/general';
import { FormatInputValueOptions } from '../input-formatter/general/types.ts';
import { createStatelessContext } from '../createStatelessContext.tsx';

type MaskRootProps = {
  formatterOpts: FormatInputValueOptions;
  inputProps?: React.ComponentProps<'input'>;
};

type InputProps = React.ComponentProps<'input'>;

const [useInputMaskContext, InputMaskContextProvider] = createStatelessContext<
  MaskRootProps & {
    formattedValue: string;
    setFormattedValue: Dispatch<SetStateAction<string>>;
  }
>();

function MaskRoot(props: React.PropsWithChildren<MaskRootProps>) {
  const [formattedValue, setFormattedValue] = useState('');
  return (
    <InputMaskContextProvider
      value={{ ...props, formattedValue, setFormattedValue }}
    >
      {props.children}
    </InputMaskContextProvider>
  );
}

function FormatControl(props: React.PropsWithChildren<{}>) {
  const { formatterOpts, inputProps, setFormattedValue } =
    useInputMaskContext();
  const { children } = props;

  const val = inputProps?.defaultValue || inputProps?.value || '';

  const [value, setValue] = useState(
    formatInputValue(val.toString(), formatterOpts).result,
  );

  const extendedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === 'input') {
      return React.cloneElement(child, {
        ...inputProps,
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const { result } = formatInputValue(e.target.value, formatterOpts);
          setValue(result);
          setFormattedValue(result);
        },
      } as InputProps);
    }
    return child;
  });

  return extendedChildren;
}

function MaskShell(p: React.PropsWithChildren<{}>) {
  const { formattedValue, formatterOpts } = useInputMaskContext();
  const { mask } = formatterOpts;
  const { children } = p;

  const placeHoolder =
    formattedValue + mask.substring(formattedValue.length).replace(/0/g, '_');

  return (
    <span style={{ position: 'relative' }}>
      <span
        style={{
          position: 'absolute',
          top: -4,
          left: 8,
          fontSize: '18px',
        }}
      >
        {placeHoolder}
      </span>
      {children}
    </span>
  );
}

export const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route
        path={routes.BASE_ROUTE}
        element={
          <div style={{ padding: '48px' }}>
            <h1>Input Formatter Demo</h1>
            <MaskRoot
              formatterOpts={{
                mask: '000-000-000',
                delimiter: '-',
              }}
            >
              <MaskShell>
                <FormatControl>
                  <input
                    style={{
                      fontSize: '18px',
                      padding: '8px',
                      width: '200px',
                      color: 'transparent',
                    }}
                  />
                </FormatControl>
              </MaskShell>
            </MaskRoot>
          </div>
        }
      />
    </Routes>
  );
};

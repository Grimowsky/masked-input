import React, { useId, useState } from 'react';
import { routes } from './routes.schema';
import { Route, Routes } from 'react-router-dom';
import { useIMask } from 'react-imask';
import {
  MaskContent,
  MaskShell,
} from '../components/shell-mask/mask-shell.tsx';

const MASK = '000-000-000';

function MaskedInput(props: React.ComponentProps<'input'>) {
  const [opts] = useState({
    mask: MASK,
    lazy: false,
    placeholderChar: '_',
    defaultValue: props.defaultValue || '',
  });
  const { ref, maskRef } = useIMask(opts, {
    onAccept: (_val: string, { unmaskedValue }) => {
      props.onChange?.({ target: { value: unmaskedValue } } as any);
    },
  });

  function getCurrentValue() {
    if (!ref || !ref.current) return '';
    if (props.defaultValue) return props.defaultValue;

    return ref.current.value.split('_')[0];
  }

  const val = getCurrentValue();

  console.log('@@@', maskRef.current);

  return (
    <MaskShell>
      <MaskContent maskPlaceholder={maskRef?.current?.value} />
      <input
        {...props}
        ref={ref as React.Ref<HTMLInputElement>}
        style={{
          fontSize: '24px',
          padding: '8px 16px',
          width: '200px',
          fontFamily: 'Roboto, sans-serif',
        }}
        aria-hidden={val.length === 0}
        value={getCurrentValue()}
      />
    </MaskShell>
  );
}

export const AppRoutes = (): React.ReactElement => {
  const [value, setValue] = useState('');

  return (
    <Routes>
      <Route
        path={routes.BASE_ROUTE}
        element={
          <div style={{ padding: '48px' }}>
            <MaskedInput onChange={(v) => setValue(v.target.value)} />
          </div>
        }
      />
    </Routes>
  );
};

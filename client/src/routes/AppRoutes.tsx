import React, { useState } from 'react';
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
    defaultValue: props.defaultValue,
  });
  const { ref, maskRef, typedValue } = useIMask(opts, {
    onAccept: (_val: string, { unmaskedValue }) => {
      props.onChange?.({ target: { value: unmaskedValue } } as any);
    },
  });

  React.useEffect(() => {
    if (ref.current) {
      let refVal = ref.current.value;
      ref.current.value = refVal.split('_')[0];
    }
  }, [ref?.current?.value]);

  console.log('render', typedValue);

  const preventMaskRead = !(typedValue && typedValue.length > 0);

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
      />
    </MaskShell>
  );
}

export const AppRoutes = (): React.ReactElement => {
  const [value, setValue] = useState('1234');

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

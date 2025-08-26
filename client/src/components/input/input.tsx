import React from 'react';
import { MaskContent, MaskShell } from '../shell-mask/mask-shell.tsx';
import { useIMask } from 'react-imask';

type MaskedInputProps = React.ComponentProps<'input'>;

function MaskedInput(p: MaskedInputProps) {
  const [opts, setOpts] = React.useState({
    mask: 'aaa 000000',
  });

  const { ref, value, unmaskedValue } = useIMask(
    opts /* optional {
    onAccept,
    onComplete,
    ref,
    defaultValue,
    defaultUnmaskedValue,
    defaultTypedValue,
  } */,
  );

  console.log('@@@ value, unmaskedValue', value, unmaskedValue);

  return (
    <MaskShell>
      <MaskContent maskPlaceholder={'aaa 000000'} />
      <input {...p} ref={ref} />
    </MaskShell>
  );
}

export { MaskedInput };

import React from 'react';
import styles from './mask-shell.module.css';

type ShellProps = React.ComponentProps<'span'>;
type MaskContentProps = React.ComponentProps<'span'> & {
  maskPlaceholder: string;
};

function MaskShell(p: ShellProps) {
  return <span className={styles.inputMask}>{p.children}</span>;
}

function MaskContent(p: MaskContentProps) {
  const { maskPlaceholder } = p;
  return (
    <span className={styles.inputMaskContent} aria-hidden="true">
      {maskPlaceholder}
    </span>
  );
}

export { MaskShell, MaskContent };

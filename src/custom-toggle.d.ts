declare module 'custom-toggle' {
    import { ReactNode } from 'react';
  
    export interface ToggleButtonProps {
      autoFocus?: boolean;
      checked?: boolean;
      checkedChildren?: ReactNode;
      defaultChecked?: boolean;
      disabled?: boolean;
      loading?: boolean;
      size?: 'small' | 'default' | 'large';
      unCheckedChildren?: ReactNode;
      onChange?: (checked: boolean) => void;
      onClick?: () => void;
      value: boolean;
      title: string;
      backgroundColor?: string;
    }
  
    export default function ToggleButton(props: ToggleButtonProps): JSX.Element;
  }
  
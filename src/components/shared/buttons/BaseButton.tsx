import { ReactNode, MouseEventHandler } from 'react';

import { Button } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

interface IBaseButtonProps {
  onClick: MouseEventHandler<HTMLElement>;
  className?: string;
  id?: string;
  type?: 'link' | 'text' | 'ghost' | 'primary' | 'default' | 'dashed';
  shape?: 'default' | 'circle' | 'round';
  icon?: ReactNode;
  size?: SizeType;
  disabled?: boolean;
}

const BaseButton: React.FC<IBaseButtonProps> = ({
  className,
  id,
  icon,
  onClick,
  children,
  type = 'default',
  shape = 'round',
  size = 'large',
  disabled = false,
}) => {
  return (
    <Button
      type={type}
      shape={shape}
      className={className}
      id={id}
      icon={icon}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default BaseButton;

import { ComponentProps } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  href: string;
} & Omit<ComponentProps<typeof NavLink>, 'to'>;

export const Link: React.FC<Props> = ({ children, href, ...rest }) => {
  return (
    <NavLink to={href} {...rest}>
      {children}
    </NavLink>
  );
};

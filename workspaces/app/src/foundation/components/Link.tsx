import { NavLink } from 'react-router-dom';
type Props = {
  children: React.ReactNode;
  href: string;
};

export const Link: React.FC<Props> = ({ children, href, ...rest }) => {
  return (
    <NavLink to={href} {...rest}>
      {children}
    </NavLink>
  );
};

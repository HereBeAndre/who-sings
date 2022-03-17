import { ReactNode } from 'react';

import './Page.scss';

interface IPageProps {
  children: ReactNode;
}

const Page: React.FC<IPageProps> = ({ children, ...rest }) => (
  <div id="page" {...rest}>
    {children}
  </div>
);

export default Page;

import { ReactNode } from 'react';
import { List } from 'antd';

import './CustomList.scss';

interface ICustomListProps {
  dataSource: unknown[];
  header: ReactNode;
  className?: string;
  renderItem: ((item: any, index: number) => ReactNode) | undefined;
}

const CustomList: React.FC<ICustomListProps> = ({ dataSource, header, className, renderItem }) => {
  return (
    <List
      size="default"
      header={header}
      bordered
      className={`custom-list ${className}`}
      dataSource={dataSource}
      renderItem={renderItem}
    />
  );
};

export default CustomList;

import { ReactNode } from 'react';
import { List } from 'antd';

interface ICustomListProps {
  // TODO Fix any
  dataSource: any;
  header: ReactNode;
  className?: string;
  renderItem: ((item: any, index: number) => ReactNode) | undefined;
}

const CustomList: React.FC<ICustomListProps> = ({ dataSource, header, className, renderItem }) => {
  return (
    <List
      size="large"
      header={header}
      bordered
      className={className}
      dataSource={dataSource}
      renderItem={renderItem}
    />
  );
};

export default CustomList;

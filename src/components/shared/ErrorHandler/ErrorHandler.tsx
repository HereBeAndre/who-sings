import { Empty } from 'antd';

interface IErrorHandler {
  error: string;
}

// USAGE ~ Component returns an empty div if any error was passed as props
const ErrorHandler: React.FC<IErrorHandler> = ({ error }) => {
  return error ? (
    <div>
      <Empty />
    </div>
  ) : null;
};

export default ErrorHandler;

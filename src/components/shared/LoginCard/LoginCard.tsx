import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './LoginCard.scss';

export type TUserFormData = {
  username: string;
};

interface ILoginCardProps {
  onFinish: (user: TUserFormData) => void;
}

const LoginCard: React.FC<ILoginCardProps> = ({ onFinish }) => {
  return (
    <Form name="user-login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Play!
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginCard;

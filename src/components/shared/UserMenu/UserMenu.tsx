import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import {
  LogoutOutlined,
  RadarChartOutlined,
  RocketOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { AppRoutes } from 'components/routes/urls';
import { stringifyAndSetToStorage } from 'utils/functions';

interface IUserMenuProps {
  username: string;
}

const UserMenu: React.FC<IUserMenuProps> = ({ username }) => {
  const navigate = useNavigate();

  const onPlayClick = () => navigate(AppRoutes.QUIZ);
  const onMyGamesClick = () => console.log('Go to MY GAMES');
  const onHOFClick = () => navigate(AppRoutes.WALL_OF_FAME);
  const onLogoutClick = () => {
    stringifyAndSetToStorage('username', '');
    stringifyAndSetToStorage('score', 0);
    // TODO Handle highScore too?
    navigate(AppRoutes.QUIZ);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<RocketOutlined />} onClick={onPlayClick}>
        Play
      </Menu.Item>
      <Menu.Item key="2" icon={<RadarChartOutlined />} onClick={onMyGamesClick}>
        My Games
      </Menu.Item>
      <Menu.Item key="3" icon={<TrophyOutlined />} onClick={onHOFClick}>
        Hall Of Fame
      </Menu.Item>
      <Menu.Item key="4" icon={<LogoutOutlined />} onClick={onLogoutClick}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>
        <UserOutlined /> {username}
      </Button>
    </Dropdown>
  );
};

export default UserMenu;
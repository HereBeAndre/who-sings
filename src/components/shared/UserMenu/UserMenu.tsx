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
import { getFromStorageAndParse, stringifyAndSetToStorage } from 'utils/functions';

interface IUserMenuProps {
  username: string;
}

const UserMenu: React.FC<IUserMenuProps> = ({ username }) => {
  const navigate = useNavigate();

  const onNewGameClick = () => {
    stringifyAndSetToStorage('score', 0, 'sessionStorage');
    navigate(AppRoutes.QUIZ);
  };
  const onMyGamesClick = () => navigate(AppRoutes.MY_GAMES);
  const onHOFClick = () => navigate(AppRoutes.WALL_OF_FAME);

  const onLogoutClick = () => {
    const lastGames = getFromStorageAndParse('lastGames', 'sessionStorage');
    stringifyAndSetToStorage('username', '', 'sessionStorage');
    stringifyAndSetToStorage('lastGames', [], 'sessionStorage');
    stringifyAndSetToStorage('score', 0, 'sessionStorage');

    // ? TODO pass lastGames directly?
    const updatedUserRecord = { lastGames };
    stringifyAndSetToStorage(username, updatedUserRecord);
    navigate(AppRoutes.QUIZ);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<RocketOutlined />} onClick={onNewGameClick}>
        New Game
      </Menu.Item>
      <Menu.Item key="2" icon={<RadarChartOutlined />} onClick={onMyGamesClick}>
        My Games
      </Menu.Item>
      <Menu.Item key="3" icon={<TrophyOutlined />} onClick={onHOFClick}>
        Wall Of Fame
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

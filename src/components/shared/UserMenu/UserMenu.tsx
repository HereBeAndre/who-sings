import { Button, Dropdown, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DownOutlined,
  LogoutOutlined,
  RadarChartOutlined,
  RocketOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { AppRoutes } from 'components/routes/urls';
import { getFromStorageAndParse, stringifyAndSetToStorage } from 'utils/functions';

import './UserMenu.scss';

interface IUserMenuProps {
  username: string;
}

const UserMenu: React.FC<IUserMenuProps> = ({ username }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onNewGameClick = () => {
    stringifyAndSetToStorage('score', 0, 'sessionStorage');
    navigate(AppRoutes.QUIZ);
  };
  const onMyGamesClick = () => navigate(AppRoutes.MY_GAMES);
  const onWOFClick = () => navigate(AppRoutes.WALL_OF_FAME);

  const onLogoutClick = () => {
    const lastGames = getFromStorageAndParse('lastGames', 'sessionStorage');
    stringifyAndSetToStorage('username', '', 'sessionStorage');
    stringifyAndSetToStorage('lastGames', [], 'sessionStorage');
    stringifyAndSetToStorage('score', 0, 'sessionStorage');
    stringifyAndSetToStorage(username, { lastGames });
    navigate(AppRoutes.QUIZ);
  };

  const menu = [
    <Menu.Item key={AppRoutes.QUIZ} icon={<RocketOutlined />} onClick={onNewGameClick}>
      New Game
    </Menu.Item>,
    <Menu.Item key={AppRoutes.MY_GAMES} icon={<RadarChartOutlined />} onClick={onMyGamesClick}>
      My Games
    </Menu.Item>,
    <Menu.Item key={AppRoutes.WALL_OF_FAME} icon={<TrophyOutlined />} onClick={onWOFClick}>
      Wall Of Fame
    </Menu.Item>,
    <Menu.Item key="4" icon={<LogoutOutlined />} onClick={onLogoutClick}>
      Logout
    </Menu.Item>,
  ];

  const filterMenu = (menuArray: JSX.Element[] = menu, pathname: string = location.pathname) =>
    menuArray.filter((menuItem) => menuItem.key !== pathname);

  return (
    <Dropdown overlay={<Menu>{filterMenu()}</Menu>} trigger={['click']}>
      <Button className="user-menu-button" size="large">
        <UserOutlined /> {username} <DownOutlined id="user-menu-caret" />
      </Button>
    </Dropdown>
  );
};

export default UserMenu;

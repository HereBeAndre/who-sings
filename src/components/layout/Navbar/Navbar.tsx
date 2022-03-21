import { AppRoutes } from 'components/routes/urls';
import UserMenu from 'components/shared/UserMenu/UserMenu';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromStorageAndParse } from 'utils/functions';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const currentUsername: string = getFromStorageAndParse('username', 'sessionStorage')!;

  useEffect(() => {
    !currentUsername && navigate(AppRoutes.LOGIN);
    setUsername(currentUsername);
  }, [currentUsername]);

  return (
    <div id="navbar">
      <div>Who Sings</div>
      <div>{username ? <UserMenu username={username} /> : null}</div>
    </div>
  );
};

export default Navbar;

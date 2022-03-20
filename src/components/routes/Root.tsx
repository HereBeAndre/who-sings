import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from 'components/pages/LoginPage/LoginPage';
import QuizPage from 'components/pages/QuizPage/QuizPage';
import MyGamesPage from 'components/pages/MyGamesPage/MyGamesPage';
import { MemoizedWOFPage as WallOfFamePage } from 'components/pages/WallOfFamePage/WallOfFamePage';

import { AppRoutes } from 'components/routes/urls';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.QUIZ} element={<QuizPage />} />
        <Route path={AppRoutes.MY_GAMES} element={<MyGamesPage />} />
        <Route path={AppRoutes.WALL_OF_FAME} element={<WallOfFamePage />} />
        <Route path="*" element={<Navigate to={AppRoutes.QUIZ} />} />
      </Routes>
    </Router>
  );
};

export default Root;

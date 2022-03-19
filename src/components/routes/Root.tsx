import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import QuizPage from 'components/pages/QuizPage/QuizPage';
import LoginPage from 'components/pages/LoginPage/LoginPage';
import { AppRoutes } from 'components/routes/urls';
import WallOfFamePage from 'components/pages/WallOfFamePage/WallOfFamePage';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.QUIZ} element={<QuizPage />} />
        <Route path={AppRoutes.WALL_OF_FAME} element={<WallOfFamePage />} />
        <Route path="*" element={<Navigate to={AppRoutes.QUIZ} />} />
      </Routes>
    </Router>
  );
};

export default Root;

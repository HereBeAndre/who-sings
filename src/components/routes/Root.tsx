import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import QuizPage from 'components/pages/QuizPage/QuizPage';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="*" element={<Navigate to="/quiz" />} />
      </Routes>
    </Router>
  );
};

export default Root;

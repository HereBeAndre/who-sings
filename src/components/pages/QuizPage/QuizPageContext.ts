import { createContext } from 'react';

// set the defaults
const QuizPageContext = createContext({
  card: 0,
  setCard: (current: number) => {},
});

export default QuizPageContext;

import { createContext } from 'react';

// set the defaults
const QuizPageContext = createContext({
  cardNumber: 0,
  setCardNumber: (currentCard: number) => {},
});

export default QuizPageContext;

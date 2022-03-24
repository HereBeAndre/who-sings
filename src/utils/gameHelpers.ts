import { NavigateFunction } from 'react-router-dom';

import { AppRoutes } from 'components/routes/urls';

import { getFromStorageAndParse, stringifyAndSetToStorage } from './functions';
import { CORRECT_ANSWER_POINTS } from './constants';

// USAGE ~ Increase user's game score on each correct answer
export const handleCorrectAnswer = () => {
  const currentScore = getFromStorageAndParse('score', 'sessionStorage');
  const updatedScore = Number(currentScore) + CORRECT_ANSWER_POINTS;
  stringifyAndSetToStorage('score', updatedScore, 'sessionStorage');
};

/* USAGE ~ When questions are over, updates current player's array of scores in Session Storage.
It also update current player's record object in Local Storage. */
export const handleGameOver = (callback: NavigateFunction, action: string = AppRoutes.MY_GAMES) => {
  const username = getFromStorageAndParse('username', 'sessionStorage');
  const score = getFromStorageAndParse('score', 'sessionStorage');
  const userLastGames = getFromStorageAndParse('lastGames', 'sessionStorage');

  // We need to update current player's last games list
  const updatedUserGames = [...userLastGames, score];
  stringifyAndSetToStorage('lastGames', updatedUserGames, 'sessionStorage');

  // We need to update current player's record object in Local Storage
  const updatedUserRecord = { lastGames: updatedUserGames };
  stringifyAndSetToStorage(username, updatedUserRecord);

  /* For now we're going to pass useNavigate hook as callback to programmatically redirect user 
  to a specific page */
  callback(action);
};

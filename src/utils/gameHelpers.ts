import { NavigateFunction } from 'react-router-dom';

import { AppRoutes } from 'components/routes/urls';
import { TUserFormData } from 'components/shared/cards/LoginCard/LoginCard';

import { getFromStorageAndParse, stringifyAndSetToStorage } from './functions';
import { CORRECT_ANSWER_POINTS } from './constants';

export const initializeGame = (
  user: TUserFormData,
  callback: NavigateFunction,
  action: string = AppRoutes.QUIZ,
) => {
  const { username } = user;
  const userLastGames = getFromStorageAndParse(username);
  stringifyAndSetToStorage('username', username, 'sessionStorage');
  stringifyAndSetToStorage('score', 0, 'sessionStorage');
  if (userLastGames?.lastGames?.length) {
    stringifyAndSetToStorage('lastGames', userLastGames?.lastGames, 'sessionStorage');
  } else {
    stringifyAndSetToStorage('lastGames', [], 'sessionStorage');
  }

  callback(action);
};

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

// USAGE ~ Set countdown text classname based on time remaining
export const handleCountdownColor = (countdown: number): string => {
  if (countdown <= 4) return 'red';
  if (countdown > 4 && countdown <= 7) return 'orange';
  return 'green';
};

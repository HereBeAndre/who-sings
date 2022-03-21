import { ReducerAction } from 'react';

export interface TGenericAction<T extends ReducerAction<any>> {
  type: string;
  payload: T;
}

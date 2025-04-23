/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import type { Dispatch } from 'react';
import React, { Context, ReactNode } from 'react';
import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
  Provider,
  TypedUseSelectorHook,
} from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { AnyAction, Store } from 'redux';
import type { RootState as ReduxRootState } from './types';


export type RootState = ReduxRootState;

export const useStore = createStoreHook<RootState>();
export const useSelector: TypedUseSelectorHook<RootState> = createSelectorHook();
export const useDispatch = createDispatchHook() as () => ThunkDispatch<RootState, unknown, AnyAction>;

interface ReduxProviderProps {
  store: Store<RootState, AnyAction>;
  children: React.ReactNode;
}

export const ReduxProvider = ({
  store,
  children,
}: ReduxProviderProps) => <Provider store={store}>{children}</Provider>;


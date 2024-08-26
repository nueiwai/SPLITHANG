import {create} from 'zustand';
import createAuthState from './state/authState';

export const useAppState = create()((...args) => createAuthState(...args));
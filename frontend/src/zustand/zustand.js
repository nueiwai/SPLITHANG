import {create} from 'zustand';
import {createAuthState} from './state/authState';
import {createChatState} from './state/chatState';

export const useAppState = create()((...args) => ({
  ...createAuthState(...args), 
  ...createChatState(...args)}));

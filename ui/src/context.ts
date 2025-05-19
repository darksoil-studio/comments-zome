import { createContext } from '@lit/context';
import { CommentsStore } from './comments-store.js';

export const commentsStoreContext = createContext<CommentsStore>(
  'comments/store'
);


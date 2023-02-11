import { createContext } from 'react';

/**
 * @type {React.Context<{
 *  isLoading: boolean;
 *  user: {
 *      id: string;
 *      username: string;
 *      email: string;
 *      about_me?: string;
 *      avatar?: string;
 *      created_at: Date;
 *      updated_at: Date;
 *      deleted_at?: Date;
 *  } | null
 * }>}
 */
const UserContext = createContext({
  isLoading: false,
  user: null,
});

export default UserContext;

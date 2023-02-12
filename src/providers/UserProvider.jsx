import { useMemo } from 'react';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const UserProvider = ({ children }) => {
  const supabaseClient = useSupabaseClient();
  const { isLoading, session } = useSessionContext();

  const { data: user, isLoading: isUserLoading } = useQuery(
    'user',
    async () => {
      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', session?.user?.id)
        .single();

      if (error) {
        throw error;
      }

      data.avatar = supabaseClient.storage
        .from('avatar-image-bucket')
        .getPublicUrl(data.avatar || 'default-profile-picture').data.publicUrl;

      return data;
    },
    {
      enabled: !isLoading && !!session?.user,
    }
  );

  const value = useMemo(
    () => ({
      isLoading: isLoading || isUserLoading,
      user,
    }),
    [session, user, isLoading, isUserLoading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = propTypes;

export default UserProvider;

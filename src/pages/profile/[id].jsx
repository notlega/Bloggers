import { useContext, useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import UserContext from '../../contexts/UserContext';

const getServerSideProps = async (context) => {
  const { id } = context.params;
  const supabaseClient = createServerSupabaseClient(context);

  const { data, error } = await supabaseClient.from('users').select('*').eq('id', id).single();

  if (error) {
    return {
      notFound: true,
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  data.avatar = supabaseClient.storage
    .from('avatar-image-bucket')
    .getPublicUrl(data.avatar || 'default-profile-picture').data.publicUrl;

  console.log(data);

  return {
    props: {
      profileUser: { ...data },
    },
  };
};

const propTypes = {
  profileUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    about_me: PropTypes.string,
    avatar: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    deleted_at: PropTypes.string,
  }),
};

/**
 * Profile page that takes in a userid and displays the user's profile
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Profile = ({ profileUser }) => {
  const { isLoading: isUserLoading, user: publicUser } = useContext(UserContext);

  return (
    !isUserLoading && (
      <div className="mx-auto max-w-xl mt-6 px-5 space-y-8">
        <div className="flex flex-row items-center space-x-10">
          <picture className="avatar w-[24%]">
            <img src={profileUser.avatar} alt={profileUser.username} className="rounded-full" />
          </picture>
          <div>
            <h2 className="text-2xl mb-1 md:mb-2">{profileUser.username}</h2>
            <span>{profileUser.about_me}</span>
          </div>
        </div>
        {publicUser != null && publicUser.id === profileUser.id && <button className="btn w-full">Edit Profile</button>}
      </div>
    )
  );
};

Profile.propTypes = propTypes;

export { getServerSideProps };
export default Profile;

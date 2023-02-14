import { useRouter } from 'next/router';
import Link from 'next/link';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import PropTypes from 'prop-types';

const getServerSideProps = async (context) => {
  const { id } = context.query;
  const supabaseClient = createServerSupabaseClient(context);

  const { data: blog, error } = await supabaseClient.rpc('get_blog_by_id', {
    blog_id: parseInt(id, 10),
  });

  if (error || !blog) {
    return {
      notFound: true,
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // eslint-disable-next-line no-param-reassign
  blog[0].avatar = supabaseClient.storage
    .from('avatar-image-bucket')
    .getPublicUrl(blog[0].avatar || 'default-profile-picture').data.publicUrl;

  console.log(blog[0]);

  return {
    props: {
      blog: blog[0],
    },
  };
};

const propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    blog: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    user_id: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

/**
 * Blog page that displays a single blog post
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Blog = ({ blog }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center space-y-12 my-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-2">{blog.name}</h1>
        <span>{blog.description}</span>
      </div>
      <div className="space-y-4">
        <div>
          <Link href={`/profile/${blog.user_id}`} className="space-x-2 mr-2">
            <picture className="avatar w-[10%] md:w-[5%] lg:w-[4%]">
              <img src={blog.avatar} alt={blog.username} className="rounded-full" />
            </picture>
            <span className="font-semibold">{blog.username}</span>
          </Link>
          <span className="mr-2">&#8226;</span>
          <span>{new Date(blog.updated_at).toUTCString()}</span>
        </div>
        <p className="">{blog.blog}</p>
      </div>
    </div>
  );
};

Blog.propTypes = propTypes;

export { getServerSideProps };
export default Blog;

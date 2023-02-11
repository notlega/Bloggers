import PropTypes from 'prop-types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import BlogCard from '../components/BlogCard';

const getServerSideProps = async (context) => {
  const supabaseClient = createServerSupabaseClient(context);

  const { data: blogs } = await supabaseClient.rpc('get_blogs', {
    blogs_limit: null,
    blogs_offset: null,
  });

  return {
    props: {
      blogs: blogs || null,
    },
  };
};

const propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      blog: PropTypes.string,
      created_at: PropTypes.string,
      updated_at: PropTypes.string,
      user_id: PropTypes.string,
      username: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
};

/**
 * Home page that displays all blogs
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Home = ({ blogs }) => (
  <div className="flex flex-col justify-center text-center">
    {blogs === null && (
      <>
        <div
          className="tenor-gif-embed"
          data-postid="5624685"
          data-share-method="host"
          data-aspect-ratio="1.77778"
          data-width="100%"
        >
          <a href="https://tenor.com/view/nat-geo-nat-geo-gi-fs-gif-5624685">No GIF</a>from{' '}
          <a href="https://tenor.com/search/nat+geo-gifs">Nat Geo GIFs</a>
        </div>{' '}
        <script type="text/javascript" async src="https://tenor.com/embed.js" />
      </>
    )}

    {blogs && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    )}
  </div>
);

Home.propTypes = propTypes;

export { getServerSideProps };
export default Home;

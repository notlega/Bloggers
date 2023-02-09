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

const Home = ({ blogs }) => (
  <div className="flex flex-col justify-center text-center">
    {blogs === null && <p>No blogs?</p>}

    {blogs && blogs.map((blog) => <BlogCard id={blog.id} title={blog.name} />)}
  </div>
);

Home.propTypes = propTypes;

export { getServerSideProps };
export default Home;

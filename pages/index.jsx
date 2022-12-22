import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import BlogCard from '../components/BlogCard';

const Home = () => {
  const supabaseClient = useSupabaseClient();

  const [blogs, setBlogs] = useState([]);

  const {
    isError: blogsError,
    isLoading: blogsLoading,
    status: blogsStatus,
  } = useQuery(
    'get_blogs',
    () => supabaseClient.rpc('get_blogs', { blogs_limit: null, blogs_offset: null }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        setBlogs(data.data);
      },
    }
  );

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  return (
    <div className="flex flex-col justify-center items-center">
      {blogsError && <p>There was an error fetching blogs</p>}

      {!blogsError &&
        !blogsLoading &&
        blogsStatus === 'success' &&
        blogs &&
        blogs.map((blog) => <BlogCard id={blog.blog_id} title={blog.name} />)}
    </div>
  );
};

export default Home;

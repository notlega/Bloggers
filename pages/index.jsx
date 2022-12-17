import { useState } from 'react';
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
    () => supabaseClient.rpc('get_blogs', { blogs_limit: 10, blogs_offset }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        setBlogs(data);
      },
    }
  );

  return (
    <div className="flex flex-col justify-center items-center">
      {!blogsError && !blogsLoading && blogsStatus === 'success' && blogs.map((blog) => <BlogCard id={blog.id} title={blog.title} />)}
    </div>
  );
};

export default Home;

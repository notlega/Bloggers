import { useRouter } from 'next/router';
import BlogCard from '../../components/blogCard';

const SearchParam = () => {
  const { id } = useRouter().query;

  return (
    <div className="flex flex-col justify-center text-center space-y-4">
      <h1 className="text-5xl font-bold">Search</h1>
      <div className="divider" />
      <BlogCard id={1} title="the huge potato" />
      <BlogCard id={2} title="the huge potato" />
      <BlogCard id={3} title="the huge potato" />
    </div>
  );
};

export default SearchParam;

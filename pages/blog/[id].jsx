import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BlogCard from '../../components/BlogCard';

const SearchParam = () => {
  const { id } = useRouter().query;

  useEffect(() => {
    console.log(typeof id);
  }, [id]);

  return (
    <div className="flex flex-col justify-center text-center space-y-4">
      <h1 className="text-5xl font-bold">Search</h1>
    </div>
  );
};

export default SearchParam;

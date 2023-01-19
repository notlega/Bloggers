import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SearchParam = () => {
  const { id } = useRouter().query;

  return (
    <div className="flex flex-col justify-center text-center space-y-4">
      <h1 className="text-5xl font-bold">Search</h1>
    </div>
  );
};

export default SearchParam;

import { useState } from 'react';
import BlogCard from '../components/BlogCard';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <BlogCard subHeader="Bing Chilling Section" title='bing chilling was first said by john cena back in 2019' />
      <BlogCard title='bing chilling was first said by john cena back in 2019' />
    </div>
  );
};

export default Home;

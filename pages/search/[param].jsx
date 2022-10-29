import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import BlogCard from '../../components/blogCard';
import Navbar from '../../components/navbar';

const SearchParam = () => {
  const { param } = useRouter().query;

  return (
    <>
      <Head>
        <title>NextJS-Blog</title>
      </Head>

      <main>
        <Navbar />
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div>
              <h1 className="text-5xl font-bold">Search</h1>
              <div className="divider"></div>
              <div className="flex w-full space-x-4">
                <BlogCard id={1} title="the huge potato" desc="this potato is insane!!!!!" />
                <BlogCard id={2} title="the huge potato" desc="this potato is insane!!!!!" />
                <BlogCard id={3} title="the huge potato" desc="this potato is insane!!!!!" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchParam;

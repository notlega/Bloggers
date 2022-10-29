import Head from 'next/head';
import Navbar from '../../components/navbar.jsx';

const Search = () => {
  return (
    <>
      <Head>
        <title>NextJS-Blog</title>
      </Head>

      <main>
        <Navbar />
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Search</h1>
              <div className="divider"></div>
              <p className="py-6">No value entered!</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Search;

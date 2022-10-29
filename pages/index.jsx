import Head from 'next/head';
import Navbar from '../components/navbar.jsx';

const Home = () => {
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
              <h1 className="text-5xl font-bold">Hello</h1>
              <p className="py-6">Welcome to a blog page</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

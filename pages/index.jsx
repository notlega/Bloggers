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
			</main>
    </>
  );
};

export default Home;

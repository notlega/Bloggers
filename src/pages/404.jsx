import Image from 'next/image';
import { useRouter } from 'next/router';
import errorGif from '../../public/error.gif';

const Custom404 = () => {
  const router = useRouter();

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="flex flex-col space-y-4">
          <Image src={errorGif} alt="error-gif-26155260" />
          <button className="btn" onClick={() => router.back()}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Custom404;

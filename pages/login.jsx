import Login from '../components/authentication/login';

const Page = () => {
  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md space-y-8">
            <h1 className="text-5xl font-bold">Login Here</h1>
            <Login />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Page;

import LoginComponent from '../components/authentication/login';

const Login = () => {
  return (
    <main>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-5xl font-bold">Login Here</h1>
            <LoginComponent />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

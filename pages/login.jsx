import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Login = () => {
  const supabaseClient = useSupabaseClient();

  // TODO: make custom login page

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-4xl space-y-8">
          <h1 className="text-5xl font-bold">Login</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;

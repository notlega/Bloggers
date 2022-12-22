import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Login = () => {
  const supabaseClient = useSupabaseClient();

  // TODO: add providers
  // const providers = ['google', 'facebook'];

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-4xl space-y-8">
          <h1 className="text-5xl font-bold">Login</h1>
          <Auth
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabaseClient}
            socialLayout="horizontal"
            redirectTo="http://localhost:3000"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

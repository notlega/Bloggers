import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const providers = ['google', 'google', 'google', 'google', 'google', 'google', 'google'];

const Login = () => {
  const supabaseClient = useSupabaseClient();
  return (
    <Auth
      redirectTo="http://localhost:3000/"
      appearance={{ theme: ThemeSupa }}
      supabaseClient={supabaseClient}
      providers={providers}
      socialLayout="horizontal"
    />
  );
};

export default Login;

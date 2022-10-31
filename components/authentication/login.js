import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const providers = [
  'apple',
  'azure',
  'bitbucket',
  'discord',
  'facebook',
  'github',
  'gitlab',
  'google',
  'keycloak',
  'linkedin',
  'messagebird',
  'notion',
  'slack',
  'spotify',
  'twitter',
  'twitch',
  'zoom',
  'twilio',
  'vonage',
];

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

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Container from '../components/Container';
import Navbar from '../components/Navbar';

// this is a list of general todos for this project
// TODO: switch to using picocss instead of tailwindcss
// TODO: write jest tests for all components
// TODO: install cypress and run tests on github actions

const MyApp = ({ Component, pageProps }) => {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Container>
          <Navbar />
          <Component {...pageProps} />
        </Container>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;

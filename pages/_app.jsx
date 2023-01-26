import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import DefaultLayout from '../layouts/DefaultLayout';

// this is a list of general todos for this project
// TODO: write jest tests for all components
// TODO: install cypress and run tests on github actions

const propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

/**
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());

  return getLayout(
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

MyApp.propTypes = propTypes;

export default MyApp;

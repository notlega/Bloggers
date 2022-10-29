import '../styles/globals.css';
import {useRouter} from "next/router";
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {useState} from "react";
import {SessionContextProvider} from "@supabase/auth-helpers-react/src/components/SessionContext";

function MyApp({Component, pageProps}) {
  const router = useRouter()
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [theme, setTheme] = useState('dark');

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  )
}

export default MyApp;

import '../styles/globals.css';
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider} from '@supabase/auth-helpers-react'
import {useState} from "react";
import {useRouter} from "next/router";
import Navbar from "../components/navbar";


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
      <Navbar theme={theme} setTheme={setTheme}/>
      <div>
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  )
}

export default MyApp;

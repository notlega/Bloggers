import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MdArrowBack } from 'react-icons/md';
import { Formik } from 'formik';
import Link from 'next/link';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

// TODO: create auth guard when i have time
// temp fix for auth guard
// redirects users who are already logged in
const getServerSideProps = async (context) => {
  const supabaseClient = createServerSupabaseClient(context);

  const user = await supabaseClient.auth.getUser();

  if (user.data.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Login = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const loginHandler = async (email, password) => {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
      // TODO: HANDLE ERROR WHEN I NOT LAZY
      // I AM LAZY
      console.log('🚀 ~ file: login.jsx:17 ~ loginHandler ~ error', error);
      return;
    }

    router.push('/');
  };

  // TODO: write validation

  return (
    <div className="hero min-h-screen !mt-0">
      <div className="hero-content flex-col text-center justify-center space-y-8 w-full">
        <button className="btn btn-ghost absolute top-6 left-4 !m-0" onClick={() => router.back()}>
          <MdArrowBack className="w-8 h-8" />
        </button>
        <h1 className="text-5xl font-bold w-full">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={() => {}}
          onSubmit={(values, { setSubmitting }) => {
            loginHandler(values.email, values.password);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form
              className="form-control justify-center space-y-4 w-full md:w-1/2"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting} className="btn">
                Login
              </button>
            </form>
          )}
        </Formik>
        <div className="flex flex-row justify-between w-full md:w-1/2 !mt-0">
          <Link href="/forgot-password" className="link">
            Forgot Password?
          </Link>
          <Link href="/sign-up" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = (page) => <div className="px-2 md:px-6 lg:mx-auto lg:max-w-[1080px]">{page}</div>;

export { getServerSideProps };
export default Login;

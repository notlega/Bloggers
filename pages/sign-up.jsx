import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { MdArrowBack } from 'react-icons/md';
import { Formik } from 'formik';
import Container from '../components/Container';

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

const SignUp = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const signUpHandler = async (email, username, password) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) {
      // TODO: HANDLE ERROR WHEN I NOT LAZY
      console.log(error);
      return;
    }

    router.push('/');
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col text-center justify-center space-y-8 w-full">
        <button className="btn btn-ghost absolute top-6 left-4 !m-0" onClick={() => router.back()}>
          <MdArrowBack className="w-8 h-8" />
        </button>
        <h1 className="text-5xl font-bold w-full">Sign Up</h1>
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          validate={() => {}}
          onSubmit={(values, { setSubmitting }) => {
            signUpHandler(values.email, values.username, values.password);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form
              className="form-control justify-center space-y-4 w-full md:w-1/3"
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
                type="text"
                name="username"
                placeholder="Username"
                className="input input-bordered"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username && errors.username}
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
              <button type="submit" disabled={isSubmitting} className="btn w-full">
                Sign Up
              </button>
            </form>
          )}
        </Formik>
        <Link href="/login" className="text-left link w-full md:w-1/3 !mt-0">
          Already have an account?
        </Link>
        <span className="text-left text-2xs w-full md:w-1/3">
          By signing up, you agree to literally no Terms and Conditions (not yet at least)
        </span>
      </div>
    </div>
  );
};

SignUp.getLayout = (page) => <Container>{page}</Container>;

export { getServerSideProps };
export default SignUp;

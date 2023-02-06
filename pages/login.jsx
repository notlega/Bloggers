import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RxCross1 } from 'react-icons/rx';
import { Formik } from 'formik';
import Link from 'next/link';

const getLayout = (page) => page;

const Login = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const loginHandler = async (email, password) => {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
      // TODO: HANDLE ERROR WHEN I NOT LAZY
      // TODO: I AM LAZY
      console.log(error);
    }

    router.push('/');
  };

  // TODO: write validation

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col text-center justify-center space-y-8 w-full">
        <button className="btn btn-ghost absolute top-6 left-6" onClick={() => router.back()}>
          <RxCross1 className="w-5 h-5" />
        </button>
        <h1 className="text-5xl font-bold w-3/4">Login</h1>
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
              className="form-control justify-center space-y-4 w-3/4 md:w-1/3"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting} className="btn w-full">
                Login
              </button>
            </form>
          )}
        </Formik>
        <div className="flex flex-row justify-between w-3/4 md:w-1/3 !mt-0">
          <Link href="/forgot-password" className="link">
            Forgot Password?
          </Link>
          <Link href="/register" className="link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = getLayout;

export default Login;

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Formik } from 'formik';

const SignUp = () => {
  const supabaseClient = useSupabaseClient();

  const signUpHandler = async (email, password) => {
    const { error } = await supabaseClient.auth.signUp({ email, password });

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col text-center justify-center space-y-8 w-full">
        <h1 className="text-5xl font-bold w-3/4">Sign Up</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={() => {}}
          onSubmit={(values, { setSubmitting }) => {
            signUpHandler(values.email, values.password);
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
                Sign Up
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;

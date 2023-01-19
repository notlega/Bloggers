import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Formik } from 'formik';

const Login = () => {
  const supabaseClient = useSupabaseClient();

  // TODO: write validation

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-4xl space-y-8">
          <h1 className="text-5xl font-bold">Login</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={() => {}}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                className="form-control flex flex-col justify-center space-y-4"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
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
        </div>
      </div>
    </div>
  );
};

export default Login;

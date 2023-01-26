import Link from 'next/link';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RxCross1 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import Container from '../components/Container';

const propTypes = {
  children: PropTypes.node,
};

const LoginLayout = ({ children }) => {
  const supabaseClient = useSupabaseClient();

  return (
    <Container classNames="flex flex-col justify-center relative">
      <div className="ml-auto mr-2 mb-auto mt-2 p-1 rounded">
        <RxCross1 className="w-10 h-10" />
      </div>
      {children}
    </Container>
  );
};

LoginLayout.propTypes = propTypes;

export default LoginLayout;

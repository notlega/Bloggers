import PropTypes from 'prop-types';
import cn from 'classnames';

const propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.node,
};

/**
 * Container is a component that wraps the entire page and sets the max width of the page
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Container = ({ classNames, children }) => (
  <div className={cn(classNames, 'mt-2 mb-8 md:my-6 px-2 md:px-6 lg:mx-auto lg:max-w-[1080px]')}>{children}</div>
);

Container.propTypes = propTypes;

export default Container;

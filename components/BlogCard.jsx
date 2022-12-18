import Link from 'next/link';
import PropTypes from 'prop-types';

const BlogCard = ({ id, subHeader, title, image }) => (
  <>
    {subHeader && <h4 className="text-xl font-semibold text-secondary mb-4">{subHeader}</h4>}
    <Link href={`/${id}`} className="flex flex-row h-20 space-x-4 px-2">
      {/* TODO: replace with actual image */}
      <img src="https://placeimg.com/840/480/any" alt={title} className="w-32 object-cover" />
      <h2 className="text-md font-semibold overflow-x-auto">{title}</h2>
    </Link>
    <div className="divider" />
  </>
);

BlogCard.propTypes = {
  id: PropTypes.number.isRequired,
  subHeader: PropTypes.string,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.object.isRequired,
};

export default BlogCard;

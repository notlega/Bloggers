import Link from 'next/link';
import PropTypes from 'prop-types';

const propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    blog: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
};

// TODO: finish all todos in blogcard component

/**
 * A card component for a blog
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 * @todo make all blogs have the option to have a preview image
 * @todo use badges next to blog name to show if its new or updated recently based on the dates provided
 * @todo add category badges to the bottom of the card using card-actions
 */
const BlogCard = ({ blog }) => (
  <div className="card shadow-xl">
    <Link href={`/profile/${blog.user_id}`} className="card-body flex-row py-6 space-x-2">
      <picture className="avatar w-[10%] md:w-[11%] lg:w-[13%]">
        <img src={blog.avatar} alt={blog.username} className="rounded-full" />
      </picture>
      <div className="card-title text-base">{blog.username}</div>
    </Link>
    <Link href={`/blog/${blog.id}`}>
      <figure>
        <img src="https://picsum.photos/seed/picsum/536/354" alt="Placeholder" />
      </figure>
      <div className="card-body text-left">
        <h2 className="card-title">{blog.name}</h2>
        <p>{blog.description}</p>
      </div>
    </Link>
  </div>
);

BlogCard.propTypes = propTypes;

export default BlogCard;

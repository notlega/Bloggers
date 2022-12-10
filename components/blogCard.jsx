const BlogCard = ({ id, title, desc }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Read</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

const Card = ({ course }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
        //   src={course.imageUrl}
          src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?t=st=1739724343~exp=1739727943~hmac=e26d6abdb6c15396990cb0edce69a23f7263063b85de5ea71f734cbd9df76728&w=900"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {course.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{course.description}</p>
        <p>{course.content}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Price: {course.pricing?.price}</div>
          <div className="badge badge-outline">Discount: {course.pricing?.discount}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;

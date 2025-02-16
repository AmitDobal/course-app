import Button from "../Button";

const Card = ({ course }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow" draggable>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {course.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {course.description}
      </p>
      <Button variant="primary">Enroll Now</Button>
    </div>
  );
};

export default Card;

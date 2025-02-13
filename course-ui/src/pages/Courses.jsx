import Button from "../components/Button";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      description: "Learn the basics of React.",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Deep dive into JavaScript concepts.",
    },
    {
      id: 3,
      title: "Tailwind CSS in Action",
      description: "Build modern UIs with Tailwind CSS.",
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Our Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {course.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {course.description}
            </p>
            <Button variant="primary">Enroll Now</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

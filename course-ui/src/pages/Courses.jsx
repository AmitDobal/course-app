import { useEffect, useState } from "react";
import CourseCard from "../components/cards/CourseCard";
import courseService from "../services/courseService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await courseService.getCourses({}, { page: page, size: pageSize });
    setCourses(res.data);
  };

  // const courses = [
  //   {
  //     id: 1,
  //     title: "React for Beginners",
  //     description: "Learn the basics of React.",
  //   },
  //   {
  //     id: 2,
  //     title: "Advanced JavaScript",
  //     description: "Deep dive into JavaScript concepts.",
  //   },
  //   {
  //     id: 3,
  //     title: "Tailwind CSS in Action",
  //     description: "Build modern UIs with Tailwind CSS.",
  //   },
  // ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Our Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;

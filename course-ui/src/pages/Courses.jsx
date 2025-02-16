import { useEffect, useState } from "react";
import courseService from "../services/courseService";
import Card from "../components/cards/Card";
import LoadingWrapper from "../components/loader/LoadingWrapper";
import Pagination from "../components/pagination/Pagination";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [page, pageSize]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await courseService.getCourses(
        { sort: "createdAt,desc" },
        { page: page, size: pageSize }
      );
      setCourses(res.data);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 h-full">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Our Courses
      </h2>
      <LoadingWrapper loading={loading}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <Card key={course.id} course={course} />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </LoadingWrapper>
    </div>
  );
};

export default Courses;

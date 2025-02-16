import api from "./api";
import apiConfig from "../config/apiEndpoints.json";

/**
 * Fetches courses from the backend with optional filters and pagination.
 *
 * @param {Object} filters - An object containing filter criteria (e.g., title, description, createdBy, etc.)
 * @param {Object} pageable - Pagination parameters: page, size, and optionally sort.
 * @returns {Promise<Object>} - Returns a promise that resolves to the paginated courses response.
 */
export const getCourses = async (
  filters = {},
  pageable = { page: 0, size: 10 }
) => {
  try {
    // Merge filters and pagination parameters.
    const params = { ...filters, page: pageable.page, size: pageable.size };
    if (pageable.sort) {
      params.sort = pageable.sort;
    }
    const response = await api.get(apiConfig.endpoints.getCourses, { params });
    // const response = await api.get(apiConfig.endpoints.get_courses, { params });
    // The response is assumed to follow the PaginationResponse structure.
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export default {
  getCourses,
};

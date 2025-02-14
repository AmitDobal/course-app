package com.amit.courseservice.commons.dto;

public record PaginationResponse<T>(Iterable<T> data, int totalPages, long totalElements) {}

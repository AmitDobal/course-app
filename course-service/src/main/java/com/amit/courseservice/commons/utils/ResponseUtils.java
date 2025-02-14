package com.amit.courseservice.commons.utils;

import com.amit.courseservice.commons.dto.PaginationResponse;
import org.springframework.data.domain.Page;

public class ResponseUtils {

    public static <T> PaginationResponse<T> convertPageToPaginationResponse(Page<T> page) {
        return new PaginationResponse<>(page.getContent(), page.getTotalPages(), page.getTotalElements());
    }
}

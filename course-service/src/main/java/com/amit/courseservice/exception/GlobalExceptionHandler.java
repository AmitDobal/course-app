package com.amit.courseservice.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleException(Exception ex) {
        log.error("Exception occurred: {}", ex.getMessage(), ex);
        ApiErrorResponse errorResponse =
                new ApiErrorResponse(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        "Unexpected error occurred.",
                        "Please refer to logs for more details.");
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ApiErrorResponse> countryException(
            AuthException ex, WebRequest request) {
        log.error("AuthException occurred: {}", ex.getMessage(), ex);
        ApiErrorResponse errorResponse =
                new ApiErrorResponse(
                        ex.getStatus().value(), ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorResponse, ex.getStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> insufficientAuthenticationException(
            MethodArgumentNotValidException ex, WebRequest request) {
        log.error("MethodArgumentNotValidException occurred: {}", ex.getMessage(), ex);
        String errorMessage =
                ex.getBindingResult().getFieldErrors().stream()
                        .map(error -> error.getField() + ": " + error.getDefaultMessage())
                        .collect(Collectors.joining(", "));
        ApiErrorResponse errorResponse =
                new ApiErrorResponse(
                        HttpStatus.BAD_REQUEST.value(), errorMessage, request.getDescription(false));
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}

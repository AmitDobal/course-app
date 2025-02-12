package com.amit.courseservice.exception;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiErrorResponse {
  private int code;
  private String message;
  private String details;
  private String errorCode;

  public ApiErrorResponse(int code, String message, String details, String errorCode) {
    this.code = code;
    this.message = message;
    this.details = details;
    this.errorCode = errorCode;
  }

  public ApiErrorResponse(int code, String message, String details) {
    this(code, message, details, "ERROR");
  }
}

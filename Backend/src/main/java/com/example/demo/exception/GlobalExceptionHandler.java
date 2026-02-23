package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /* =========================
       404 — NOT FOUND
       ========================= */
    @ExceptionHandler(InvalidServiceException.class)
    public ResponseEntity<?> handleInvalidService(InvalidServiceException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    /* =========================
       409 — CONFLICT (STATE)
       ========================= */
    @ExceptionHandler({
            InvalidCaseStateException.class,
            InvalidLifecycleTransitionException.class
    })
    public ResponseEntity<?> handleLifecycle(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ex.getMessage());
    }

    /* =========================
       400 — BUSINESS / VALIDATION
       ========================= */
    @ExceptionHandler({
            BusinessException.class,
            CashbackNotAllowedException.class,
            PaymentNotConfirmedException.class
    })
    public ResponseEntity<?> handleBusiness(RuntimeException ex) {
        return ResponseEntity
                .badRequest()
                .body(ex.getMessage());
    }

    /* =========================
       400 — MISSING / INVALID BODY
       ========================= */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleUnreadableBody(HttpMessageNotReadableException ex) {
        return ResponseEntity
                .badRequest()
                .body("Request body is required");
    }

    /* =========================
       500 — FALLBACK
       ========================= */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUnexpected(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Unexpected server error");
    }
}

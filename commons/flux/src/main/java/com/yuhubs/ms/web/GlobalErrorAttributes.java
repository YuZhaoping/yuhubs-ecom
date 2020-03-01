package com.yuhubs.ms.web;

import org.springframework.boot.web.reactive.error.DefaultErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;

import java.util.Map;

@Component
public class GlobalErrorAttributes extends DefaultErrorAttributes {

	private final RestExceptionHandler restExceptionHandler;


	GlobalErrorAttributes(RestExceptionHandler restExceptionHandler) {
		super(false);

		this.restExceptionHandler = restExceptionHandler;
	}


	@Override
	public Map<String,Object> getErrorAttributes(ServerRequest request, boolean includeStackTrace) {
		Throwable error = getError(request);

		if (error == null) {
			return super.getErrorAttributes(request, includeStackTrace);
		}

		HttpStatus status = this.restExceptionHandler.determineStatus(error);
		if (status == null) {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		RestErrorResponse response = RestErrorResponse.of(status, error);

		return response.toRestApiError().toAttributes();
	}

}
package com.yuhubs.ms.auth.mock;

import com.yuhubs.ms.security.auth.AuthUser;
import com.yuhubs.ms.security.auth.AuthUserService;
import com.yuhubs.ms.security.auth.SignUpRequest;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Service("AuthUserService")
public class MockAuthUserService implements AuthUserService {

	private final MockUserManager userManager;


	public MockAuthUserService(MockUserManager userManager) {
		this.userManager = userManager;
	}


	@Override
	public Mono<AuthUser> signUpUser(SignUpRequest request) {
		return Mono.just(request)
				.map(this.userManager::signUpUser);
	}

	@Override
	public Mono<AuthUser> getUserById(Long userId) {
		final Optional<AuthUser> userOp = this.userManager.getUserById(userId);
		if (userOp.isPresent()) {
			return Mono.just(userOp.get());
		} else {
			return Mono.empty();
		}
	}

	@Override
	public Mono<AuthUser> getUserByName(String username) {
		final Optional<AuthUser> userOp = this.userManager.getUserByName(username);
		if (userOp.isPresent()) {
			return Mono.just(userOp.get());
		} else {
			return Mono.empty();
		}
	}


	public MockUserManager mockUserManager() {
		return this.userManager;
	}

}

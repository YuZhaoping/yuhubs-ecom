package com.yuhubs.ms.redis;

import org.springframework.data.redis.connection.ReactiveRedisConnectionFactory;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.data.redis.serializer.*;

public class ReactiveRedisTemplateProvider extends RedisTemplateProviderBase {

	public ReactiveRedisTemplateProvider(LettuceConnectionManager connectionManager) {
		super(connectionManager);
	}


	public ReactiveStringRedisTemplate createReactiveStringRedisTemplate() {
		return new ReactiveStringRedisTemplate(reactiveRedisConnectionFactory(),
				createStringSerializationContext()
		);
	}

	public ReactiveRedisTemplate<String, Object> createReactiveJsonRedisTemplate() {
		return new ReactiveRedisTemplate<>(reactiveRedisConnectionFactory(),
				createJsonSerializationContext()
		);
	}

	public ReactiveRedisTemplate<String, Object> createReactiveJdkRedisTemplate() {
		return new ReactiveRedisTemplate<>(reactiveRedisConnectionFactory(),
				createJdkSerializationContext()
		);
	}


	protected RedisSerializationContext<String, String> createStringSerializationContext() {
		return RedisSerializationContext.string();
	}

	protected RedisSerializationContext<String, Object> createJdkSerializationContext() {
		RedisSerializationContext.RedisSerializationContextBuilder<String, Object> builder =
				RedisSerializationContext.newSerializationContext(RedisSerializer.java());

		builder.key(StringRedisSerializer.UTF_8).value(new JdkSerializationRedisSerializer());

		return builder.build();
	}

	protected RedisSerializationContext<String, Object> createJsonSerializationContext() {
		RedisSerializationContext.RedisSerializationContextBuilder<String, Object> builder =
				RedisSerializationContext.newSerializationContext(RedisSerializer.json());

		builder.key(StringRedisSerializer.UTF_8)
				.value(new GenericJackson2JsonRedisSerializer(createJackson2ObjectMapper()));

		return builder.build();
	}


	protected final ReactiveRedisConnectionFactory reactiveRedisConnectionFactory() {
		return this.connectionManager.getReactiveConnectionFactory();
	}

}
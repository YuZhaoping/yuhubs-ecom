package com.yuhubs.ms.auth.redis;

import com.yuhubs.ms.redis.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;

@Configuration
public class AuthRedisConfig extends RedisConfigurationSupport {

	private static final String PROPERTIES_SOURCE_PATH = "classpath:redis.properties";

	@Autowired
	private ResourceLoader resourceLoader;


	@Bean
	public LettuceConnectionManager authRedisConnectionManager() {
		return super.lettuceConnectionManagerBean();
	}

	@Bean
	public ReactiveRedisTemplateSupplier authReactiveRedisTemplateSupplier(
			LettuceConnectionManager authRedisConnectionManager) {
		return new ReactiveRedisTemplateSupplier(authRedisConnectionManager);
	}

	@Bean
	public RedisTemplateSupplier authRedisTemplateSupplier(
			LettuceConnectionManager authRedisConnectionManager) {
		return new RedisTemplateSupplier(authRedisConnectionManager);
	}


	@Override
	protected LettuceConfigProperties createLettuceConfigProperties() {
		LettuceConfigProperties config = new LettuceConfigProperties();

		try {
			config.load(resourceLoader, PROPERTIES_SOURCE_PATH);
		} catch (Exception e) {
			// TODO
		}

		return config;
	}

}

package com.yuhubs.ms.redis;

import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;

@Configuration
public class RedisConfigurationSupport {

	private static final class BuildTweaker implements LettuceClientBuildTweaker {

		private final RedisConfigurationSupport support;

		BuildTweaker(RedisConfigurationSupport support) {
			this.support = support;
		}

		@Override
		public void tweakLettuceClientBuilder(LettuceClientConfiguration.LettuceClientConfigurationBuilder builder) {
			this.support.tweakLettuceClientBuilder(builder);
		}

		@Override
		public void tweakLettuceSslClientBuilder(LettuceClientConfiguration.LettuceSslClientConfigurationBuilder builder) {
			this.support.tweakLettuceSslClientBuilder(builder);
		}

		@Override
		public void tweakLettuceClientPoolConfig(GenericObjectPoolConfig poolConfig) {
			this.support.tweakLettuceClientPoolConfig(poolConfig);
		}

	}

	protected void tweakLettuceClientBuilder(LettuceClientConfiguration.LettuceClientConfigurationBuilder builder) {
	}

	protected void tweakLettuceSslClientBuilder(LettuceClientConfiguration.LettuceSslClientConfigurationBuilder builder) {
	}

	protected void tweakLettuceClientPoolConfig(GenericObjectPoolConfig poolConfig) {
	}


	protected final LettuceConnectionManager lettuceConnectionManagerBean() {
		LettuceConfigProperties properties = createLettuceConfigProperties();
		return new LettuceConnectionManager(properties, new BuildTweaker(this));
	}

	protected LettuceConfigProperties createLettuceConfigProperties() {
		return new LettuceConfigProperties();
	}

}

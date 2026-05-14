import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client?: Redis;
  private readonly logger = new Logger('RedisService');

  onModuleInit() {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      this.logger.warn('REDIS_URL is not set. Redis cache is disabled.');
      return;
    }

    this.client = new Redis(redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: null,
    });

    this.client.on('error', (err) => {
      this.logger.error('Redis error', err);
    });

    this.client.on('connect', () => {
      this.logger.log('Redis connected');
    });
  }

  async set(key: string, value: any, ttl?: number) {
    if (!this.client) return;
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    if (ttl) {
      await this.client.set(key, val, 'EX', ttl);
    } else {
      await this.client.set(key, val);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.client) return null;
    const val = await this.client.get(key);
    if (!val) return null;
    try {
      return JSON.parse(val) as T;
    } catch {
      return val as unknown as T;
    }
  }

  async del(key: string) {
    if (!this.client) return;
    await this.client.del(key);
  }

  onModuleDestroy() {
    this.client?.disconnect();
  }
}

const session = require("express-session");
const RedisStore = require("connect-redis")(session);

import * as redis from 'redis';

export const redisStore = new RedisStore({ client: redis.createClient({
    host: '127.0.0.1',
    port: 6379
})});

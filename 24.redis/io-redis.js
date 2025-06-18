const Redis = require("ioredis");

const redis = new Redis();

redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

async function ioRedisDemo() {
  try {
    await redis.set("mykey", "value");
    console.log(await redis.get("mykey")); // Output: "value"
    
  } catch (error) {
    console.error(error);
  } finally {
    redis.quit();
  }
}


ioRedisDemo();
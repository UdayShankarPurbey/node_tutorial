const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) =>
  console.log("Redis Client Error Occured !", error)
);

async function testRedisConnections() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    // await client.set("key", "uday");
    // const value = await client.get("key");
    // console.log("Value : ", value);


    // const deleteCount = await client.del("key");
    // console.log("Deleted Count : ", deleteCount);

    // await client.set("counter", 100);

    // const incerementCount = await client.incr("counter");
    // console.log("Increment Count : ", incerementCount);

    // const decrementCount = await client.decr("counter");
    // console.log("Decrement Count : ", decrementCount);



  } catch (error) {
    console.log("Error Occured While Connecting to Redis !", error);
  } finally {
    await client.quit();
  }
}


testRedisConnections()
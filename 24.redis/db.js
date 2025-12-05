const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

client.on('error', (error) => console.log('Redis Client Error Occured !', error));

async function redisDataStructure() {
  try {
    await client.connect();
    //strings --> set , get , mSet , mGet

    // await client.set("User:name", "John Doe");
    // console.log(await client.get("User:name"));

    // await client.mSet(["User:name","John Doe","User:email","john.doe1@example.com","User:age","25"]);
    // console.log(await client.mGet(["User:name", "User:email", "User:age"]));

    // await client.mSet({
    //   "User:name": "Uday",
    //   "User:email": "uday@example.com",
    //   "User:age": "21",
    // });
    // console.log(await client.mGet(["User:name", "User:email", "User:age"]));

    //list --> rPush , rPop , lPush , lPop , lRange

    // await client.lPush("notes", ["Note 1", "Note 2", "Note 3"]);
    // console.log(await client.lRange("notes", 0, -1));

    // console.log("LPOP : ",await client.lPop("notes"));
    // console.log("LRANGE : ",await client.lRange("notes", 0, -1));

    // console.log("RPUSH : ",await client.rPush("notes", "Note 4"));
    // console.log("LRANGE : ",await client.lRange("notes", 0, -1));

    //sets  --> sAdd , sCard , sMembers , sRemove , sIsMember
    // await client.sAdd("colors", ["Red", "Green", "Blue"]);
    // console.log("SCARD : ",await client.sCard("colors"));
    // console.log("SMEMBERS : ",await client.sMembers("colors"));
    // console.log("SREMOVE : ",await client.sRem("colors", "Red"));
    // console.log("SMEMBERS : ",await client.sMembers("colors"));
    // console.log("SISMEMBER : ",await client.sIsMember("colors", "Blue"));

    // sorted sets --> zAdd , zCard , zRange , zScore , zRem , zIncrBy
    // await client.zAdd("grades", {score: 90, value: "A"});
    // await client.zAdd("grades", {score: 80, value: "B"});
    // await client.zAdd("grades", {score: 70, value: "C"});
    // console.log("ZCARD : ",await client.zCard("grades"));
    // console.log("ZRANGE : ",await client.zRange("grades", 0, -1));
    // console.log("ZSCORE : ",await client.zScore("grades", "A"));
    // console.log("ZINCRBY : ",await client.zIncrBy("grades", 10, "A"));
    // console.log("ZRANGE : ",await client.zRange("grades", 0, -1));

    // await client.zAdd("cart" ,[
    //   {
    //     value : "Laptop",
    //     score : 100000
    //   },
    //   {
    //     value : "Watch",
    //     score : 25000
    //   },
    //   {
    //     value : "Mobile",
    //     score : 50000
    //   }
    // ])
    // console.log("ZRANGE : ",await client.zRange("cart", 0, -1));
    // console.log("ZRANGEWITHSCORE : ",await client.zRangeWithScores("cart", 0, -1));
    // console.log("ZRANK : ",await client.ZRANK("cart", "Laptop"));

    // hashes --> hSet , hGet , hGetAll , hKeys , hVals , hExists , hDel
    // await client.hSet("user", {name : "John Doe", email : "john.doe1@example.com", age : 25});
    // console.log("HGET : ",await client.hGet("user", "name"));
    // console.log("HGETALL : ",await client.hGetAll("user"));
    // console.log("HKEYS : ",await client.hKeys("user"));
    // console.log("HVALS : ",await client.hVals("user"));
    // console.log("HEXISTS : ",await client.hExists("user", "name"));
    // console.log("HDEL : ",await client.hDel("user", "email"));
  } catch (error) {
    console.error(error);
  } finally {
    client.quit();
  }
}

redisDataStructure();

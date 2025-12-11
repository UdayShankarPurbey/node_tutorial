const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

client.on('error', (error) => console.log('Redis Client Error Occured !', error));

async function testAdditionalFeatures() {
  try {
    await client.connect();

    // const subscriber = client.duplicate();

    // await subscriber.connect(); // connect redis for subscribeer

    // await subscriber.subscribe("mychannel", (message, channel) => {
    //   console.log(`Received message on channel ${channel}: ${message}`);
    // });

    // // publish message to channel
    // await client.publish("mychannel", "Hello from publisher!");
    // await client.publish("mychannel", "How are you?");

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // await subscriber.unsubscribe("mychannel");
    // await subscriber.quit();

    // pipelining and transactions

    // const multi = client.multi();
    // multi.set("user:1", "John Doe");
    // multi.set("user:2", "Jane Doe");
    // multi.set("user:3", "Bob Smith");

    // multi.get('user:1');
    // multi.get('user:2');
    // multi.get('user:3');

    // const result = await multi.exec();
    // console.log(result);

    // const pipeline = client.multi();
    // pipeline.set("transaction:1", "10000");
    // pipeline.set("transaction:2", "50000");
    // pipeline.set("transaction:3", "200");

    // pipeline.get('transaction:1');
    // pipeline.get('transaction:2');
    // pipeline.get('transaction:3');

    // const pipelineResult = await pipeline.exec();
    // console.log(pipelineResult);

    // //batch data operations
    // const pipeline1 = client.multi();

    // for(let i = 0 ; i<=1000; i++){
    //   pipeline1.set(`user:${i}:action`, Math.random(i));
    // }

    // const pipeline1Result =  await pipeline1.exec();
    // console.log(pipeline1Result);

    // const dummyExmaple = client.multi()
    // dummyExmaple.decrBy('acc:123', 100);
    // dummyExmaple.incrBy('acc:456', 100);

    // const finalResult = await dummyExmaple.exec();
    // console.log(finalResult);

    // const cartExample = client.multi();
    // cartExample.hIncrBy('cart:123','item_count', 1);
    // cartExample.hIncrBy('cart:123','total_price', 100);
    // const cartResult = await cartExample.exec();
    // console.log(cartResult);

    console.log('Performance Test');
    console.time('Without Pipelining');

    for (let i = 0; i <= 1000; i++) {
      await client.set(`user:${i}:action`, `user_value_${Math.random(i)}`);
    }

    console.timeEnd('Without Pipelining');
    console.time('With Pipelining');

    const testPipeline = client.multi();
    for (let i = 0; i <= 1000; i++) {
      testPipeline.set(`user_pipeline:${i}:action`, `user_pipeline_value_${Math.random(i)}`);
    }

    await testPipeline.exec();
    console.timeEnd('With Pipelining');
  } catch (error) {
    console.error(error);
  } finally {
    client.quit();
  }
}

testAdditionalFeatures();

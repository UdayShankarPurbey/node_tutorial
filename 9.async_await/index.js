function delayFn(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}


async function delayedGreet(name) {
  await delayFn(2000);
  console.log(`Hello, ${name}!`);
}


delayedGreet('Uday Kumar Purbey');


// 01:29:47
// mkdir 10.event_emitter
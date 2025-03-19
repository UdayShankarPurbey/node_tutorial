const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname , 'data');

if(!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log('Data folder created');
}

// sync way
const filePath = path.join(dataFolder , "file.txt");

fs.writeFileSync(filePath, "Hello ! Uday This Side");
console.log("file created successfully");

const readContent = fs.readFileSync(filePath , "utf8");

console.log("Content of file:", readContent);

fs.appendFileSync(filePath, "\nThis is a new line ");
console.log("New Line added");


//async way

const asyncFilePath = path.join(dataFolder , "asyncFile.txt");

fs.writeFile(asyncFilePath , "Hello async node js" , (err) => {
  if(err) throw err;
  console.log("Async file created successfully");
  fs.readFile(asyncFilePath, "utf8", (err, data) => {
    if(err) throw err;
    console.log("Content of async file:", data);

    fs.appendFile(asyncFilePath , "\nThis is a new line " , (err) =>{
      if(err) throw err;
      console.log("New line added asynchronously");
    })
  })
})


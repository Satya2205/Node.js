const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1(Reading file at once(Leading to crash of APP))
  //   fs.readFile("./test-file.txt", "utf-8", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  // Solution 2(Streams)(Issue backpressuring)
  //   const readable = fs.createReadStream("./test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });

  // Solution 3(Streams)(Use pipe to avoid backpressuring)
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res);
});

server.listen("8000", "127.0.0.1", () => {
  console.log("Listening...");
});

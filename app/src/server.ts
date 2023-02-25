import express from "express";

const app = express();

app.set("port", process.env.PORT || 3000);

console.log("Hello World..");

process.on('SIGHUP', (signal) => {
  console.log(`*^!@4=> Received event: ${ signal }`)
})

const closeGracefully = async (signal: NodeJS.Signals) => {
  console.log(`*^!@4=> Received signal to terminate: ${ signal }`)

  // @ts-ignore
  await fastify.close()
  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.kill(process.pid, signal);
}

process.once('SIGINT', closeGracefully)

process.once('SIGTERM', closeGracefully)

app.use("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.status(200).send("ok")
  } catch (error) {
    next(error)
  }
})

const server = app.listen(app.get("port"), () => {
  console.log("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

export default server;

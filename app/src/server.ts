import express from "express";

const app = express();

app.set("port", process.env.PORT || 3000);

console.log("Hello World..................");

app.use("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.status(200).send("ok..")
  } catch (error) {
    next(error)
  }
})

const server = app.listen(app.get("port"), () => {
  console.log("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

export default server;

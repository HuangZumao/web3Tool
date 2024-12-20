import express, { Request, Response } from "express";
import path from "path";
import mainRouter from "./router";
const app = express();
const port = 3000;

app.use(express.json());

// 处理 Vue 构建后的静态文件
app.use(express.static(path.join(__dirname, "../frontend", "dist")));

app.use("/api", mainRouter);

// 所有其他请求都返回前端的 index.html
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

import * as readline from "readline";

// 创建一个接口用于读取终端输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export const getInput = () => {
  return new Promise<string[]>((resolve) => {
    const lines: string[] = [];
    console.log("请输入空行结束）：");
    rl.on("line", (input) => {
      if (input.trim() === "") {
        // 空行结束输入
        rl.close();
        resolve(lines);
      } else {
        lines.push(input); // 直接将每一行添加到lines数组中
      }
    });
  });
};

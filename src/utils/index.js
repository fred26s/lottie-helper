const childProcess = require("child_process");

// node中子进程执行shell脚本
export const nodeRunShell = (shell) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(
      shell,
      (error, stdout, stderr) => {
        console.log("exec:");
        console.log("error", error);
        console.log("stdout", stdout);
        console.log("stderr", stderr);
        if (!error) {
          console.log("shell 执行成功");
          resolve("shell 执行成功");
          // 成功
        } else {
          // 失败
          console.log("shell 执行失败");
          reject('shell 执行失败')
        }
      }
    );
  })
}
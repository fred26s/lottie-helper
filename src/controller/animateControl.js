export function AnimateControl() {
  //
  this.animatePlaying = false;
  // 动画最小播放时长
  this.animateRange = 2000;
  this.animateStartTime = 0;
}
AnimateControl.prototype.animateStart = function() {
  this.animatePlaying = true;
  this.animateStartTime = new Date().valueOf();
  return `this.animatePlaying: ${this.animatePlaying}`;
};
AnimateControl.prototype.animateEnd = function() {
  this.animatePlaying = false;
  document.querySelector("#lottie-wrapper").style.opacity = "0";
  document.querySelector("#lottie-wrapper").style.visibility = "hidden";
  console.log(
    "%c 🍪 document.querySelector(#lottie-wrapper): ",
    "font-size:20px;background-color: #FFDD4D;color:#fff;",
    document.querySelector("#lottie-wrapper")
  );
};
// 至少需要完整播放一次动画，避免闪屏
// 是否需要动画
AnimateControl.prototype.needLoadAnimate = function() {
  var endTime = new Date().valueOf();
  var timeRange = endTime - this.animateStartTime;
  var finishiAnimate = timeRange > this.animateRange;
  // 若大于时间播放要求，则停止
  if (finishiAnimate) {
    this.animateEnd();
    return Promise.reject("停止播放");
  }
  return new Promise(resolve => {
    var limitTime = this.animateRange - timeRange;
    // 剩余时间后，关闭动画
    setTimeout(() => {
      resolve(this.animateEnd);
    }, limitTime);
  });
};

export default AnimateControl;

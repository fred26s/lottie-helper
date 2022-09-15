import AnimateControl from "./animateControl.js";

// 动画实例
window.animateControl = new AnimateControl();
window.addEventListener("load", () => {
  console.log("[LoHelp]: page is fully loaded");
  // 关闭动画，检测关闭时机
  window.animateControl
    .needLoadAnimate()
    .then(() => {
      window.animateControl.animateEnd();
    })
    .catch((err) => {
      console.error(err);
    });
});

var lottie = document.querySelector("#lottie");

function animateStart() {
  console.log("[LoHelp]: animateStart...");
  if (lottie) {
    // 直接播放动画，记录时间
    window.animateControl.animateStart();
    // 播放动画
    window.bodymovin.loadAnimation({
      container: lottie, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: window.animateJson,
    });
  }
}

// 实时查看是否播放条件准备就绪
var canStart = window.animateJson && lottie && window.animateControl;
if (canStart) {
  console.log("[LoHelp]: animateCanStart...");
  animateStart();
}

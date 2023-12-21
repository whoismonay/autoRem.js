(function () {
  let timer = null,
    htmlDom = document.querySelector("html"),
    bodyDom = document.querySelector("body"),
    oldBodyFontSize = getComputedStyle(bodyDom).fontSize;
  let options = {
    dw: 1920,
    dh: 1080,
    delay: 0,
  };

  function setOptions(opts = {}) {
    Object.assign(options, opts);
    bodyDom.style.fontSize = oldBodyFontSize;
    keepAuto();
  }

  function keepAuto() {
    const { dw, dh } = options;
    const clientWidth = document.documentElement.clientWidth,
      clientHeight = document.documentElement.clientHeight;
    const scale =
      clientWidth / clientHeight < dw / dh
        ? clientWidth / dw
        : clientHeight / dh;
    htmlDom.style.fontSize = scale + "px";
  }

  function resizeListener() {
    const { delay } = options;
    clearTimeout(timer);
    if (delay) {
      timer = setTimeout(keepAuto, delay);
    } else {
      keepAuto();
    }
  }

  window.addEventListener("resize", resizeListener);

  setOptions()
  
  window.autoRem = {
    setOptions,
  };
})();

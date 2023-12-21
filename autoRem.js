(function () {
  let timer = null,
    htmlDom = document.querySelector("html"),
    oldHtmlFontSize = htmlDom.style.fontSize,
    bodyDom = document.querySelector("body"),
    oldBodyFontSize = getComputedStyle(bodyDom).fontSize;
  let options = {
    dw: 1920,
    dh: 1080,
    resize: true,
    delay: 0,
  };

  function init(opts = {}) {
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

  function off() {
    clearTimeout(timer);
    timer = null;
    window.removeEventListener("resize", resizeListener);
    htmlDom.style.fontSize = oldHtmlFontSize;
  }

  options.resize && window.addEventListener("resize", resizeListener);

  window.autoRem = {
    init,
    off,
  };
})();

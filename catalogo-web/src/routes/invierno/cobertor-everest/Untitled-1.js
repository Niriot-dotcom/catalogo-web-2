const textPath = document.querySelector("#text-path");

const h = document.documentElement,
  b = document.body,
  st = "scrollTop",
  fixedHeight = 5000; // this value can be adjusted to your liking

document.addEventListener("scroll", (e) => {
  let percent = ((h[st] || b[st]) / fixedHeight) * 100;
  textPath.setAttribute("startOffset", -percent * 40 + 1200);
});

("use strict");
function _instanceof(e, t) {
  return null != t && "undefined" != typeof Symbol && t[Symbol.hasInstance]
    ? !!t[Symbol.hasInstance](e)
    : e instanceof t;
}
function _classCallCheck(e, t) {
  if (!_instanceof(e, t))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
  for (var a = 0; a < t.length; a++) {
    var i = t[a];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(e, i.key, i);
  }
}
function _createClass(e, t, a) {
  return (
    t && _defineProperties(e.prototype, t), a && _defineProperties(e, a), e
  );
}
var BeerSlider = (function () {
    function i(e) {
      var t =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "50",
        a =
          2 < arguments.length && void 0 !== arguments[2]
            ? arguments[2]
            : "udesly-before-after";
      _classCallCheck(this, i),
        (this.start = parseInt(t)
          ? Math.min(100, Math.max(0, parseInt(t)))
          : 50),
        (this.prefix = a),
        (this.element = e),
        this.element.classList.add("udesly-before-after-slider"),
        (this.imageLeft = this.element.querySelector('[image="left"]')),
        (this.imageRight = this.element.querySelector('[image="right"]')),
        (this.labelLeft = this.element.querySelector('[image="left-label"]')),
        (this.labelRight = this.element.querySelector('[image="right-label"]')),
        (this.revealContainerImage = document.createElement("div")),
        this.revealContainerImage.classList.add(
          "".concat(this.prefix, "-reveal"),
        ),
        this.revealContainerImage.appendChild(this.imageLeft),
        this.element.appendChild(this.revealContainerImage),
        (this.range = this.addElement("input", {
          type: "range",
          class: "".concat(this.prefix, "-range"),
          "aria-label": "Percent of revealed content",
          "aria-valuemin": "0",
          "aria-valuemax": "200",
          "aria-valuenow": this.start,
          value: this.start,
          min: "0",
          max: "100",
        })),
        (this.handle = this.element.querySelector('[before-after="handle"]')),
        this.handle.classList.add("udesly-before-after-handle"),
        this.onImagesLoad();
    }
    return (
      _createClass(i, [
        {
          key: "init",
          value: function () {
            this.element.classList.add("".concat(this.prefix, "-ready")),
              this.setImgWidth(),
              this.move(),
              this.addListeners();
          },
        },
        {
          key: "loadingImg",
          value: function (i) {
            return new Promise(function (e, t) {
              i || e();
              var a = new Image();
              (a.onload = function () {
                return e();
              }),
                (a.onerror = function () {
                  return t();
                }),
                (a.src = i);
            });
          },
        },
        {
          key: "loadedBoth",
          value: function () {
            var e = this.imageRight.src,
              t = this.imageLeft.src;
            return Promise.all([this.loadingImg(e), this.loadingImg(t)]);
          },
        },
        {
          key: "onImagesLoad",
          value: function () {
            var e = this;
            this.loadedBoth().then(
              function () {
                e.init();
              },
              function () {
                console.error(
                  "Some errors occurred and images are not loaded.",
                );
              },
            );
          },
        },
        {
          key: "addElement",
          value: function (e, t) {
            var a = document.createElement(e);
            return (
              Object.keys(t).forEach(function (e) {
                a.setAttribute(e, t[e]);
              }),
              this.element.appendChild(a),
              a
            );
          },
        },
        {
          key: "setImgWidth",
          value: function () {
            this.imageLeft.style.width = getComputedStyle(this.element).width;
          },
        },
        {
          key: "addListeners",
          value: function () {
            var t = this;

            this.circleWrapper.addEventListener("mousedown", function (e) {
              e.preventDefault();
              document.addEventListener("mousemove", onMouseMove);
              document.addEventListener("mouseup", onMouseUp);
            });

            this.circleWrapper.addEventListener("touchstart", function (e) {
              document.addEventListener("touchmove", onTouchMove);
              document.addEventListener("touchend", onTouchEnd);
            });

            function onMouseMove(e) {
              var percentage =
                ((e.clientX - t.element.getBoundingClientRect().left) /
                  t.element.offsetWidth) *
                100;
              t.range.value = Math.min(Math.max(percentage, 0), 100);
              t.move();
            }

            function onMouseUp() {
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
            }

            function onTouchMove(e) {
              var touch = e.touches[0];
              var percentage =
                ((touch.clientX - t.element.getBoundingClientRect().left) /
                  t.element.offsetWidth) *
                100;
              t.range.value = Math.min(Math.max(percentage, 0), 100);
              t.move();
            }

            function onTouchEnd() {
              document.removeEventListener("touchmove", onTouchMove);
              document.removeEventListener("touchend", onTouchEnd);
            }

            window.addEventListener("resize", function () {
              t.setImgWidth();
            });
          },
        },
        {
          key: "move",
          value: function () {
            (this.revealContainerImage.style.width = "".concat(
              this.range.value,
              "%",
            )),
              (this.handle.style.left = "".concat(this.range.value, "%")),
              this.range.setAttribute("aria-valuenow", this.range.value),
              this.labelRight && 60 < this.range.value
                ? (this.labelRight.style = "opacity: 0;")
                : this.labelLeft && this.range.value < 40
                ? (this.labelLeft.style = "opacity:0;")
                : (this.labelLeft && (this.labelLeft.style = "opacity:1;"),
                  this.labelRight && (this.labelRight.style = "opacity: 1;"));
          },
        },
      ]),
      i
    );
  })(),
  style = document.createElement("style");
style.innerHTML = `
    .udesly-before-after-slider{display:inline-block;overflow:hidden;position:relative}
    .udesly-before-after-reveal{left:0;opacity:0;overflow:hidden;position:absolute;right:50%;top:0;transition:opacity 0.35s;z-index:1}
    .udesly-before-after-reveal>:first-child{height:100vh;max-width:none;width:200%}
    .udesly-before-after-range{height:0;width:0;opacity:0;position:absolute;z-index:2}
    .udesly-before-after-handle{left:50%;pointer-events:none;position:absolute;top:50%;transform:translate3d(-50%,-50%,0);transition:background 0.3s,box-shadow 0.3s,opacity 0.5s 0.25s;z-index:3}
    .udesly-before-after-ready .udesly-before-after-handle,.udesly-before-after-ready .udesly-before-after-reveal{opacity:1}
    .udesly-before-after-ready img{ width: 100%; height: 100vh;}
    .udesly-before-after-ready [image="left"] {position: relative;}
    .udesly-before-after-ready [image="right"] {position: absolute;}
`;
document.head.appendChild(style),
  document.querySelectorAll("[udesly-before-after]").forEach(function (e) {
    var t = Number(e.getAttribute("udesly-before-after")) || 50;
    new BeerSlider(e, t);
  });

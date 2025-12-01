/* global gsap, ScrollTrigger, ScrollToPlugin, CustomEase, SplitType, $ */

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);

document.documentElement.classList.add("no-scroll");
document.body.classList.add("no-scroll");

const lenis = new Lenis({
  duration: 1.6,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
lenis.stop();

//
new SplitType(".sc-visual .description ", { types: "lines" });

gsap.set(".sc-visual .description .line, .sc-visual .number span", {
  yPercent: 100,
});

const introTl = gsap.timeline({
  defaults: { duration: 0.8, ease: "power2.out" },
});

introTl
  .to(
    ".sc-visual .description .line",
    {
      yPercent: 0,
      stagger: 0.1,
    },
    "<",
  )
  .to(
    ".sc-visual .number span",
    {
      yPercent: 0,
      stagger: 0.1,
    },
    "<",
  );

new SplitType(".sc-visual .logo path", { types: "chars" });

gsap.set("#header .styled-list .nav-text, #header .styled-underline", {
  y: -100,
});
gsap.set(".sc-visual .tagline span", { y: 50, opacity: 0 });
gsap.set(".sc-visual .logo path", { y: 100, clipPath: "inset(0% 0% 100% 0%)" });

const introMotion = gsap.timeline({
  defaults: {
    duration: 1.2,
    ease: "power2.inOut",
  },
  delay: 2,
});

//  첫 등장 애니메이션
introMotion
  .to(
    ".sc-visual .bar1",
    {
      "clip-path": "inset(0% 0% 0% 100%)",
    },
    "a",
  )
  .to(
    ".sc-visual .bar2",
    {
      "clip-path": "inset(0% 0% 0% 65%)",
    },
    "a",
  )
  .to(
    ".sc-visual .bar2 .number",
    {
      left: "65%",
    },
    "a",
  )
  .to(
    ".sc-visual .bar3",
    {
      "clip-path": function () {
        const bar3Width =
          document.querySelector(".sc-visual .bar3").offsetWidth;
        const logoWidth = document.querySelector(
          ".sc-visual .bar3 .logo",
        ).offsetWidth;
        const percentage = (logoWidth / bar3Width) * 100;

        return "inset(0% 0% 0% " + (100 - percentage) + "%)";
      },
    },
    "a+=0.2",
  )
  .to(
    ".sc-visual .logo path",
    {
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "power1.inOut",
      duration: 0.7,
      stagger: -0.1,
    },
    "a+=0.5",
  )
  .to(
    "#header .styled-underline ",
    {
      y: 0,
      ease: "power1.inOut",
      duration: 0.7,
    },
    "a+=0.55",
  )
  .to(
    "#header .styled-list .nav-text",
    {
      y: 0,
      ease: "power1.inOut",
      duration: 0.7,
    },
    "a+=0.6",
  )
  .to(
    ".sc-visual .tagline span",
    {
      y: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.7,
      stagger: 0.1,
    },
    "a+=0.6",
  );

let scrollMotionEnabled = false;
introMotion.eventCallback("onComplete", () => {
  scrollMotionEnabled = true;
});

// 인트로 스크롤 잠금하제
introMotion.eventCallback("onComplete", () => {
  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");
  lenis.start();
  ScrollTrigger.refresh();
});

const introScrollMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-visual",
    start: "0% 0%",
    end: "100% 100%",
    scrub: 0,
    invalidateOnRefresh: true,
    // pin: true,
    onUpdate: (self) => {
      if (scrollMotionEnabled && self.direction === 1) {
        introScrollMotion.progress(self.progress);
      }
    },
  },
});

introScrollMotion
  .to(
    ".sc-visual .bar2",
    {
      "clip-path": "inset(0% 0% 0% 100%)",
    },
    "<",
  )
  .to(
    ".sc-visual .bar3",
    {
      x: function () {
        const bar3Width =
          document.querySelector(".sc-visual .bar3").offsetWidth;
        const logoWidth = document.querySelector(
          ".sc-visual .bar3 .logo",
        ).offsetWidth;
        const percentage = (logoWidth / bar3Width) * 100;

        return -(((100 - percentage) * bar3Width) / 100);
      },
      xPercent: 50,
    },
    "<",
  );

function splitLinesInit() {
  const splitLines = new SplitType(".sc-overview .text-lines", {
    types: "lines",
  });

  $(".line").wrap('<div class="line-wrap">');
}
splitLinesInit();

document.querySelectorAll(".sc-overview  .line-wrap").forEach((element) => {
  const target = element.querySelector(".line");

  gsap.set(target, {
    yPercent: 100,
  });

  gsap.to(target, {
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      // markers: true,
    },
    yPercent: 0,
    duration: 1,
    ease: "power2.out",
  });
});

// data-motion="slideup"
// data-motion-parent="logo"

CustomEase.create("slowEnd", "M0,0 C0.3,0 0.5,1 1,1");

gsap.to(".slideup-img img", {
  clipPath: "inset(0% 0% 0% 0%)",
  duration: 1.2,
  ease: "circ.inOut",
  scrollTrigger: {
    trigger: ".sc-overview",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

//

const leftText = gsap.to(".sc-work .box", {
  paused: true,
});

const swapSpan = gsap
  .timeline({ paused: true })
  .to(
    ".sc-work .box span:first-child",
    {
      y: "-100%",
      clipPath: "inset(100% 0% 0% 0%)",
      ease: "power3.inOut",
      duration: 1.2,
    },
    0,
  )
  .to(
    ".sc-work .box span:last-child",
    {
      y: "0%",
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "power3.inOut",
      duration: 1.2,
    },
    0,
  );

const workTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-work",
    start: "0% 0%",
    end: "100% 200%",
    scrub: 0,
    // markers: true,
    onUpdate: function (self) {
      if (self.progress >= 0.5) {
        leftText.play();
        swapSpan.play();
      } else {
        leftText.reverse();
        swapSpan.reverse();
      }
    },
  },
});

workTl.to(
  ".sc-work  .sticky .grid .item:first-child",
  {
    "clip-path": "inset(-100% 0% 0% 0%)",
  },
  "<",
);
workTl
  .to(
    ".sc-work  .sticky .grid .item:last-child",
    {
      "clip-path": "inset(0% 0% 0% 0%)",
    },
    "<",
  )
  .to(
    ".sc-work  .sticky .grid .item:last-child img, .sc-work .sticky .grid .item:first-child img",
    {
      scale: 1.1,
    },
    "<",
  );

gsap.set("#header .logo,#header .service", {
  yPercent: 100,
  height: 0,
  overflow: "hidden",
  // opacity: 0,
});

gsap.to("#header .logo,#header .service", {
  scrollTrigger: {
    trigger: ".sc-visual",
    start: "bottom top ",
    // markers: true,
    onEnter: () => {
      gsap.to("#header .logo", {
        yPercent: 0,
        height: "auto",
        ease: "power3.inout",
      });
      gsap.to("#header .service", {
        yPercent: 0,
        height: "auto",
        ease: "power3.inout",
        delay: 0.2,
      });
    },
    onEnterBack: () => {
      gsap.to("#header .logo,#header .service", {
        yPercent: 100,
        overflow: "hidden",
        height: 0,
      });
    },
  },
});

// .sc-approach
const approachTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-approach",
    start: "top bottom",
    toggleActions: "play none none none",
  },
});

gsap.set(".sc-approach .title, .sc-approach .desc-wrap, .sc-approach .number", {
  yPercent: 50,
  opacity: 0,
});
gsap.set(".sc-approach .link", { yPercent: 50, opacity: 0 });

approachTl
  .to(".sc-approach .title, .sc-approach .desc-wrap, .sc-approach .number", {
    yPercent: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.inout",
  })
  .to(
    ".sc-approach .link",
    {
      yPercent: 0,
      opacity: 1,
      ease: "power3.inout",
    },
    "-=0.3",
  );
// sc-home-service

new SplitType(".sc-home-service .title ", { types: "lines" });
$(".sc-home-service .title .line").wrap('<div class="line-wrap">');
$(".sc-home-service .text-wrap p").wrap('<div class="p-wrap">');

gsap.set(
  ".sc-home-service .title .line, .sc-home-service .media-area .text-wrap p",
  {
    yPercent: 100,
  },
);
gsap.set(".sc-home-service .styled-underline", {
  yPercent: 100,
  opacity: 0,
});
gsap.set(
  ".sc-home-service .title .line, .sc-home-service .media-area .text-wrap p",
  { yPercent: 100 },
);
gsap.set(".sc-home-service .slideup-img img", {
  clipPath: "inset(100% 0% 0% 0%)",
});

const serviceTl = gsap.timeline({
  defaults: { ease: "power3.inOut" },
  scrollTrigger: {
    trigger: ".sc-home-service",
    start: "top 80%",
    toggleActions: "play none none none",
    // markers: true,
  },
});

serviceTl
  .to(
    ".sc-home-service .styled-underline",
    {
      duration: 1,
      yPercent: 0,
      opacity: 1,
    },
    "<",
  )
  .to(
    ".sc-home-service .title .line",
    {
      duration: 0.5,
      yPercent: 0,
      stagger: 0.1,
    },
    "<",
  )
  .to(
    ".sc-home-service .media-area .text-wrap p",
    {
      duration: 0.5,
      yPercent: 0,
      stagger: 0.1,
    },
    "<",
  )
  .to(
    ".sc-home-service .slideup-img img",
    {
      duration: 1.2,
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "circ.inOut",
    },
    "<",
  );

// sc-home-title

new SplitType(".sc-home-title .text ,.sc-home-title .number ", {
  types: "lines",
});
$(".sc-home-title .number .line").wrap('<div class="number-wrap">');

gsap.set(".sc-home-title .text .line,.sc-home-title .number .line ", {
  yPercent: 100,
});

gsap.to(".sc-home-title .text .line,.sc-home-title .number .line ", {
  scrollTrigger: {
    trigger: ".sc-home-title",
    start: "top 80%",
    toggleActions: "play none none none",
    // markers: true,
  },
  ease: "power3.inout",
  stagger: 0.1,
  yPercent: 0,
});

// sc-home-about

new SplitType(".sc-home-about .slideup ", { types: "lines" });
new SplitType(".sc-home-about .about-us ", { types: "lines" });
new SplitType(".sc-home-about .media-area .text-wrap ", { types: "lines" });
$(".sc-home-about .slideup .line").wrap('<div class="line-wrap">');
$(".sc-home-about .media-area .text-wrap  .line").wrap(
  '<div class="line-wrap">',
);

gsap.set(
  ".sc-home-about .slideup .line, .sc-home-about .about-us .line, .sc-home-about .media-area .text-wrap .line",
  {
    yPercent: 100,
  },
);
gsap.set(".sc-home-about .styled-underline", {
  yPercent: 100,
  opacity: 0,
});
gsap.set(".sc-home-about .styled-img-hover img", {
  clipPath: "inset(100% 0% 0% 0%)",
});

const aboutTl = gsap.timeline({
  defaults: { ease: "power3.inOut" },
  scrollTrigger: {
    trigger: ".sc-home-about",
    start: "top 80%",
    toggleActions: "play none none none",
    // markers: true,
  },
});

aboutTl
  .to(
    ".sc-home-about .styled-underline",
    {
      duration: 1,
      yPercent: 0,
      opacity: 1,
    },
    "<",
  )
  .to(
    ".sc-home-about .styled-img-hover img",
    {
      duration: 1.2,
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "circ.inOut",
    },
    "<",
  )
  .to(
    ".sc-home-about .slideup .line",
    {
      duration: 0.8,
      yPercent: 0,
      stagger: 0.1,
    },
    "<",
  )
  .to(
    ".sc-home-about .media-area .text-wrap .line",
    {
      duration: 0.8,
      yPercent: 0,
      stagger: 0.1,
    },
    "<",
  )
  .to(
    ".sc-home-about .about-us .line",
    {
      duration: 0.8,
      yPercent: 0,
      stagger: 0.1,
    },
    "<",
  );

// sc-work-together

new SplitType(".sc-work-together .logo path", { types: "chars" });
new SplitType(".sc-work-together .text-area > *", { types: "lines" });
$(".sc-work-together .text-area > * .line").wrap('<div class="line-wrap">');

gsap.set(".sc-work-together .logo path", {
  y: 100,
  clipPath: "inset(0% 0% 100% 0%)",
});
gsap.set(".sc-work-together .text-area .line", {
  y: 100,
});

const togetherTl = gsap.timeline({
  defaults: { ease: "power3.inOut" },
  scrollTrigger: {
    trigger: ".sc-work-together",
    start: "top 80%",
    toggleActions: "play none none none",
    // markers: true,
  },
});

togetherTl.to(
  ".sc-work-together .logo path",
  {
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    ease: "power1.inOut",
    duration: 0.7,
    stagger: -0.1,
  },
  "<",
);
togetherTl.to(
  ".sc-work-together .text-area .line",
  {
    y: 0,
    ease: "power1.inOut",
    duration: 0.7,
    stagger: 0.1,
  },
  "<",
);

// footer
const footerSplitTitles = new SplitType("#footer .list-wrap .title .text", {
  types: "lines",
});
const footerSplitItems = new SplitType("#footer .menu-list .text", {
  types: "lines",
});

$("#footer .list-wrap .title .text .line").wrap(
  '<span class="line-wrap"></span>',
);
$("#footer .menu-list .text .line").wrap('<span class="line-wrap"></span>');

gsap.set(
  "#footer .list-wrap .title .text .line, #footer .menu-list .text .line",
  { yPercent: 100 },
);
gsap.set(
  "#footer .list-wrap .title .text .line-wrap, #footer .menu-list .text .line-wrap",
  {
    overflow: "hidden",
    display: "inline-block",
  },
);

const footerTl = gsap.timeline({
  defaults: { ease: "power2.out" },
  scrollTrigger: {
    trigger: "#footer .top",
    start: "top 85%",
    toggleActions: "play none none none",
    // markers: true,
  },
});

footerTl.add("start");

footerTl.to(
  ".title .text .line",
  {
    duration: 0.55,
    yPercent: 0,
    stagger: 0.07,
  },
  "start",
);

$("#footer .menu-list").each(function () {
  footerTl.to(
    $(this).find(".text .line"),
    {
      duration: 0.55,
      yPercent: 0,
      stagger: 0.07,
    },
    "start",
  );
});

//
gsap.set(
  [
    "#footer .bottom .copyright",
    "#footer .bottom .legal-list ",
    "#footer .bottom .tool-wrap .btn-top",
    "#footer .bottom .tool-wrap .btn-bg-decorating",
  ],
  { y: 24, opacity: 0 },
);

const footerBottomTl = gsap.timeline({
  defaults: { ease: "power3.out", duration: 0.6 },
  scrollTrigger: {
    trigger: "#footer .bottom",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});

footerBottomTl.to(
  [
    "#footer .bottom .copyright",
    "#footer .bottom .legal-list ",
    "#footer .bottom .tool-wrap .btn-top",
    "#footer .bottom .tool-wrap .btn-bg-decorating",
  ],
  {
    y: 0,
    opacity: 1,
    stagger: 0.08,
  },
  0,
);


// 맨 위로 스크롤
const scrollToTopBtn = document.querySelector(".btn-top");
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", () => {
    gsap.to(scrollToTopBtn, {
      duration: 1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
    lenis.scrollTo(0, {
      duration: 1.6,
      easing: (t) => t * t,
    });
  });
}

// 이미지 마우스 따라다니기 효과
$(".styled-img-click").mousemove(function (e) {
  const xVal = e.offsetX - $(".styled-img-click").outerWidth() / 2;
  const yVal = e.offsetY - $(".styled-img-click").outerHeight() / 2;
  gsap.to(".styled-img-cursor", {
    x: xVal / 3,
    y: yVal / 3,
  });
});
// 이미지 마우스 따라다니기 효과2
$(".sc-work .sticky .col .item").mousemove(function (e) {
  const $this = $(this);
  const $cursor = $this.find(".cursor");
  const offset = $this.offset();

  // 마우스 절대 위치 - 박스 시작 위치 - 글씨 절반
  const xVal2 = e.pageX - offset.left - $cursor.outerWidth() / 2;
  const yVal2 = e.pageY - offset.top - $cursor.outerHeight() / 2;

  gsap.to($cursor, {
    x: xVal2,
    y: yVal2,
    duration: 0.5,
  });
});

// 마우스가 벗어났을 때
$(".sc-work .sticky .col .item").mouseleave(function () {
  gsap.to(".cursor", {
    x: 0,
    y: 0,
    duration: 0.5,
  });
});

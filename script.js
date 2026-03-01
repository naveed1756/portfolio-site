
gsap.registerPlugin(ScrollTrigger);
const texts = document.querySelectorAll(".cycle-text");
const sections = document.querySelectorAll("section");
const progressBar = document.querySelector(".nav-progress");
const navLinks = document.querySelectorAll(".nav-links a");
const navLinksContainer = document.querySelector(".nav-links");
const photoContainer = document.querySelector(".hero-photo");
const heroPhoto = document.querySelector(".hero-photo img");
const mobMenu = document.querySelector(".mobile-menu");
const hamburger = document.querySelector(".hamburger");
const mobMenuLinks = document.querySelectorAll(".mobile-menu a");
const switches = document.querySelectorAll(".switch");
const aboutMeContent = document.querySelector(".about-track .content");
const aboutMeContentParas = document.querySelectorAll(".about-track .content .content-para");


const cycleTextTL = gsap.timeline({ repeat: -1, repeatDelay: 2.5 }).call(() => {
    const active = document.querySelector(".cycle-text.active");
    const next = active.nextElementSibling || texts[0];
    active.classList.remove("active");
    next.classList.add("active");
});

function setActive(activeLink) {
    navLinks.forEach(link => link.classList.remove("active"));
    activeLink.classList.add("active");
}

function clearActive(link) {
    link.classList.remove("active");
}

function onPageEnd() {
    gsap.to(".nav-links .underline", {
        scaleX: 1,
        duration: 0.25,
        overwrite: "auto",
        ease: "power1.out"
    });
    setActive(navLinks[navLinks.length - 1]);
}

function releaseBars() {
    ScrollTrigger.refresh();
}

navLinks.forEach((link, index) => {
  const targetId = link.getAttribute("href");
  const section = document.querySelector(targetId);
  const underline = link.querySelector(".underline");
  const isLast = index === navLinks.length - 1;
  gsap.fromTo(
    underline,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: isLast ? "bottom bottom-=1" : "bottom center",
        onEnter: () => setActive(link),
        onEnterBack: () => setActive(link),
        onLeave: () => clearActive(link),
        onLeaveBack: () => clearActive(link),
        scrub: true
      }
    }
  );
});

ScrollTrigger.create({
  trigger: ".navbar",
  start: "bottom top",
  onEnter: () => {
    navLinksContainer.classList.add("floating");
  },
  onLeaveBack: () => {
    navLinksContainer.classList.remove("floating");
  }
});

ScrollTrigger.create({
    trigger: "#page-end",
    start: "top bottom",
    onEnter: onPageEnd,
    onLeaveBack: releaseBars
});

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute('href'));

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

gsap.to(".cube", {
  rotateY: 360,
  rotateX: 360,
  duration: 8,
  ease: "none",
  repeat: -1
});


photoContainer.addEventListener("mousemove", (e) => {
  const rect = photoContainer.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const nx = (x / rect.width) - 0.5;
  const ny = (y / rect.height) - 0.5;

  gsap.to(heroPhoto, {
    x: nx * 20,
    y: ny * 20,
    rotateY: nx * 16,
    rotateX: -ny * 16,
    duration: 1,
    ease: "power3.out"
  });
});

photoContainer.addEventListener("mouseleave", () => {
  gsap.to(heroPhoto, {
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    duration: 1,
    ease: "power3.out"
  });
});

const mobMenuOpenTL = gsap.timeline({ paused: true });

mobMenuOpenTL.to(mobMenu, {
  x: 0,
  duration: 0.6,
  ease: "power3.out",
  onStart: () => {
    mobMenu.style.pointerEvents = "auto";
  }
})
.from(
  ".mobile-menu a",
  {
    x: 30,
    opacity: 0,
    stagger: 0.08,
    duration: 0.4,
    ease: "power3.out"
  },
  "-=0.3"
);

const burgerAnimateTL = gsap.timeline({ paused: true });

burgerAnimateTL
  .to(".line.top", {
    y: 8,
    rotate: 45,
    duration: 0.3,
    ease: "power3.inOut"
  }, 0)
  .to(".line.middle", {
    opacity: 0,
    duration: 0.2,
    ease: "power3.out"
  }, 0)
  .to(".line.bottom", {
    y: -8,
    rotate: -45,
    duration: 0.3,
    ease: "power3.inOut"
  }, 0);

let isMobMenuOpen = false;

hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isMobMenuOpen) {
        mobMenuOpenTL.play();
        burgerAnimateTL.play();
    }
    else {
        mobMenuOpenTL.reverse();
        burgerAnimateTL.reverse();
        mobMenu.style.pointerEvents = "none";
    }
    isMobMenuOpen = !isMobMenuOpen;
});

mobMenuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        mobMenuOpenTL.reverse();
        burgerAnimateTL.reverse();
        isMobMenuOpen = false;
        mobMenu.style.pointerEvents = "none";
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    });
});

let activeSwitch = 0;

switches.forEach((sw, i) => {
    sw.addEventListener("click", (e) => {
        if (i === activeSwitch) return;
        switches[activeSwitch].classList.remove("active");
        aboutMeContentParas[activeSwitch].classList.remove("active");
        sw.classList.add("active");
        aboutMeContentParas[i].classList.add("active");
        activeSwitch = i;
        const tl = gsap.timeline();
        tl.from(aboutMeContentParas[i], {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power3.out"
        });
    });
});

gsap.to(".construction-icon", {
  rotate: 10,
  duration: 1,
  yoyo: true,
  repeat: -1,
  ease: "power1.inOut"
});



lucide.createIcons();
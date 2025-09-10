// -------- Slideshow --------
let slideIndex = 1;
function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("demo");

  if (slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");

  slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
}
function plusSlides(n) { showSlides(slideIndex += n); }
function currentSlide(n) { showSlides(slideIndex = n); }

// expose for inline onclick=""
window.plusSlides = plusSlides;
window.currentSlide = currentSlide;

// Run slideshow after DOM is ready (or include `defer` on the script tag)
document.addEventListener("DOMContentLoaded", () => {
  showSlides(slideIndex);
});

// -------- Counters (trigger on scroll, once) --------
function animateValue(el, end, duration = 1000) {
  const start = 0;
  const startTime = performance.now();

  function frame(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(start + (end - start) * eased);
    el.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

document.addEventListener("DOMContentLoaded", () => {
  // Support either #about-china or .about-china (depending on your markup)
  const aboutSection = document.querySelector("#about-china, .about-china");
  if (!aboutSection) return;

  const counters = aboutSection.querySelectorAll(".num");
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        counters.forEach(el => {
          // Avoid re-running if already finished
          if (el.dataset.done === "1") return;

          const endValue = parseInt(el.getAttribute("data-val"), 10) || 0;
          const duration = parseInt(el.getAttribute("data-duration"), 10) || 10000; // default 1s
          animateValue(el, endValue, duration);
          el.dataset.done = "1";
        });

        // Trigger only once
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.35 } // start when ~35% of the section is visible
  );

  observer.observe(aboutSection);
});






document.querySelectorAll('.nav-bar a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;

    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  });
});

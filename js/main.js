/* ─── Mobile Menu ARIA ─── */
(function () {
  var toggle = document.querySelector('.mobile-toggle');
  if (!toggle) return;
  var nav = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
})();

/* ─── Gallery Carousel ─── */
(function () {
  var slides = document.querySelectorAll('.gallery-slide');
  if (!slides.length) return;
  var caption = document.getElementById('galleryCaption');
  var dotsWrap = document.getElementById('galleryDots');
  var carousel = document.getElementById('galleryCarousel');
  var cur = 0;

  slides.forEach(function (slide, i) {
    var d = document.createElement('button');
    d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    d.addEventListener('click', function () { go(i); });
    dotsWrap.appendChild(d);
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-label', 'Slide ' + (i + 1) + ' of ' + slides.length + ': ' + slide.dataset.title);
  });

  var dots = dotsWrap.querySelectorAll('.gallery-dot');
  caption.setAttribute('aria-live', 'polite');

  function go(n) {
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur].classList.add('active');
    caption.textContent = slides[cur].dataset.title;
  }

  document.querySelector('.gallery-nav.prev').addEventListener('click', function () { go(cur - 1); });
  document.querySelector('.gallery-nav.next').addEventListener('click', function () { go(cur + 1); });

  /* Keyboard navigation */
  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { go(cur - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { go(cur + 1); e.preventDefault(); }
  });

  /* Touch/swipe */
  var tx = 0;
  carousel.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', function (e) {
    var diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(cur + (diff > 0 ? 1 : -1));
  }, { passive: true });
})();

/* ─── Photo Upload ─── */
var uploadedFiles = [];
function handlePhotos(files) {
  var preview = document.getElementById('photoPreview');
  var maxFiles = 5, maxSize = 5 * 1024 * 1024;
  Array.from(files).forEach(function (file) {
    if (uploadedFiles.length >= maxFiles) return;
    if (file.size > maxSize) { alert(file.name + ' exceeds 5MB limit.'); return; }
    if (!file.type.startsWith('image/')) { alert(file.name + ' is not an image.'); return; }
    uploadedFiles.push(file);
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'photo-thumb';
      img.alt = file.name;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

/* ─── Form Submit ─── */
function handleSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var btn = form.querySelector('.submit-btn');
  var orig = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  var data = new FormData(form);
  /* Append uploaded photos */
  uploadedFiles.forEach(function (file) { data.append('photos', file); });

  fetch('https://formsubmit.co/ajax/Firstcall239@gmail.com', {
    method: 'POST',
    body: data
  })
  .then(function (res) { return res.json(); })
  .then(function () {
    btn.textContent = 'Estimate Requested!';
    btn.style.background = '#22c55e';
    setTimeout(function () {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
      document.getElementById('photoPreview').replaceChildren();
      uploadedFiles = [];
    }, 3000);
  })
  .catch(function () {
    btn.textContent = 'Error — Please Call Us';
    btn.style.background = '#ef4444';
    setTimeout(function () {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  });
}

/* ─── FAQ Accordion ─── */
document.querySelectorAll('.faq-q').forEach(function (q) {
  q.setAttribute('role', 'button');
  q.setAttribute('tabindex', '0');
  q.setAttribute('aria-expanded', 'false');
  var answer = q.nextElementSibling;
  if (answer) {
    var id = 'faq-' + Math.random().toString(36).substr(2, 6);
    answer.id = id;
    q.setAttribute('aria-controls', id);
  }
  function toggle() {
    var open = q.parentElement.classList.toggle('open');
    q.setAttribute('aria-expanded', open);
  }
  q.addEventListener('click', toggle);
  q.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});

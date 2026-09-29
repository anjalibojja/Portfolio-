import './style.css'

/* ============================================
   Portfolio — Bojja Anjali
   Interactivity & Animation
   ============================================ */

/* ---- Navigation: mobile toggle ---- */
const navToggle = document.getElementById('navToggle')
const navMenu = document.getElementById('navMenu')
const navLinks = document.querySelectorAll('.nav-link')

function closeMenu() {
  navMenu.classList.remove('open')
  navToggle.classList.remove('open')
  navToggle.setAttribute('aria-expanded', 'false')
}

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open')
  navToggle.classList.toggle('open', isOpen)
  navToggle.setAttribute('aria-expanded', String(isOpen))
})

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu)
})

document.addEventListener('click', (e) => {
  if (
    navMenu.classList.contains('open') &&
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    closeMenu()
  }
})

/* ---- Navigation: scrolled state ---- */
const navbar = document.getElementById('navbar')

function updateNavScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
}

window.addEventListener('scroll', updateNavScroll, { passive: true })
updateNavScroll()

/* ---- Navigation: active section tracking ---- */
const sections = document.querySelectorAll('section[id]')

function updateActiveLink() {
  const scrollPos = window.scrollY + 100
  sections.forEach((section) => {
    const top = section.offsetTop
    const height = section.offsetHeight
    const id = section.getAttribute('id')
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active')
        }
      })
    }
  })
}

window.addEventListener('scroll', updateActiveLink, { passive: true })

/* ---- Scroll reveal ---- */
const revealElements = document.querySelectorAll('.reveal')

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10)
        setTimeout(() => entry.target.classList.add('visible'), delay)
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
)

revealElements.forEach((el) => revealObserver.observe(el))

/* ---- Animated stat counters ---- */
const statNums = document.querySelectorAll('.about-stat-num')

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const el = entry.target
      const target = parseInt(el.dataset.count || '0', 10)
      const duration = 1200
      const startTime = performance.now()

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.round(eased * target).toString()
        if (progress < 1) {
          requestAnimationFrame(tick)
        }
      }

      requestAnimationFrame(tick)
      counterObserver.unobserve(el)
    })
  },
  { threshold: 0.5 }
)

statNums.forEach((el) => counterObserver.observe(el))

/* ---- Resume button feedback ---- */
const resumeBtn = document.getElementById('resumeBtn')
const resumeNote = document.getElementById('resumeNote')

if (resumeBtn) {
  resumeBtn.addEventListener('click', (e) => {
    const href = resumeBtn.getAttribute('href')
    if (!href || href === '#') {
      e.preventDefault()
      if (resumeNote) resumeNote.hidden = false
    }
  })
}

/* ---- Contact form validation ---- */
const contactForm = document.getElementById('contactForm')
const formSuccess = document.getElementById('formSuccess')
const formError = document.getElementById('formError')

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    formSuccess.hidden = true
    formError.hidden = true

    const name = contactForm.elements['name']
    const email = contactForm.elements['email']
    const message = contactForm.elements['message']

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid =
      name.value.trim().length >= 2 &&
      emailRegex.test(email.value.trim()) &&
      message.value.trim().length >= 5

    if (!isValid) {
      formError.hidden = false
      return
    }

    formSuccess.hidden = false
    contactForm.reset()

    setTimeout(() => {
      formSuccess.hidden = true
    }, 5000)
  })
}

/* ---- Footer year ---- */
const yearEl = document.getElementById('year')
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear())
}

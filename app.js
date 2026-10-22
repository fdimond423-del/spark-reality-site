/* ═══════════════════════════════════════════════════════════════════
   SPARK REALITY — ARCHITECTURAL INTERACTION & MOTION ENGINE
   60 FPS Animations, Locality Explorer, EMI Calculator, Video Modal
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ─── 1. AMBIENT PARTICLES CONSTELLATION ───
function initAmbientParticles() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = Math.min(Math.floor(width / 24), 55);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  let mouse = { x: null, y: null, radius: 120 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse gentle repel
      if (mouse.x !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(152, 240, 20, ${p.alpha})`;
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(152, 240, 20, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// ─── 2. STICKY NAVBAR & MOBILE DRAWER ───
function initNav() {
  const header = document.querySelector('.nav-header');
  const toggleBtn = document.getElementById('navToggleBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const overlay = document.getElementById('mobileNavOverlay');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  const toggleDrawer = () => {
    drawer?.classList.toggle('open');
    overlay?.classList.toggle('open');
    document.body.style.overflow = drawer?.classList.contains('open') ? 'hidden' : '';
  };

  toggleBtn?.addEventListener('click', toggleDrawer);
  overlay?.addEventListener('click', toggleDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', toggleDrawer));
}

// ─── 3. 3D CARD TILT ───
function init3DTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

// ─── 4. AHMEDABAD PRIME NEIGHBORHOODS DATA & SWITCHER ───
const LOCALITIES_DATA = {
  makarba: {
    tag: 'Corporate & Executive Living',
    name: 'Makarba',
    desc: 'Home to premier corporate addresses like KP Epitome and prominent educational institutions like DAV International School. Makarba delivers an enviable blend of cosmopolitan convenience, calm greenery, and rapid capital appreciation.',
    avgPrice: '₹6,800',
    growth: '+14.2%',
    metro: '10 Mins Drive',
    airport: '25 Mins (Direct Ring Road)',
    landmarks: ['KP Epitome', 'DAV International School', 'Makarba Lake', 'YMCA International Club'],
    image: 'images/residential-exterior.jpg',
    badge: 'Spark Reality HQ Locality'
  },
  sghighway: {
    tag: 'The Golden Commercial Artery',
    name: 'SG Highway',
    desc: 'The beating financial heart of Ahmedabad connecting the city to Gandhinagar. Lined with corporate headquarters, luxury car dealerships, five-star hospitality, and marquee residential towers offering unparalleled prestige.',
    avgPrice: '₹8,500',
    growth: '+16.8%',
    metro: 'Phase 2 Operational',
    airport: '22 Mins via SG Highway',
    landmarks: ['Iscon Mega Mall', 'Zydus Hospital', 'The Grand Bhagwati', 'Gota Flyover Corridor'],
    image: 'images/commercial-space.jpg',
    badge: 'Highest Commercial Demand'
  },
  giftcity: {
    tag: 'Global Financial Hub & Tri-City Hub',
    name: 'GIFT City',
    desc: 'India’s first operational smart city and International Financial Services Centre (IFSC). Unrivaled multi-national banking presence, walk-to-work culture, high rental yields (7-9%), and futuristic automated infrastructure.',
    avgPrice: '₹9,200',
    growth: '+22.5%',
    metro: 'Direct Station Access',
    airport: '15 Mins Express Drive',
    landmarks: ['GIFT Diamond Tower', 'FinTech Park', 'Grand Mercure', 'International Club & Academy'],
    image: 'images/ahmedabad-home_2.jpg',
    badge: 'Top NRI & Investor Choice'
  },
  prahladnagar: {
    tag: 'Prestigious Cosmopolitan Hub',
    name: 'Prahlad Nagar',
    desc: 'Ahmedabad’s most established affluent enclave, celebrated for high-end dining, pristine garden parks, premier retail avenues, and coveted luxury high-rise residences favored by seasoned business leaders.',
    avgPrice: '₹9,800',
    growth: '+11.4%',
    metro: 'APMC Station (8 Mins)',
    airport: '30 Mins',
    landmarks: ['Prahladnagar Garden', 'Corporate Road', 'Venus Atlantis', 'Titanium City Centre'],
    image: 'images/residential-interior.jpg',
    badge: 'Established Luxury Enclave'
  },
  bodakdev: {
    tag: 'Billionaire Row & Haute Living',
    name: 'Bodakdev & SBR',
    desc: 'Sindhu Bhavan Road (SBR) and Bodakdev represent the pinnacle of architectural grandeur in Ahmedabad. Ultra-luxury penthouses, private boutique bungalows, Michelin-grade dining, and high-fashion ateliers.',
    avgPrice: '₹12,500',
    growth: '+18.1%',
    metro: 'Thaltej Station (5 Mins)',
    airport: '28 Mins',
    landmarks: ['Sindhu Bhavan Road', 'Taj Skyline', 'Rajpath Club', 'Judges Bungalow Road'],
    image: 'images/ahmedabad-home.jpg',
    badge: 'Bespoke Ultra-Luxury'
  },
  southbopal: {
    tag: 'Modern Family Sanctum & Growth Hub',
    name: 'South Bopal (SoBo)',
    desc: 'The vibrant epicenter of contemporary family living with wide boulevards, elite ICSE/CBSE academies, and state-of-the-art clubhouses. High lifestyle quotient paired with compelling entry prices for young professionals.',
    avgPrice: '₹5,600',
    growth: '+15.3%',
    metro: 'Bopal Metro Link (Upcoming)',
    airport: '35 Mins via SP Ring Road',
    landmarks: ['South Bopal Commercial Hub', 'DPS Bopal', 'TRP Mall', 'Aarohi Club Area'],
    image: 'images/commercial-space_2.jpg',
    badge: 'High Value Appreciation'
  }
};

function initLocalitySwitcher() {
  const tabBtns = document.querySelectorAll('.locality-tab-btn');
  const nameEl = document.getElementById('locName');
  const tagEl = document.getElementById('locTag');
  const descEl = document.getElementById('locDesc');
  const priceEl = document.getElementById('locPrice');
  const growthEl = document.getElementById('locGrowth');
  const metroEl = document.getElementById('locMetro');
  const airportEl = document.getElementById('locAirport');
  const landmarksEl = document.getElementById('locLandmarks');
  const imgEl = document.getElementById('locImg');
  const badgeEl = document.getElementById('locBadge');

  if (!tabBtns.length) return;

  function setLocality(key) {
    const data = LOCALITIES_DATA[key];
    if (!data) return;

    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.loc === key);
    });

    if (nameEl) nameEl.textContent = data.name;
    if (tagEl) tagEl.textContent = data.tag;
    if (descEl) descEl.textContent = data.desc;
    if (priceEl) priceEl.textContent = data.avgPrice;
    if (growthEl) growthEl.textContent = data.growth;
    if (metroEl) metroEl.textContent = data.metro;
    if (airportEl) airportEl.textContent = data.airport;
    if (imgEl) imgEl.src = data.image;
    if (badgeEl) badgeEl.textContent = data.badge;

    if (landmarksEl) {
      landmarksEl.innerHTML = data.landmarks
        .map(item => `<span class="locality-landmark-chip">📍 ${item}</span>`)
        .join('');
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setLocality(btn.dataset.loc);
    });
  });

  // Init with default
  setLocality('makarba');
}

// ─── 5. PROPERTY SHOWCASE CATEGORY FILTER ───
function initPropertyFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.property-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      propertyCards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ─── 6. REAL ESTATE EMI & CAPITAL GROWTH CALCULATOR ───
function initCalculator() {
  const propValInput = document.getElementById('calcPropVal');
  const downPayInput = document.getElementById('calcDownPay');
  const tenureInput = document.getElementById('calcTenure');
  const rateInput = document.getElementById('calcRate');

  const propValBadge = document.getElementById('badgePropVal');
  const downPayBadge = document.getElementById('badgeDownPay');
  const tenureBadge = document.getElementById('badgeTenure');
  const rateBadge = document.getElementById('badgeRate');

  const monthlyEmiEl = document.getElementById('resMonthlyEmi');
  const loanAmountEl = document.getElementById('resLoanAmount');
  const downAmountEl = document.getElementById('resDownAmount');
  const totalInterestEl = document.getElementById('resTotalInterest');
  const capitalApprecEl = document.getElementById('resCapitalApprec');

  if (!propValInput) return;

  function formatLakhs(val) {
    if (val >= 100) {
      return `₹${(val / 100).toFixed(2)} Cr`;
    }
    return `₹${val} Lakhs`;
  }

  function calculate() {
    const totalValLakhs = parseFloat(propValInput.value);
    const downPercent = parseFloat(downPayInput.value);
    const tenureYears = parseFloat(tenureInput.value);
    const annualRate = parseFloat(rateInput.value);

    // Update Badges
    propValBadge.textContent = formatLakhs(totalValLakhs);
    downPayBadge.textContent = `${downPercent}% (₹${((totalValLakhs * downPercent) / 100).toFixed(1)}L)`;
    tenureBadge.textContent = `${tenureYears} Years`;
    rateBadge.textContent = `${annualRate.toFixed(1)}% p.a.`;

    // Principal in Rupees
    const totalRupees = totalValLakhs * 100000;
    const downPaymentRupees = (totalRupees * downPercent) / 100;
    const principal = totalRupees - downPaymentRupees;

    // Monthly EMI formula
    const monthlyRate = annualRate / 12 / 100;
    const months = tenureYears * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    // 5-Year Ahmedabad Historical Capital Appreciation (Estimated 8.5% CAGR)
    const futureVal = totalRupees * Math.pow(1 + 0.085, 5);
    const appreciationGain = futureVal - totalRupees;

    // Render results
    monthlyEmiEl.textContent = `₹${Math.round(emi).toLocaleString('en-IN')}`;
    loanAmountEl.textContent = `₹${(principal / 100000).toFixed(2)} Lakhs`;
    downAmountEl.textContent = `₹${(downPaymentRupees / 100000).toFixed(2)} Lakhs`;
    totalInterestEl.textContent = `₹${(totalInterest / 100000).toFixed(2)} Lakhs`;
    capitalApprecEl.textContent = `+ ₹${(appreciationGain / 100000).toFixed(1)} L (+48%)`;
  }

  [propValInput, downPayInput, tenureInput, rateInput].forEach(inp => {
    inp.addEventListener('input', calculate);
  });

  calculate();
}

// ─── 7. ANIMATED STAT COUNTERS ───
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const isDecimal = el.dataset.decimal === 'true';
        const duration = 1800;
        const start = performance.now();

        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = isDecimal 
            ? (target * easeOut).toFixed(1)
            : Math.floor(target * easeOut).toLocaleString('en-IN');

          el.textContent = `${prefix}${current}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

// ─── 8. VIDEO MODAL ENGINE ───
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('videoModalClose');
  const videoPlayer = document.getElementById('heroVideoPlayer');
  const openBtns = document.querySelectorAll('[data-open-video]');

  if (!modal || !videoPlayer) return;

  const openVideo = () => {
    modal.classList.add('open');
    videoPlayer.currentTime = 0;
    videoPlayer.play().catch(() => {});
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    modal.classList.remove('open');
    videoPlayer.pause();
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openVideo();
  }));

  closeBtn?.addEventListener('click', closeVideo);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeVideo();
    }
  });
}

// ─── 9. WHATSAPP & VIP CONSULTATION FORM HANDLER ───
function initContactForms() {
  const form = document.getElementById('vipInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName')?.value || 'Prospective Buyer';
    const phone = document.getElementById('clientPhone')?.value || '';
    const locality = document.getElementById('clientLocality')?.value || 'Ahmedabad Prime';
    const propType = document.getElementById('clientPropertyType')?.value || 'Residential Luxury';
    const budget = document.getElementById('clientBudget')?.value || 'Flexible';
    const notes = document.getElementById('clientNotes')?.value || 'I would like a private consultation.';

    // Construct structured WhatsApp message for Yash / Spark Reality (+91 93137 02720)
    const text = `*New Real Estate Inquiry — Spark Reality*\n\n` +
                 `👤 *Client Name:* ${name}\n` +
                 `📞 *Phone Number:* ${phone}\n` +
                 `📍 *Preferred Locality:* ${locality}\n` +
                 `🏛 *Property Type:* ${propType}\n` +
                 `💰 *Estimated Budget:* ${budget}\n` +
                 `📝 *Details:* ${notes}\n\n` +
                 `_Sent via Spark Reality Official Web Portal_`;

    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919313702720?text=${encoded}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Also trigger email backup mailto
    const mailSubject = encodeURIComponent(`Spark Reality VIP Consultation Request - ${name}`);
    const mailBody = encodeURIComponent(`Client Name: ${name}\nPhone: ${phone}\nLocality: ${locality}\nProperty Type: ${propType}\nBudget: ${budget}\nNotes: ${notes}`);
    
    // Provide user instant visual confirmation
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const origHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `✓ WhatsApp Consultation Initiated!`;
      submitBtn.style.background = '#25D366';
      submitBtn.style.color = '#fff';
      setTimeout(() => {
        submitBtn.innerHTML = origHtml;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 4000);
    }
  });
}

// ─── 10. BACK TO TOP BUTTON ───
function initBackToTop() {
  const btt = document.getElementById('backToTopBtn');
  if (!btt) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  }, { passive: true });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── DOM READY INITIALIZATION ───
document.addEventListener('DOMContentLoaded', () => {
  initAmbientParticles();
  initNav();
  init3DTilt();
  initLocalitySwitcher();
  initPropertyFilters();
  initCalculator();
  initCounters();
  initVideoModal();
  initContactForms();
  initBackToTop();
});

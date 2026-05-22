// ===== Interactive Footer Scripts =====

(function () {
  'use strict';

  // --- Live Clock ---
  function updateClock() {
    var clockEl = document.getElementById('footer-live-clock');
    if (!clockEl) return;
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    var timeStr = pad(h) + ':' + pad(m) + ':' + pad(s) + ' ' + ampm;
    clockEl.textContent = timeStr;
  }

  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  setInterval(updateClock, 1000);
  updateClock();

  // --- Coffee Reaction Button ---
  var coffeeBtn = document.getElementById('coffee-react-btn');
  var countEl = document.getElementById('coffee-react-count');

  if (coffeeBtn && countEl) {
    // Load persisted count
    var count = parseInt(localStorage.getItem('koppee_coffee_count') || '42', 10);
    countEl.textContent = count;

    coffeeBtn.addEventListener('click', function (e) {
      count++;
      countEl.textContent = count;
      localStorage.setItem('koppee_coffee_count', count);

      // Burst flying coffee emojis
      var emojis = ['☕', '🫘', '✨', '💛', '☕'];
      for (var i = 0; i < 5; i++) {
        spawnFlyingEmoji(e.clientX, e.clientY, emojis[i], i * 80);
      }
    });
  }

  function spawnFlyingEmoji(x, y, emoji, delay) {
    setTimeout(function () {
      var el = document.createElement('span');
      el.className = 'flying-coffee';
      el.textContent = emoji;
      el.style.left = (x + (Math.random() * 60 - 30)) + 'px';
      el.style.top = y + 'px';
      document.body.appendChild(el);
      setTimeout(function () {
        el.remove();
      }, 1200);
    }, delay);
  }

  // --- Fun Fact Ticker ---
  var facts = [
    '☕ Coffee is the 2nd most traded commodity on Earth!',
    '🌍 Over 2.25 billion cups of coffee are consumed daily worldwide.',
    '🫘 A coffee bean is actually a seed from a cherry-like fruit.',
    '🇪🇹 Coffee was discovered in Ethiopia by a goat herder!',
    '⏰ The word "cappuccino" comes from Capuchin friars.',
    '🧊 Cold brew takes 12-24 hours to prepare.',
    '💰 The most expensive coffee costs over $600 per pound!',
    '🌱 A coffee tree takes 3-5 years to produce its first crop.',
    '🎵 Bach composed a "Coffee Cantata" in 1735.',
    '🐝 Coffee flowers smell like jasmine and attract bees.'
  ];

  var factIdx = Math.floor(Math.random() * facts.length);
  var factContent = document.getElementById('footer-fun-fact');

  if (factContent) {
    factContent.textContent = facts[factIdx];

    var factContainer = factContent.parentElement;
    if (factContainer) {
      factContainer.addEventListener('click', function () {
        // Fade out
        factContent.style.opacity = '0';
        setTimeout(function () {
          factIdx = (factIdx + 1) % facts.length;
          factContent.textContent = facts[factIdx];
          factContent.style.opacity = '1';
        }, 400);
      });
    }
  }

  // --- Steam Particles ---
  var steamContainer = document.getElementById('footer-steam');
  if (steamContainer) {
    for (var i = 0; i < 15; i++) {
      var particle = document.createElement('div');
      particle.className = 'steam-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 3 + 's';
      particle.style.animationDuration = (2 + Math.random() * 2) + 's';
      steamContainer.appendChild(particle);
    }
  }

  // --- Simulated Online Visitors ---
  var visitorEl = document.getElementById('footer-visitor-count');
  if (visitorEl) {
    var base = 12 + Math.floor(Math.random() * 8);
    visitorEl.textContent = base + ' coffee lovers online';

    setInterval(function () {
      var delta = Math.random() > 0.5 ? 1 : -1;
      base = Math.max(5, Math.min(30, base + delta));
      visitorEl.textContent = base + ' coffee lovers online';
    }, 5000);
  }

})();

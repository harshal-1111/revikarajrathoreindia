(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var isHome = document.body.dataset.page === 'home';
  var header = $('#site-header');

  /* ---------- Enquiry count (kept for the browsing session) ---------- */
  function readCount() {
    try { return parseInt(sessionStorage.getItem('rri-enquiries') || sessionStorage.getItem('atelier-enquiries'), 10) || 0; } catch (e) { return 0; }
  }
  function writeCount(n) {
    try { sessionStorage.setItem('rri-enquiries', String(n)); } catch (e) { /* storage unavailable */ }
    $$('[data-enquiry-count]').forEach(function (el) { el.textContent = n; });
  }
  writeCount(readCount());

  /* ---------- Desktop mega menus ---------- */
  var megas = $$('[data-mega]');
  var openMenu = null;
  function setMenu(key) {
    openMenu = key;
    megas.forEach(function (m) { m.hidden = m.dataset.mega !== key; });
    if (header) header.classList.toggle('has-mega-open', !!key);
  }
  $$('[data-menu]').forEach(function (a) {
    a.addEventListener('mouseenter', function () { setMenu(a.dataset.menu); });
    a.addEventListener('click', function (e) {
      e.preventDefault();
      setMenu(openMenu === a.dataset.menu ? null : a.dataset.menu);
    });
  });
  $$('[data-menu-close]').forEach(function (a) {
    a.addEventListener('mouseenter', function () { setMenu(null); });
  });
  header.addEventListener('mouseleave', function () { if (openMenu) setMenu(null); });

  /* ---------- Mobile drawer ---------- */
  var drawer = $('#drawer');
  function setDrawer(open) {
    drawer.hidden = !open;
    document.body.classList.toggle('no-scroll', open);
  }
  $$('[data-drawer-open]').forEach(function (b) { b.addEventListener('click', function () { setDrawer(true); }); });
  $$('[data-drawer-close]').forEach(function (b) { b.addEventListener('click', function () { setDrawer(false); }); });
  $$('[data-drawer-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var sec = b.parentElement;
      var willOpen = !sec.classList.contains('open');
      $$('.drawer-sec').forEach(function (s) {
        s.classList.remove('open');
        $('.sign', s).textContent = '+';
      });
      if (willOpen) {
        sec.classList.add('open');
        $('.sign', sec).textContent = '−';
      }
    });
  });

  var mq = window.matchMedia('(max-width: 1099px)');
  function onBreakpoint() {
    setMenu(null);
    if (!mq.matches) setDrawer(false);
  }
  if (mq.addEventListener) mq.addEventListener('change', onBreakpoint); else mq.addListener(onBreakpoint);

  /* ---------- Header height (sizes the home film) and scrolled state ---------- */
  function setHeaderHeight() {
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Lock the preview again ---------- */
  $$('[data-gate-lock]').forEach(function (b) {
    b.addEventListener('click', function () {
      try { localStorage.removeItem((window.RRI_GATE || {}).key || 'rri-preview'); } catch (e) { /* storage unavailable */ }
      location.href = 'index.html';
    });
  });

  /* ---------- Scroll to consultation ---------- */
  function scrollToConsult() {
    var el = $('#consultation');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 10, behavior: 'smooth' });
  }
  $$('[data-scroll-consult]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      setMenu(null);
      setDrawer(false);
      if (isHome) {
        e.preventDefault();
        setTimeout(scrollToConsult, 30);
      }
    });
  });

  /* ---------- Category index hover preview ---------- */
  var catRows = $$('[data-cat-list] .cat-row');
  var catPanes = $$('[data-cat-preview] > div');
  catRows.forEach(function (row, i) {
    row.addEventListener('mouseenter', function () {
      catRows.forEach(function (r, j) { r.classList.toggle('on', i === j); });
      catPanes.forEach(function (p, j) { p.classList.toggle('on', i === j); });
    });
  });

  /* ---------- Appointment / enquiry forms ---------- */
  var codes = ['+91', '+1', '+44', '+971', '+65', '+61', '+974', '+966'];
  $$('[data-codes]').forEach(function (sel) {
    codes.forEach(function (c) { sel.add(new Option(c, c)); });
  });

  /* Modern & Compact Date & Time Picker */
  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function initPicker(form) {
    var datePicker = $('[data-picker="date"]', form);
    var timePicker = $('[data-picker="time"]', form);
    if (!datePicker || !timePicker) return;

    var dateTrigger = $('[data-picker-trigger="date"]', datePicker);
    var dateInput = $('[data-picker-input="date"]', datePicker);
    var dateLabel = $('[data-picker-label="date"]', datePicker);
    var calPopover = $('[data-picker-popover="date"]', datePicker);
    var calMonth = $('[data-cal-month]', calPopover);
    var calDays = $('[data-cal-days]', calPopover);
    var calPrev = $('[data-cal-prev]', calPopover);
    var calNext = $('[data-cal-next]', calPopover);

    var timeTrigger = $('[data-picker-trigger="time"]', timePicker);
    var timeInput = $('[data-picker-input="time"]', timePicker);
    var timeLabel = $('[data-picker-label="time"]', timePicker);
    var timePopover = $('[data-picker-popover="time"]', timePicker);
    var timePills = $$('.time-pill', timePopover);

    var now = new Date();
    var viewYear = now.getFullYear();
    var viewMonth = now.getMonth();
    var selectedDate = null;

    function closeAll() {
      calPopover.hidden = true;
      timePopover.hidden = true;
      datePicker.classList.remove('open');
      timePicker.classList.remove('open');
      dateTrigger.setAttribute('aria-expanded', 'false');
      timeTrigger.setAttribute('aria-expanded', 'false');
    }

    function toggleDate() {
      var isOpen = !calPopover.hidden;
      closeAll();
      if (!isOpen) {
        calPopover.hidden = false;
        datePicker.classList.add('open');
        dateTrigger.setAttribute('aria-expanded', 'true');
        dateTrigger.classList.remove('picker-error');
        renderCalendar();
      }
    }

    function toggleTime() {
      var isOpen = !timePopover.hidden;
      closeAll();
      if (!isOpen) {
        timePopover.hidden = false;
        timePicker.classList.add('open');
        timeTrigger.setAttribute('aria-expanded', 'true');
        timeTrigger.classList.remove('picker-error');
      }
    }

    function renderCalendar() {
      calMonth.textContent = MONTH_NAMES[viewMonth] + ' ' + viewYear;
      var isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();
      calPrev.disabled = isCurrentMonth;

      calDays.innerHTML = '';

      var firstDay = new Date(viewYear, viewMonth, 1).getDay();
      var leadingEmpty = (firstDay + 6) % 7; // Monday-first

      for (var i = 0; i < leadingEmpty; i++) {
        var empty = document.createElement('div');
        empty.className = 'cal-day empty';
        calDays.appendChild(empty);
      }

      var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      var todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      for (var d = 1; d <= daysInMonth; d++) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cal-day';
        btn.textContent = d;

        var curDate = new Date(viewYear, viewMonth, d);
        if (curDate.getTime() === todayMidnight.getTime()) {
          btn.classList.add('today');
        }

        var isSunday = curDate.getDay() === 0;
        var isPast = curDate < todayMidnight;

        if (isPast || isSunday) {
          btn.disabled = true;
          if (isSunday) btn.title = 'Studio closed on Sundays';
        } else {
          if (selectedDate && curDate.getTime() === selectedDate.getTime()) {
            btn.classList.add('selected');
          }
          btn.addEventListener('click', (function (dateObj) {
            return function (e) {
              e.stopPropagation();
              selectedDate = dateObj;
              var dateStr = dateObj.toLocaleDateString('en-GB', {
                weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
              });
              dateInput.value = dateStr;
              dateLabel.textContent = dateStr;
              dateLabel.classList.remove('is-placeholder');
              dateTrigger.classList.remove('picker-error');
              closeAll();

              if (!timeInput.value) {
                setTimeout(function () { toggleTime(); }, 120);
              }
            };
          })(curDate));
        }

        calDays.appendChild(btn);
      }
    }

    calPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      viewMonth--;
      if (viewMonth < 0) { viewMonth = 11; viewYear--; }
      renderCalendar();
    });

    calNext.addEventListener('click', function (e) {
      e.stopPropagation();
      viewMonth++;
      if (viewMonth > 11) { viewMonth = 0; viewYear++; }
      renderCalendar();
    });

    dateTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleDate();
    });

    timeTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleTime();
    });

    timePills.forEach(function (pill) {
      pill.addEventListener('click', function (e) {
        e.stopPropagation();
        var val = pill.getAttribute('data-time-slot');
        timeInput.value = val;
        timeLabel.textContent = val;
        timeLabel.classList.remove('is-placeholder');
        timeTrigger.classList.remove('picker-error');
        timePills.forEach(function (p) { p.classList.toggle('selected', p === pill); });
        closeAll();
      });
    });

    document.addEventListener('click', function (e) {
      if (!form.contains(e.target)) closeAll();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });

    renderCalendar();

    form.addEventListener('submit', function (e) {
      if (!dateInput.value) {
        e.preventDefault();
        e.stopImmediatePropagation();
        dateTrigger.classList.add('picker-error');
        toggleDate();
        return false;
      }
      if (!timeInput.value) {
        e.preventDefault();
        e.stopImmediatePropagation();
        timeTrigger.classList.add('picker-error');
        toggleTime();
        return false;
      }
    }, true);
  }

  $$('[data-appointment-form]').forEach(initPicker);

  $$('[data-appointment-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var panel = form.closest('[data-form-panel]');
      
      var formData = new FormData(form);
      var notes = formData.get('notes') ? formData.get('notes').trim() : '';
      var consultItem = {
        id: 'CON-' + Math.floor(100 + Math.random() * 900),
        name: formData.get('name') || 'Client',
        phone: (formData.get('code') || '') + ' ' + (formData.get('phone') || ''),
        email: formData.get('email') || '',
        date: formData.get('date') || 'Upcoming',
        time: formData.get('time') || '03:00 PM',
        type: 'Studio Visit',
        occasion: notes || 'Bespoke Couture Consultation',
        notes: notes,
        status: 'pending'
      };
      
      try {
        var existing = JSON.parse(localStorage.getItem('rri_admin_consultations')) || [];
        existing.unshift(consultItem);
        localStorage.setItem('rri_admin_consultations', JSON.stringify(existing));
      } catch (err) {}

      if (form.hasAttribute('data-counts-enquiry')) {
        var prodTitleEl = $('#modal-product-title');
        var garment = prodTitleEl ? prodTitleEl.textContent.trim() : 'Bespoke Atelier Piece';
        var enqItem = {
          id: 'ENQ-' + Math.floor(100 + Math.random() * 900),
          name: formData.get('name') || 'Client',
          phone: (formData.get('code') || '') + ' ' + (formData.get('phone') || ''),
          garment: garment,
          notes: notes || 'Product enquiry submitted via PDP appointment modal.',
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: 'New Lead'
        };
        try {
          var enqExisting = JSON.parse(localStorage.getItem('rri_admin_enquiries')) || [];
          enqExisting.unshift(enqItem);
          localStorage.setItem('rri_admin_enquiries', JSON.stringify(enqExisting));
        } catch (err) {}
        writeCount(readCount() + 1);
      }

      form.hidden = true;
      $('[data-thanks]', panel).hidden = false;
    });
  });

  $$('[data-newsletter]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('input', form);
      input.value = '';
      input.placeholder = 'Thank you, you are on the list';
    });
  });

  /* ---------- Product page ---------- */
  var stage = $('[data-stage]');
  if (stage) {
    var catalog = window.RRI_CATALOG;
    var params = new URLSearchParams(location.search);
    var pid = params.get('id');
    var piece = catalog ? catalog.getPieceById(pid) : null;

    if (piece) {
      // 1. Update Document Title
      document.title = piece.name + ' — Revikaraj Rathore India';

      // 2. Update Breadcrumbs
      var crumbCat = $('#pdp-crumb-cat');
      if (crumbCat) {
        crumbCat.textContent = piece.primaryCategory || 'Handwork Sarees';
        crumbCat.href = 'shop.html?category=' + (piece.primaryCategorySlug || 'handwork-sarees');
      }
      var crumbProd = $('#pdp-crumb-prod');
      if (crumbProd) crumbProd.textContent = piece.name;

      // 3. Update Meta & Title
      var pdpCollection = $('#pdp-collection');
      if (pdpCollection) pdpCollection.textContent = piece.primaryCollection || 'Collection 2026';
      var pdpPlate = $('#pdp-plate');
      if (pdpPlate) pdpPlate.textContent = 'Plate ' + (piece.plate || '01');
      var pdpTitle = $('#pdp-title');
      if (pdpTitle) pdpTitle.textContent = piece.name;
      var pdpDesc = $('#pdp-desc');
      if (pdpDesc) pdpDesc.textContent = piece.desc;
      var pdpCode = $('#pdp-code');
      if (pdpCode) pdpCode.textContent = piece.code;

      // 4. Update Details Accordion
      var pdpComp = $('#pdp-components');
      if (pdpComp) pdpComp.textContent = piece.components || '2 — Saree with unstitched blouse piece';
      var pdpColour = $('#pdp-colour');
      if (pdpColour) pdpColour.textContent = piece.colour;
      var pdpFabric = $('#pdp-fabric');
      if (pdpFabric) pdpFabric.textContent = piece.fabric;
      var pdpCare = $('#pdp-care');
      if (pdpCare) pdpCare.textContent = piece.care || 'Dry clean only. Store folded in muslin.';

      // 5. Update Gallery Frames (Front, Drape, Pallu, Blouse)
      var stillFrames = $$('[data-still]', stage);
      if (piece.stills && piece.stills.length) {
        piece.stills.forEach(function (src, idx) {
          if (stillFrames[idx]) {
            var img = $('img', stillFrames[idx]);
            if (img) {
              img.src = src;
              img.alt = piece.name + ' — ' + (['front view', 'drape view', 'pallu detail', 'blouse & craft detail'][idx] || 'detail');
            }
          }
        });
      } else if (piece.img) {
        var mainImgSrc = (piece.img.startsWith('data:') || piece.img.startsWith('assets/') || piece.img.startsWith('http'))
          ? piece.img
          : ('assets/images/' + piece.img);
        if (stillFrames[0]) {
          var img = $('img', stillFrames[0]);
          if (img) { img.src = mainImgSrc; img.alt = piece.name; }
        }
      }

      // 6. Update Availability Buttons
      var availBtns = $$('[data-avail-opt]');
      var isMTO = piece.avail === 'Made to Order';
      availBtns.forEach(function (btn) {
        var opt = btn.dataset.availOpt;
        var on = (isMTO && opt === 'mto') || (!isMTO && opt === 'rts');
        btn.classList.toggle('on', on);
      });
      var availNote = $('[data-avail-note]');
      if (availNote) {
        availNote.textContent = isMTO
          ? 'Crafted for you after a consultation, with colour and blouse adjusted to your measure.'
          : 'Finished and held in the studio. Dispatched once your enquiry is confirmed.';
      }

      // 7. Update Enquiry Modal
      var modalTitle = $('#modal-product-title');
      if (modalTitle) modalTitle.textContent = piece.name;
      var modalSub = $('#modal-product-sub');
      if (modalSub) {
        modalSub.innerHTML = piece.code + ' · Free Size · <span data-avail-label>' + piece.avail + '</span>';
      }

      // 8. Render Dynamic "You May Also Admire" Related Cards
      var relatedGrid = $('#pdp-related-grid');
      if (relatedGrid && catalog) {
        var allPieces = catalog.getAllPieces();
        var others = allPieces.filter(function (p) { return p.id !== piece.id; }).slice(0, 4);
        relatedGrid.innerHTML = others.map(function (o, idx) {
          var oImg = (o.img.startsWith('data:') || o.img.startsWith('assets/') || o.img.startsWith('http'))
            ? o.img
            : ('assets/images/' + o.img);
          return '<a href="product.html?id=' + encodeURIComponent(o.id) + '" class="card">' +
            '<div class="card-meta"><span>Plate ' + (o.plate || String(idx + 1).padStart(2, '0')) + '</span><span>' + o.avail + '</span></div>' +
            '<div class="card-frame"><div><div class="slot"><img src="' + oImg + '" alt="' + (o.alt || o.name) + '" loading="lazy"></div></div></div>' +
            '<div class="card-name">' + o.name + '</div>' +
            '<div class="price-note">' + (o.priceNote || 'Price available on request') + '</div>' +
            '</a>';
        }).join('');
      }
    }

    var viewBtns = $$('[data-views] .view-btn');
    var btn360 = $('[data-view-360]');
    var stills = $$('[data-still]', stage);
    var spins = $$('[data-spin]', stage);
    var degTag = $('[data-deg-tag]');
    var deg = $('[data-deg]');
    var spinCtl = $('[data-spin-ctl]');
    var range = $('[data-angle]');
    var view = 0;
    var angle = 0;

    // Check if 360 viewer is enabled from Admin settings (Disabled by default)
    var is360GlobalEnabled = false;
    try {
      var savedSettings = JSON.parse(localStorage.getItem('rri_admin_settings'));
      if (savedSettings && savedSettings.enable360 === true) {
        is360GlobalEnabled = true;
      } else if (localStorage.getItem('rri_enable_360') === 'true') {
        is360GlobalEnabled = true;
      }
    } catch (e) {}

    if (btn360) {
      if (is360GlobalEnabled) {
        btn360.hidden = false;
        btn360.style.display = '';
      } else {
        btn360.hidden = true;
        btn360.style.display = 'none';
      }
    }

    var renderStage = function () {
      var is360 = is360GlobalEnabled && view === 4;
      viewBtns.forEach(function (b, i) { b.classList.toggle('on', i === view); });
      stills.forEach(function (f, i) { f.classList.toggle('on', !is360 && i === view); });
      spins.forEach(function (f, i) { f.classList.toggle('on', is360 && i === angle); });
      if (degTag) degTag.hidden = !is360;
      if (spinCtl) spinCtl.hidden = !is360;
      if (deg) deg.textContent = angle * 45;
      if (range) range.value = angle;
    };
    viewBtns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        if (i === 4 && !is360GlobalEnabled) return;
        view = i;
        angle = 0;
        renderStage();
      });
    });
    if (range) range.addEventListener('input', function () { angle = +range.value; renderStage(); });
    var anglePrev = $('[data-angle-prev]');
    if (anglePrev) anglePrev.addEventListener('click', function () { angle = (angle + 7) % 8; renderStage(); });
    var angleNext = $('[data-angle-next]');
    if (angleNext) angleNext.addEventListener('click', function () { angle = (angle + 1) % 8; renderStage(); });

    // Availability
    var notes = {
      rts: 'Finished and held in the studio. Dispatched once your enquiry is confirmed.',
      mto: 'Crafted for you after a consultation, with colour and blouse adjusted to your measure.'
    };
    var availBtns = $$('[data-avail-opt]');
    availBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        availBtns.forEach(function (o) { o.classList.toggle('on', o === b); });
        $('[data-avail-note]').textContent = notes[b.dataset.availOpt];
        $('[data-avail-label]').textContent = b.textContent;
      });
    });

    // Product detail accordion
    var detailBtn = $('[data-detail-toggle]');
    detailBtn.addEventListener('click', function () {
      var details = $('[data-details]');
      details.hidden = !details.hidden;
      detailBtn.setAttribute('aria-expanded', String(!details.hidden));
      $('.sign', detailBtn).textContent = details.hidden ? '+' : '−';
    });

    // Enquiry modal
    var modal = $('[data-modal]');
    var modalForm = $('form', modal);
    var lastFocus = null;
    var openModal = function (e) {
      if (e) e.preventDefault();
      lastFocus = document.activeElement;
      modalForm.reset();
      modalForm.hidden = false;
      $('[data-thanks]', modal).hidden = true;
      modal.hidden = false;
      document.body.classList.add('no-scroll');
      $('input', modalForm).focus();
    };
    var closeModal = function () {
      modal.hidden = true;
      document.body.classList.remove('no-scroll');
      if (lastFocus) lastFocus.focus();
    };
    $$('[data-enquire-open]').forEach(function (b) { b.addEventListener('click', openModal); });
    $('[data-enquire-close]').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  }

  /* ---------- Hero carousel on phones: start on the centre plate ---------- */
  var heroGrid = $('.hero-grid');
  var heroPlate = $('.hero-plate');
  if (heroGrid && heroPlate) {
    var centrePlate = function () {
      if (heroGrid.scrollWidth <= heroGrid.clientWidth) return;
      heroGrid.scrollLeft = heroPlate.offsetLeft - (heroGrid.clientWidth - heroPlate.offsetWidth) / 2;
    };
    centrePlate();
    window.addEventListener('load', centrePlate);
  }

  /* ---------- Full-width film (home) ---------- */
  var heroFilm = $('[data-film-hero]');
  if (heroFilm) {
    var soundBtn = $('[data-film-sound]');
    var pauseBtn = $('[data-film-pause]');
    var setPaused = function (paused) {
      pauseBtn.textContent = paused ? 'Play' : 'Pause';
      pauseBtn.setAttribute('aria-pressed', String(paused));
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroFilm.removeAttribute('autoplay');
      heroFilm.pause();
      setPaused(true);
    }
    soundBtn.addEventListener('click', function () {
      heroFilm.muted = !heroFilm.muted;
      if (!heroFilm.muted && heroFilm.paused) heroFilm.play();
      soundBtn.textContent = heroFilm.muted ? 'Sound off' : 'Sound on';
      soundBtn.setAttribute('aria-pressed', String(!heroFilm.muted));
    });
    pauseBtn.addEventListener('click', function () {
      if (heroFilm.paused) heroFilm.play(); else heroFilm.pause();
    });
    heroFilm.addEventListener('play', function () { setPaused(false); });
    heroFilm.addEventListener('pause', function () { setPaused(true); });
  }

  /* ---------- Playable film slots ---------- */
  $$('[data-film]').forEach(function (box) {
    var video = $('[data-film-video]', box);
    var btn = $('[data-film-play]', box);
    btn.addEventListener('click', function () {
      btn.hidden = true;
      video.controls = true;
      video.play();
    });
    video.addEventListener('ended', function () {
      video.controls = false;
      btn.hidden = false;
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (openMenu) setMenu(null);
    if (!drawer.hidden) setDrawer(false);
  });
})();

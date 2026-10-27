/**
 * Revikaraj Rathore India — Administration Management System
 */
(function () {
  'use strict';

  // Helper DOM selectors
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // Storage Keys
  const STORAGE_KEYS = {
    AUTH: 'rri_admin_authenticated',
    CONSULTATIONS: 'rri_admin_consultations',
    ENQUIRIES: 'rri_admin_enquiries',
    PRODUCTS: 'rri_admin_products',
    SUBSCRIBERS: 'rri_admin_subscribers',
    SETTINGS: 'rri_admin_settings'
  };

  // Seed Data: Realistic Luxury Couture Data
  const INITIAL_CONSULTATIONS = [
    {
      id: 'CON-101',
      name: 'Radhika Singhania',
      phone: '+91 98201 44521',
      email: 'radhika.s@outlook.com',
      date: 'Wed, 28 Oct 2026',
      time: '03:00 PM',
      type: 'Studio Visit',
      occasion: 'Bridal Trousseau — Nazar Sarees',
      status: 'pending'
    },
    {
      id: 'CON-102',
      name: 'Meera Rajput',
      phone: '+91 98112 89012',
      email: 'meera.rajput@gmail.com',
      date: 'Thu, 29 Oct 2026',
      time: '11:30 AM',
      type: 'Virtual Video Call',
      occasion: 'Gulnar Handwork Saree & bespoke blouse piece',
      status: 'confirmed'
    },
    {
      id: 'CON-103',
      name: 'Ananya Birla',
      phone: '+91 99203 11245',
      email: 'ananya.b@gmail.com',
      date: 'Sat, 31 Oct 2026',
      time: '04:00 PM',
      type: 'Studio Visit',
      occasion: 'Chaap Handblock silk sarees for wedding party',
      status: 'confirmed'
    },
    {
      id: 'CON-104',
      name: 'Gayatri Rathore',
      phone: '+91 94140 22319',
      email: 'gayatri.rathore@heritage.in',
      date: 'Mon, 02 Nov 2026',
      time: '02:00 PM',
      type: 'Studio VIP Suite',
      occasion: 'Custom Royal Poshak — Pure Zardozi & Marodi work',
      status: 'completed'
    },
    {
      id: 'CON-105',
      name: 'Simran Kapoor',
      phone: '+44 7700 900123',
      email: 'simran.k@london.co.uk',
      date: 'Wed, 04 Nov 2026',
      time: '06:30 PM IST',
      type: 'Virtual Video Call',
      occasion: 'Destination Wedding lehengas consultation',
      status: 'pending'
    }
  ];

  const INITIAL_ENQUIRIES = [
    {
      id: 'ENQ-801',
      name: 'Sunita Mathur',
      phone: '+91 98290 12345',
      garment: 'Gulnar Handwork Saree',
      notes: 'Custom embroidery density on border, fitting required before Nov 15.',
      date: '26 Oct 2026',
      status: 'Quote Sent'
    },
    {
      id: 'ENQ-802',
      name: 'Rhea Chawla',
      phone: '+91 98711 55678',
      garment: 'Blush Rose Saree',
      notes: 'Immediate dispatch inquiry for ready-to-ship piece.',
      date: '25 Oct 2026',
      status: 'New Lead'
    },
    {
      id: 'ENQ-803',
      name: 'Natasha Verma',
      phone: '+91 99100 87654',
      garment: 'Nazar 2026 Bridal Lehenga',
      notes: 'Bespoke color request in royal oxblood silk (#590001).',
      date: '24 Oct 2026',
      status: 'Fitting Scheduled'
    }
  ];

  const INITIAL_PRODUCTS = [
    {
      id: 'PROD-01',
      name: 'Gulnar Handwork Saree',
      img: '../assets/images/card-orange-handwork-saree.webp',
      avail: 'Made to Order',
      colour: 'Orange Rust',
      category: 'Handwork Sarees',
      collection: 'Nazar Collection 2026',
      priceMode: 'Price on Request',
      fabric: 'Pure silk; zardozi & dabka handwork',
      desc: 'A pure silk saree in deep oxblood and rust, its border worked in zardozi and dabka with a scattered nazar motif across the drape. Paired with an unstitched blouse piece in matching silk.'
    },
    {
      id: 'PROD-02',
      name: 'Blush Rose Saree',
      img: '../assets/images/card-blush-rose-saree.webp',
      avail: 'Ready to Ship',
      colour: 'Blush Pink',
      category: 'Handwork Sarees',
      collection: 'Nazar Collection 2026',
      priceMode: 'Price on Request',
      fabric: 'Handloom organza silk with tonal sequin embroidery',
      desc: 'A whisper-weight blush pink organza saree adorned with handcrafted micro-sequin florals, finished with a scalloped border and companion tissue blouse piece.'
    },
    {
      id: 'PROD-03',
      name: 'Pink Berry Saree',
      img: '../assets/images/card-pink-floral-saree.webp',
      avail: 'Ready to Ship',
      colour: 'Pink',
      category: 'Sarees',
      collection: 'Collection 2026',
      priceMode: 'Price on Request',
      fabric: 'Raw silk with resham embroidery & moti drops',
      desc: 'Sculpted in rich berry pink silk, detailed with botanical floral clusters rendered in delicate resham needles and freshwater pearl moti along the pallu border.'
    },
    {
      id: 'PROD-04',
      name: 'Lilac Floral Saree',
      img: '../assets/images/card-lilac-saree.webp',
      avail: 'Made to Order',
      colour: 'Lilac Purple',
      category: 'Handwork Sarees',
      collection: 'Nazar Collection 2026',
      priceMode: 'Price on Request',
      fabric: 'Chanderi tissue silk with zardozi borders',
      desc: 'An ethereal lilac chanderi tissue ensemble shimmering under ambient light, woven with royal Rajasthani floral jaal and antique zari work.'
    },
    {
      id: 'PROD-05',
      name: 'Black Embroidered Saree',
      img: '../assets/images/card-black-embroidered-saree.webp',
      avail: 'Ready to Ship',
      colour: 'Black',
      category: 'Handwork Sarees',
      collection: 'Collection 2026',
      priceMode: 'Price on Request',
      fabric: 'Mulberry satin silk with tonal handwork',
      desc: 'A dramatic midnight black evening drape featuring raised bullion work and matte crystals reflecting quiet, understated opulence across the fluid drape.'
    },
    {
      id: 'PROD-06',
      name: 'Lime Floral Saree',
      img: '../assets/images/card-lime-saree.webp',
      avail: 'Ready to Ship',
      colour: 'Lime Green',
      category: 'Printed Sarees',
      collection: 'Chaap',
      priceMode: 'Price on Request',
      fabric: 'Handblock-printed mulmul silk with gota patti',
      desc: 'From the Chaap series, master woodcut block print across vibrant lime green mulmul silk, trimmed with delicate marodi and beaten gota accents on the hemlines.'
    },
    {
      id: 'PROD-07',
      name: 'Pink Rose Saree',
      img: '../assets/images/card-pink-red-floral-saree.webp',
      avail: 'Made to Order',
      colour: 'Pink Red',
      category: 'Handwork Sarees',
      collection: 'Collection 2026',
      priceMode: 'Price on Request',
      fabric: 'Pure georgette with aari taari handwork',
      desc: 'A radiant confluence of vermilion and rose pink in fluid georgette, richly worked with heirloom aari embroidery inspired by Mewari frescoes and heritage palaces.'
    },
    {
      id: 'PROD-08',
      name: 'Ivory Embroidered Saree',
      img: '../assets/images/card-yellow-saree.webp',
      avail: 'Ready to Ship',
      colour: 'Ivory Gold',
      category: 'Sarees',
      collection: 'Nazar Collection 2026',
      priceMode: 'Price on Request',
      fabric: 'Katan silk with dense karchobi borders',
      desc: 'An archival ivory katan silk saree distinguished by dense karchobi borders and geometric pallu finery, celebrating classical Indian handcraft and royal minimalism.'
    }
  ];

  const INITIAL_SUBSCRIBERS = [
    { email: 'avantika.s@vogue.in', date: '26 Oct 2026' },
    { email: 'priya.m@tata.com', date: '25 Oct 2026' },
    { email: 'tanya.narang@harpersbazaar.in', date: '24 Oct 2026' },
    { email: 'devika.rathore@gmail.com', date: '22 Oct 2026' },
    { email: 'ananya.mehta@condenast.com', date: '20 Oct 2026' },
    { email: 'shweta.bachchan@outlook.com', date: '18 Oct 2026' },
    { email: 'zara.singh@delhiclub.in', date: '15 Oct 2026' }
  ];

  const INITIAL_SETTINGS = {
    announcement: 'Studio visits by appointment',
    campaignTitle: 'Collection 2026 · The Film — Nazar',
    heroTagline: 'Couture womenswear, embroidered by hand',
    gateEnabled: true,
    previewPassword: 'rri',
    enable360: false
  };

  // State Management
  const savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || {};
  const mergedSettings = Object.assign({}, INITIAL_SETTINGS, savedSettings);
  if (mergedSettings.enable360 === undefined) mergedSettings.enable360 = false;

  const state = {
    consultations: JSON.parse(localStorage.getItem(STORAGE_KEYS.CONSULTATIONS)) || INITIAL_CONSULTATIONS,
    enquiries: JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) || INITIAL_ENQUIRIES,
    products: JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || INITIAL_PRODUCTS,
    subscribers: JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)) || INITIAL_SUBSCRIBERS,
    settings: mergedSettings,
    activeTab: 'overview'
  };

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(state.consultations));
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(state.enquiries));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
      localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(state.subscribers));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
      localStorage.setItem('rri_enable_360', state.settings.enable360 ? 'true' : 'false');
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }

  // Toast System
  function showToast(message) {
    let toast = $('#toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A86A" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Authentication
  function isAuth() {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  }

  function renderView() {
    const loginView = $('#login-view');
    const appContainer = $('#app-container');
    if (isAuth()) {
      if (loginView) loginView.hidden = true;
      if (appContainer) appContainer.hidden = false;
      renderActiveTab();
      updateBadges();
    } else {
      if (loginView) loginView.hidden = false;
      if (appContainer) appContainer.hidden = true;
    }
  }

  function handleLogin(username, password) {
    const validUser = (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@revikarajrathoreindia.com');
    const validPass = (password.trim() === 'rri2026' || password.trim() === 'revikaraj2026' || password.trim() === 'admin');

    if (validUser && validPass) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      showToast('Welcome to Revikaraj Rathore India Portal');
      renderView();
    } else {
      const err = $('#login-error');
      if (err) {
        err.textContent = 'Invalid credentials. Please enter admin / rri2026';
        err.hidden = false;
      }
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    showToast('Logged out securely');
    renderView();
  }

  // Badges update
  function updateBadges() {
    const pendingCon = state.consultations.filter(c => c.status === 'pending').length;
    const conBadge = $('#badge-consultations');
    if (conBadge) {
      conBadge.textContent = pendingCon;
      conBadge.hidden = pendingCon === 0;
    }

    const enqBadge = $('#badge-enquiries');
    if (enqBadge) {
      enqBadge.textContent = state.enquiries.length;
    }

    const prodBadge = $('#badge-products');
    if (prodBadge) {
      prodBadge.textContent = state.products.length;
    }

    const subBadge = $('#badge-subscribers');
    if (subBadge) {
      subBadge.textContent = state.subscribers.length;
    }
  }

  // Switch Active Tab
  function setActiveTab(tabName) {
    state.activeTab = tabName;
    $$('.nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabName);
    });
    const pageTitle = $('#page-title');
    const tabTitles = {
      overview: 'Revikaraj Rathore India Overview',
      consultations: 'Bespoke Appointments & Consultations',
      enquiries: 'Couture Price & Custom Inquiries',
      products: 'Lookbook & Garment Catalog',
      campaign: 'Homepage Campaign & Announcements',
      subscribers: 'VIP Client Book & Letters',
      security: 'Access & Private Preview Gate'
    };
    if (pageTitle) pageTitle.textContent = tabTitles[tabName] || 'Admin Portal';
    renderActiveTab();
    // Close mobile drawer if open
    const sidebar = $('#app-sidebar');
    if (sidebar) sidebar.classList.remove('open');
  }

  function renderActiveTab() {
    const container = $('#tab-content-area');
    if (!container) return;

    switch (state.activeTab) {
      case 'overview':
        container.innerHTML = renderOverviewHTML();
        attachOverviewEvents();
        break;
      case 'consultations':
        container.innerHTML = renderConsultationsHTML();
        attachConsultationsEvents();
        break;
      case 'enquiries':
        container.innerHTML = renderEnquiriesHTML();
        attachEnquiriesEvents();
        break;
      case 'products':
        container.innerHTML = renderProductsHTML();
        attachProductsEvents();
        break;
      case 'campaign':
        container.innerHTML = renderCampaignHTML();
        attachCampaignEvents();
        break;
      case 'subscribers':
        container.innerHTML = renderSubscribersHTML();
        attachSubscribersEvents();
        break;
      case 'security':
        container.innerHTML = renderSecurityHTML();
        attachSecurityEvents();
        break;
      default:
        container.innerHTML = renderOverviewHTML();
        attachOverviewEvents();
    }
  }

  // ================= TAB 1: OVERVIEW =================
  function renderOverviewHTML() {
    const pendingCount = state.consultations.filter(c => c.status === 'pending').length;
    const confirmedCount = state.consultations.filter(c => c.status === 'confirmed').length;

    return `
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-label">Pending Appointments</span>
            <div class="metric-icon">
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
          </div>
          <div class="metric-value">${pendingCount}</div>
          <div class="metric-sub"><span class="metric-trend">+2 new</span> awaiting confirmation</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-label">Bespoke Enquiries</span>
            <div class="metric-icon">
              <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
          </div>
          <div class="metric-value">${state.enquiries.length}</div>
          <div class="metric-sub">Custom bridal & silk saree leads</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-label">Curated Lookbook</span>
            <div class="metric-icon">
              <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </div>
          </div>
          <div class="metric-value">${state.products.length}</div>
          <div class="metric-sub">Pieces across Nazar & Chaap</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-label">VIP Letters List</span>
            <div class="metric-icon">
              <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
          </div>
          <div class="metric-value">${state.subscribers.length}</div>
          <div class="metric-sub">Subscribed for private viewings</div>
        </div>
      </div>

      <!-- Quick Actions Bar -->
      <div class="section-panel">
        <div class="panel-header">
          <h2 class="panel-title">Quick Operations</h2>
        </div>
        <div style="padding: 24px; display: flex; flex-wrap: wrap; gap: 14px;">
          <button class="btn-primary" data-action="new-consult">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Book New Consultation
          </button>
          <button class="btn-primary" data-action="new-product" style="background:#2A1B1D; border-color:var(--gold-dim);">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Garment to Lookbook
          </button>
          <button class="btn-sm" data-action="export-csv" style="padding: 12px 18px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export Client VIP List
          </button>
          <a href="../home.html" target="_blank" class="btn-sm" style="padding: 12px 18px; margin-left:auto;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            Open Live Website
          </a>
        </div>
      </div>

      <!-- Recent Consultations -->
      <div class="section-panel">
        <div class="panel-header">
          <h2 class="panel-title">Upcoming Appointments & Consultations</h2>
          <button class="btn-sm" data-nav="consultations">View All (${state.consultations.length})</button>
        </div>
        <div class="table-responsive">
          <table class="luxury-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Date & Time</th>
                <th>Consultation Type</th>
                <th>Occasion / Request</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.consultations.slice(0, 4).map(c => `
                <tr>
                  <td><div class="primary-text">${c.name}</div></td>
                  <td>
                    <div>${c.phone}</div>
                    <div class="table-sub">${c.email}</div>
                  </td>
                  <td>
                    <div>${c.date}</div>
                    <div class="table-sub">${c.time}</div>
                  </td>
                  <td><span class="badge-status ${c.type.includes('Studio') ? 'confirmed' : 'pending'}">${c.type}</span></td>
                  <td>${c.occasion}</td>
                  <td><span class="badge-status ${c.status}">${c.status}</span></td>
                  <td>
                    <div class="action-strip">
                      <a href="https://wa.me/${c.phone.replace(/[^0-9]/g, '')}" target="_blank" class="btn-sm whatsapp" title="WhatsApp Client">WhatsApp</a>
                      <button class="btn-sm" data-toggle-status="${c.id}">Update</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function attachOverviewEvents() {
    $$('[data-action="new-consult"]').forEach(b => b.addEventListener('click', openConsultationModal));
    $$('[data-action="new-product"]').forEach(b => b.addEventListener('click', openProductModal));
    $$('[data-action="export-csv"]').forEach(b => b.addEventListener('click', exportSubscribersCSV));
    $$('[data-nav="consultations"]').forEach(b => b.addEventListener('click', () => setActiveTab('consultations')));
    $$('[data-toggle-status]').forEach(b => {
      b.addEventListener('click', () => cycleConsultationStatus(b.dataset.toggleStatus));
    });
  }

  // ================= TAB 2: CONSULTATIONS =================
  function renderConsultationsHTML() {
    return `
      <div class="section-panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Bespoke Studio & Virtual Consultations</h2>
            <div class="table-sub" style="margin-top:4px;">Manage appointment requests submitted through the website</div>
          </div>
          <div class="panel-actions">
            <div class="search-input-wrap">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" id="consult-search" placeholder="Search client, phone, occasion...">
            </div>
            <button class="btn-primary" id="btn-add-consult">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              New Booking
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="luxury-table" id="consultations-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Client Name</th>
                <th>Direct Contact</th>
                <th>Scheduled Date</th>
                <th>Type</th>
                <th>Occasion / Requirements</th>
                <th>Status</th>
                <th>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              ${renderConsultationRows(state.consultations)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderConsultationRows(list) {
    if (!list.length) {
      return `<tr><td colspan="8" style="text-align:center; padding:48px; color:var(--text-muted);">No consultations found.</td></tr>`;
    }
    return list.map(c => `
      <tr data-id="${c.id}">
        <td><span class="table-sub" style="font-family:monospace;">${c.id}</span></td>
        <td>
          <div class="primary-text">${c.name}</div>
        </td>
        <td>
          <div>${c.phone}</div>
          <div class="table-sub">${c.email}</div>
        </td>
        <td>
          <div>${c.date}</div>
          <div class="table-sub">${c.time}</div>
        </td>
        <td><span class="badge-status ${c.type.includes('Studio') ? 'confirmed' : 'pending'}">${c.type}</span></td>
        <td><div style="max-width:280px;">${c.occasion}</div></td>
        <td>
          <select class="form-input" data-change-status="${c.id}" style="padding:4px 8px; font-size:11px; text-transform:uppercase;">
            <option value="pending" ${c.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="confirmed" ${c.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="completed" ${c.status === 'completed' ? 'selected' : ''}>Completed</option>
            <option value="cancelled" ${c.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <div class="action-strip">
            <a href="https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=Dear%20${encodeURIComponent(c.name)},%20Greetings%20from%20Revikaraj%20Rathore%20India.%20Regarding%20your%20bespoke%20appointment..." target="_blank" class="btn-sm whatsapp" title="Chat on WhatsApp">
              WhatsApp
            </a>
            <button class="btn-sm delete" data-delete-consult="${c.id}" title="Remove Appointment">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function attachConsultationsEvents() {
    $('#btn-add-consult')?.addEventListener('click', openConsultationModal);

    const searchInput = $('#consult-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        const filtered = state.consultations.filter(c =>
          c.name.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.occasion.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q)
        );
        const tbody = $('#consultations-table tbody');
        if (tbody) tbody.innerHTML = renderConsultationRows(filtered);
        rebindConsultationRowActions();
      });
    }

    rebindConsultationRowActions();
  }

  function rebindConsultationRowActions() {
    $$('[data-change-status]').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = sel.dataset.changeStatus;
        const consult = state.consultations.find(c => c.id === id);
        if (consult) {
          consult.status = e.target.value;
          persist();
          updateBadges();
          showToast(`Appointment status updated to ${e.target.value.toUpperCase()}`);
        }
      });
    });

    $$('[data-delete-consult]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.deleteConsult;
        if (confirm(`Remove appointment ${id}?`)) {
          state.consultations = state.consultations.filter(c => c.id !== id);
          persist();
          updateBadges();
          renderActiveTab();
          showToast('Appointment removed');
        }
      });
    });
  }

  function cycleConsultationStatus(id) {
    const consult = state.consultations.find(c => c.id === id);
    if (!consult) return;
    const cycle = { pending: 'confirmed', confirmed: 'completed', completed: 'pending' };
    consult.status = cycle[consult.status] || 'confirmed';
    persist();
    updateBadges();
    renderActiveTab();
    showToast(`Status updated to ${consult.status.toUpperCase()}`);
  }

  // ================= TAB 3: COUTURE ENQUIRIES =================
  function renderEnquiriesHTML() {
    return `
      <div class="section-panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Couture Price & Bespoke Leads</h2>
            <div class="table-sub" style="margin-top:4px;">Incoming price requests and custom measurement inquiries</div>
          </div>
          <div class="panel-actions">
            <button class="btn-primary" id="btn-add-enquiry">Record New Enquiry</button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="luxury-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Client</th>
                <th>Garment Inquired</th>
                <th>Custom Requirements / Notes</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.enquiries.map(e => `
                <tr>
                  <td><span class="table-sub" style="font-family:monospace;">${e.id}</span></td>
                  <td>
                    <div class="primary-text">${e.name}</div>
                    <div class="table-sub">${e.phone}</div>
                  </td>
                  <td>
                    <div class="primary-text" style="color:var(--gold);">${e.garment}</div>
                  </td>
                  <td><div style="max-width:320px;">${e.notes}</div></td>
                  <td>${e.date}</td>
                  <td><span class="badge-status confirmed">${e.status}</span></td>
                  <td>
                    <div class="action-strip">
                      <a href="https://wa.me/${e.phone.replace(/[^0-9]/g, '')}?text=Dear%20${encodeURIComponent(e.name)},%20Greetings%20from%20Revikaraj%20Rathore%20India%20regarding%20the%20${encodeURIComponent(e.garment)}..." target="_blank" class="btn-sm whatsapp">Send Quote</a>
                      <button class="btn-sm delete" data-delete-enquiry="${e.id}">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function attachEnquiriesEvents() {
    $('#btn-add-enquiry')?.addEventListener('click', () => {
      const name = prompt('Client Name:');
      if (!name) return;
      const phone = prompt('Contact / WhatsApp:');
      const garment = prompt('Garment / Piece Name:', 'Gulnar Handwork Saree');
      const notes = prompt('Notes / Occasion date:');
      const newEnq = {
        id: 'ENQ-' + Math.floor(100 + Math.random() * 900),
        name,
        phone: phone || '+91 ',
        garment: garment || 'Bespoke Saree',
        notes: notes || 'Direct showroom inquiry',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'New Lead'
      };
      state.enquiries.unshift(newEnq);
      persist();
      updateBadges();
      renderActiveTab();
      showToast('New lead recorded');
    });

    $$('[data-delete-enquiry]').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.dataset.deleteEnquiry;
        if (confirm(`Remove lead ${id}?`)) {
          state.enquiries = state.enquiries.filter(e => e.id !== id);
          persist();
          updateBadges();
          renderActiveTab();
          showToast('Lead deleted');
        }
      });
    });
  }

  // ================= TAB 4: PRODUCTS / CATALOG =================
  function renderProductsHTML() {
    return `
      <div class="section-panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Curated Lookbook & Garments</h2>
            <div class="table-sub" style="margin-top:4px;">Pieces showcased across collections, shop categories, and private viewings</div>
          </div>
          <div class="panel-actions">
            <button class="btn-primary" id="btn-add-product">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add New Garment
            </button>
          </div>
        </div>

        <!-- Lookbook 360° Interactive Viewer Controller -->
        <div style="margin: 0 24px 20px; padding: 18px 22px; background: rgba(22, 14, 15, 0.7); border: 1px solid var(--gold-dim); display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 42px; height: 42px; border: 1px solid var(--gold); display: flex; align-items: center; justify-content: center; color: var(--gold); flex-shrink: 0;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"></circle><path d="M16 12a4 4 0 1 1-8 0"></path><polyline points="12 2 12 6"></polyline></svg>
            </div>
            <div>
              <div style="font-family: var(--serif-display); font-size: 16px; color: var(--parchment); letter-spacing: 0.04em;">360° Interactive Ensemble Viewer</div>
              <div class="table-sub" style="margin-top: 3px;">Control visibility of the 360° rotational turntable view on public product pages (Currently: <span id="label-360-inline" style="color:${state.settings.enable360 ? 'var(--gold-bright)' : 'var(--text-muted)'}; font-weight: 500;">${state.settings.enable360 ? 'Enabled' : 'Disabled / Hidden'}</span>)</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 14px;">
            <span style="font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase; color: ${state.settings.enable360 ? 'var(--gold-bright)' : 'var(--text-muted)'}; font-weight: 500;" id="label-360-status">${state.settings.enable360 ? 'Active' : 'Hidden'}</span>
            <label class="switch">
              <input type="checkbox" id="toggle-360-viewer" ${state.settings.enable360 ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="product-grid">
          ${state.products.map(p => `
            <div class="product-item-card" data-product-id="${p.id}">
              <div class="product-thumb-wrap">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='../assets/images/card-orange-handwork-saree.webp'">
                <span class="product-badge-overlay">${p.avail}</span>
              </div>
              <div class="product-details">
                <span class="product-collection-tag">${p.collection}</span>
                <h3 class="product-title">${p.name}</h3>
                <div class="table-sub">${p.category} · ${p.colour}</div>
                <div class="product-meta-row">
                  <span class="product-price">${p.priceMode}</span>
                  <div class="action-strip">
                    <button class="btn-sm edit" data-edit-prod="${p.id}" title="Modify Garment Details & Photograph">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      Edit
                    </button>
                    <button class="btn-sm" data-toggle-avail="${p.id}" title="Toggle Availability">${p.avail === 'Ready to Ship' ? 'Set MTO' : 'Set RTS'}</button>
                    <button class="btn-sm delete" data-delete-prod="${p.id}" title="Delete Piece">×</button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function attachProductsEvents() {
    $('#btn-add-product')?.addEventListener('click', () => openProductModal(null));

    const toggle360 = $('#toggle-360-viewer');
    if (toggle360) {
      toggle360.addEventListener('change', () => {
        state.settings.enable360 = toggle360.checked;
        persist();
        const lbl = $('#label-360-status');
        const inlineLbl = $('#label-360-inline');
        if (lbl) {
          lbl.textContent = state.settings.enable360 ? 'Active' : 'Hidden';
          lbl.style.color = state.settings.enable360 ? 'var(--gold-bright)' : 'var(--text-muted)';
        }
        if (inlineLbl) {
          inlineLbl.textContent = state.settings.enable360 ? 'Enabled' : 'Disabled / Hidden';
          inlineLbl.style.color = state.settings.enable360 ? 'var(--gold-bright)' : 'var(--text-muted)';
        }
        showToast(state.settings.enable360 ? '360° product viewer enabled on lookbook pages' : '360° product viewer disabled and hidden on product page');
      });
    }

    $$('[data-edit-prod]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.editProd;
        const prod = state.products.find(p => p.id === id);
        if (prod) openProductModal(prod);
      });
    });

    $$('[data-toggle-avail]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.toggleAvail;
        const prod = state.products.find(p => p.id === id);
        if (prod) {
          prod.avail = prod.avail === 'Ready to Ship' ? 'Made to Order' : 'Ready to Ship';
          persist();
          renderActiveTab();
          showToast(`Updated availability for ${prod.name}`);
        }
      });
    });

    $$('[data-delete-prod]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.deleteProd;
        if (confirm(`Remove garment ${id}?`)) {
          state.products = state.products.filter(p => p.id !== id);
          persist();
          updateBadges();
          renderActiveTab();
          showToast('Garment removed from catalog');
        }
      });
    });
  }

  // ================= TAB 5: CAMPAIGN & HERO =================
  function renderCampaignHTML() {
    return `
      <div class="settings-grid">
        <div class="setting-card">
          <h2 class="setting-title">Homepage Announcement Bar</h2>
          <p class="setting-desc">The top utility banner text displayed across the header on all desktop viewports.</p>
          <div class="form-group">
            <label>Announcement Bar Text</label>
            <input type="text" class="form-input" id="cfg-announcement" value="${state.settings.announcement}">
          </div>
          <button class="btn-primary" id="btn-save-announcement" style="align-self:flex-start;">Update Announcement</button>
        </div>

        <div class="setting-card">
          <h2 class="setting-title">Hero Campaign Settings</h2>
          <p class="setting-desc">Control the collection title, film headline, and tagline over the full-bleed video hero.</p>
          <div class="form-group">
            <label>Campaign Title (e.g. Nazar · Collection 2026)</label>
            <input type="text" class="form-input" id="cfg-campaign" value="${state.settings.campaignTitle}">
          </div>
          <div class="form-group">
            <label>Campaign Tagline / Kicker</label>
            <input type="text" class="form-input" id="cfg-tagline" value="${state.settings.heroTagline}">
          </div>
          <button class="btn-primary" id="btn-save-campaign" style="align-self:flex-start;">Save Campaign Info</button>
        </div>
      </div>
    `;
  }

  function attachCampaignEvents() {
    $('#btn-save-announcement')?.addEventListener('click', () => {
      const val = $('#cfg-announcement').value.trim();
      state.settings.announcement = val;
      persist();
      showToast('Announcement updated successfully');
    });

    $('#btn-save-campaign')?.addEventListener('click', () => {
      state.settings.campaignTitle = $('#cfg-campaign').value.trim();
      state.settings.heroTagline = $('#cfg-tagline').value.trim();
      persist();
      showToast('Hero campaign settings saved');
    });
  }

  // ================= TAB 6: VIP SUBSCRIBERS =================
  function renderSubscribersHTML() {
    return `
      <div class="section-panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">Letters from the House — VIP Client Book</h2>
            <div class="table-sub" style="margin-top:4px;">Private list of patrons receiving seasonal invitations and lookbook previews</div>
          </div>
          <div class="panel-actions">
            <button class="btn-primary" id="btn-export-subscribers">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export CSV for Newsletter
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="luxury-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subscriber Email</th>
                <th>Joined Date</th>
                <th>VIP Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.subscribers.map((s, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td><div class="primary-text">${s.email}</div></td>
                  <td>${s.date}</td>
                  <td><span class="badge-status confirmed">Subscribed</span></td>
                  <td>
                    <button class="btn-sm delete" data-delete-sub="${s.email}">Remove</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function attachSubscribersEvents() {
    $('#btn-export-subscribers')?.addEventListener('click', exportSubscribersCSV);

    $$('[data-delete-sub]').forEach(btn => {
      btn.addEventListener('click', () => {
        const email = btn.dataset.deleteSub;
        if (confirm(`Remove ${email} from VIP book?`)) {
          state.subscribers = state.subscribers.filter(s => s.email !== email);
          persist();
          updateBadges();
          renderActiveTab();
          showToast('Subscriber removed');
        }
      });
    });
  }

  function exportSubscribersCSV() {
    const csvContent = 'data:text/csv;charset=utf-8,Email,Subscription Date\n' +
      state.subscribers.map(s => `"${s.email}","${s.date}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'revikaraj-rathore-vip-clients.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('VIP Client List exported as CSV');
  }

  // ================= TAB 7: SECURITY & PREVIEW GATE =================
  function renderSecurityHTML() {
    return `
      <div class="settings-grid">
        <div class="setting-card">
          <h2 class="setting-title">Private Preview Gatekeeper</h2>
          <p class="setting-desc">Locks public viewing behind a luxury password gate while Revikaraj Rathore India prepares the official public launch.</p>
          
          <div class="toggle-row">
            <div>
              <div class="primary-text">Preview Gate Active</div>
              <div class="table-sub">When enabled, visitors must enter private preview password</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="toggle-preview-gate" ${state.settings.gateEnabled ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>

          <div class="form-group" style="margin-top:10px;">
            <label>Preview Access Password</label>
            <input type="text" class="form-input" id="cfg-gate-pass" value="${state.settings.previewPassword}">
            <div class="table-sub">Shared with VIP clients and brides for private pre-launch viewings</div>
          </div>
          <button class="btn-primary" id="btn-save-gate" style="align-self:flex-start;">Update Gate Security</button>
        </div>

        <div class="setting-card">
          <h2 class="setting-title">Admin Master Credentials</h2>
          <p class="setting-desc">Direct login security for the Revikaraj Rathore India administrative portal.</p>
          
          <div class="form-group">
            <label>Admin Username</label>
            <input type="text" class="form-input" value="admin" readonly>
          </div>
          <div class="form-group">
            <label>Current Master Password</label>
            <input type="password" class="form-input" value="rri2026" readonly>
          </div>
          <div class="table-sub" style="padding:10px; background:rgba(201,168,106,0.06); border:1px solid var(--ink-border);">
            Admin URL: <code>/admin/</code><br>
            Direct Login: <strong>admin</strong> / <strong>rri2026</strong>
          </div>
        </div>

        <div class="setting-card">
          <h2 class="setting-title">Product Page 360° Turntable</h2>
          <p class="setting-desc">Enable or disable the interactive 360° rotational garment turntable view across all lookbook product pages.</p>
          
          <div class="toggle-row">
            <div>
              <div class="primary-text">360° Turntable View</div>
              <div class="table-sub">When disabled, 360° tab, angles, and rotational controls are hidden on public product pages</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="toggle-security-360" ${state.settings.enable360 ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
          <div class="table-sub" style="margin-top:6px;">Current Status: <strong style="color:${state.settings.enable360 ? 'var(--gold-bright)' : 'var(--text-muted)'};">${state.settings.enable360 ? 'Enabled' : 'Disabled (Hidden on product pages)'}</strong></div>
        </div>
      </div>
    `;
  }

  function attachSecurityEvents() {
    $('#btn-save-gate')?.addEventListener('click', () => {
      const isChecked = $('#toggle-preview-gate').checked;
      const pass = $('#cfg-gate-pass').value.trim();
      state.settings.gateEnabled = isChecked;
      state.settings.previewPassword = pass;
      persist();
      showToast('Gate security settings saved');
    });

    $('#toggle-security-360')?.addEventListener('change', (e) => {
      state.settings.enable360 = e.target.checked;
      persist();
      showToast(state.settings.enable360 ? '360° product viewer enabled' : '360° product viewer disabled and hidden on product page');
      renderActiveTab();
    });
  }

  // ================= MODAL MANAGERS =================
  function openConsultationModal() {
    const modal = $('#modal-consultation');
    if (modal) modal.hidden = false;
  }

  function closeConsultationModal() {
    const modal = $('#modal-consultation');
    if (modal) modal.hidden = true;
  }

  function openProductModal(prod) {
    const modal = $('#modal-product');
    if (!modal) return;
    const form = $('#form-add-product');
    const titleEl = $('#modal-product-title');
    const submitBtn = $('#btn-submit-product');
    const editIdInput = $('#prod-edit-id');

    resetProductUpload();

    if (prod && typeof prod === 'object' && prod.id) {
      // EDIT MODE
      if (titleEl) titleEl.textContent = 'Edit Garment: ' + (prod.name || prod.id);
      if (submitBtn) submitBtn.textContent = 'Save Changes';
      if (editIdInput) editIdInput.value = prod.id;

      if (form) {
        if (form.prod_name) form.prod_name.value = prod.name || '';
        if (form.prod_category) form.prod_category.value = prod.category || 'Handwork Sarees';
        if (form.prod_collection) form.prod_collection.value = prod.collection || 'Collection 2026';
        if (form.prod_avail) form.prod_avail.value = prod.avail || 'Made to Order';
        if (form.prod_colour) form.prod_colour.value = prod.colour || '';
        if (form.prod_price) form.prod_price.value = prod.priceMode || 'Price on Request';
        if (form.prod_fabric) form.prod_fabric.value = prod.fabric || '';
        if (form.prod_desc) form.prod_desc.value = prod.desc || '';
      }

      if (prod.img) {
        const previewImg = $('#preview-img');
        const dataInput = $('#prod-img-data');
        const previewWrap = $('#upload-preview');
        const promptWrap = $('#upload-prompt');
        const infoText = $('#upload-file-info');

        if (previewImg) previewImg.src = prod.img;
        if (dataInput) dataInput.value = prod.img;
        if (infoText) infoText.textContent = 'Current Photograph (Click change to replace)';
        if (promptWrap) promptWrap.hidden = true;
        if (previewWrap) previewWrap.hidden = false;
      }
    } else {
      // ADD NEW MODE
      if (titleEl) titleEl.textContent = 'Add Garment to Lookbook';
      if (submitBtn) submitBtn.textContent = 'Add to Lookbook';
      if (editIdInput) editIdInput.value = '';
      if (form) form.reset();
      resetProductUpload();
    }

    modal.hidden = false;
  }

  function closeProductModal() {
    const modal = $('#modal-product');
    if (modal) {
      modal.hidden = true;
      const form = $('#form-add-product');
      if (form) form.reset();
      resetProductUpload();
    }
  }

  function resetProductUpload() {
    const fileInput = $('#prod-file-input');
    const dataInput = $('#prod-img-data');
    const previewWrap = $('#upload-preview');
    const promptWrap = $('#upload-prompt');
    const previewImg = $('#preview-img');
    const infoText = $('#upload-file-info');

    if (fileInput) fileInput.value = '';
    if (dataInput) dataInput.value = '';
    if (previewImg) previewImg.src = '';
    if (infoText) infoText.textContent = '';
    if (previewWrap) previewWrap.hidden = true;
    if (promptWrap) promptWrap.hidden = false;
  }

  // Global Event Attachments
  function init() {
    // Login form
    const loginForm = $('#login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = $('#login-user').value;
        const pass = $('#login-pass').value;
        handleLogin(user, pass);
      });
    }

    // Quick demo login button
    $('#btn-quick-login')?.addEventListener('click', () => {
      handleLogin('admin', 'rri2026');
    });

    // Logout button
    $('#btn-logout')?.addEventListener('click', handleLogout);

    // Nav tabs
    $$('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
    });

    // Mobile menu toggle
    $('#mobile-menu-btn')?.addEventListener('click', () => {
      $('#app-sidebar')?.classList.toggle('open');
    });

    // Modal Close buttons
    $$('[data-close-modal]').forEach(b => {
      b.addEventListener('click', () => {
        closeConsultationModal();
        closeProductModal();
      });
    });

    // Image Upload Dropzone logic
    const dropzone = $('#upload-dropzone');
    const fileInput = $('#prod-file-input');
    const changeBtn = $('#btn-change-image');

    function handleFile(file) {
      if (!file || !file.type.startsWith('image/')) {
        showToast('Please select a valid image file (PNG, JPG, WEBP)');
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        showToast('Image size exceeds 8MB. Please choose a smaller image.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const previewImg = $('#preview-img');
        const dataInput = $('#prod-img-data');
        const previewWrap = $('#upload-preview');
        const promptWrap = $('#upload-prompt');
        const infoText = $('#upload-file-info');

        if (previewImg) previewImg.src = dataUrl;
        if (dataInput) dataInput.value = dataUrl;
        if (infoText) infoText.textContent = `${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
        if (promptWrap) promptWrap.hidden = true;
        if (previewWrap) previewWrap.hidden = false;
      };
      reader.readAsDataURL(file);
    }

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', (e) => {
        if (e.target.closest('#btn-change-image')) {
          e.stopPropagation();
          resetProductUpload();
          fileInput.click();
          return;
        }
        const preview = $('#upload-preview');
        if (preview && preview.hidden) {
          fileInput.click();
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleFile(e.target.files[0]);
        }
      });

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      });
    }

    changeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      resetProductUpload();
      fileInput?.click();
    });

    // Form: Create Consultation
    $('#form-add-consultation')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const newConsult = {
        id: 'CON-' + Math.floor(100 + Math.random() * 900),
        name: form.client_name.value.trim(),
        phone: form.client_phone.value.trim(),
        email: form.client_email.value.trim(),
        date: form.consult_date.value,
        time: form.consult_time.value,
        type: form.consult_type.value,
        occasion: form.consult_notes.value.trim() || 'General Consultation',
        status: 'pending'
      };
      state.consultations.unshift(newConsult);
      persist();
      updateBadges();
      closeConsultationModal();
      form.reset();
      renderActiveTab();
      showToast('New appointment scheduled successfully');
    });

    // Form: Add or Edit Product
    $('#form-add-product')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const editId = $('#prod-edit-id')?.value;
      const imgVal = form.prod_img.value.trim();
      if (!imgVal) {
        showToast('Please upload a garment photograph');
        return;
      }

      if (editId) {
        // Edit existing product
        const existing = state.products.find(p => p.id === editId);
        if (existing) {
          existing.name = form.prod_name.value.trim();
          existing.img = imgVal;
          existing.avail = form.prod_avail.value;
          existing.colour = form.prod_colour.value.trim() || 'Bespoke';
          existing.category = form.prod_category.value;
          existing.collection = form.prod_collection.value;
          existing.priceMode = form.prod_price.value.trim() || 'Price on Request';
          existing.fabric = form.prod_fabric ? form.prod_fabric.value.trim() : (existing.fabric || '');
          existing.desc = form.prod_desc ? form.prod_desc.value.trim() : (existing.desc || '');

          persist();
          closeProductModal();
          renderActiveTab();
          showToast(`Saved modifications to ${existing.name}`);
          return;
        }
      }

      // Add New Product
      const newProd = {
        id: 'PROD-' + String(state.products.length + 1).padStart(2, '0'),
        name: form.prod_name.value.trim(),
        img: imgVal,
        avail: form.prod_avail.value,
        colour: form.prod_colour.value.trim() || 'Bespoke',
        category: form.prod_category.value,
        collection: form.prod_collection.value,
        priceMode: form.prod_price.value.trim() || 'Price on Request',
        fabric: form.prod_fabric ? form.prod_fabric.value.trim() : '',
        desc: form.prod_desc ? form.prod_desc.value.trim() : ''
      };
      state.products.unshift(newProd);
      persist();
      updateBadges();
      closeProductModal();
      renderActiveTab();
      showToast(`Added ${newProd.name} to lookbook`);
    });

    // Initial check
    renderView();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* Pieces shown in the shop. Pull from central catalog or fallback. */
  var PIECES = window.RRI_CATALOG ? window.RRI_CATALOG.getAllPieces() : [
    { id: 'gulnar-handwork-saree', plate: '01', name: 'Gulnar Handwork Saree', img: 'card-orange-handwork-saree.webp', alt: 'Orange handwork saree with embroidered florals, full length', avail: 'Made to Order', colour: 'orange', categories: ['sarees', 'handwork-sarees'], collections: ['nazar', 'collection-2026'] },
    { id: 'blush-rose-saree', plate: '02', name: 'Blush Rose Saree', img: 'card-blush-rose-saree.webp', alt: 'Blush saree with a hand-embroidered sequin rose', avail: 'Ready to Ship', colour: 'blush pink', categories: ['sarees', 'handwork-sarees'], collections: ['nazar', 'collection-2026'] },
    { id: 'pink-berry-saree', plate: '03', name: 'Pink Berry Saree', img: 'card-pink-floral-saree.webp', alt: 'Pink saree with embroidered berries, full length', avail: 'Ready to Ship', colour: 'pink', categories: ['sarees', 'handwork-sarees'], collections: ['nazar', 'collection-2026'] },
    { id: 'lilac-floral-saree', plate: '04', name: 'Lilac Floral Saree', img: 'card-lilac-saree.webp', alt: 'Lilac saree with embroidered florals', avail: 'Made to Order', colour: 'lilac purple', categories: ['sarees', 'handwork-sarees'], collections: ['nazar', 'collection-2026'] },
    { id: 'black-embroidered-saree', plate: '05', name: 'Black Embroidered Saree', img: 'card-black-embroidered-saree.webp', alt: 'Black saree with tonal embroidery', avail: 'Ready to Ship', colour: 'black', categories: ['sarees', 'handwork-sarees'], collections: ['nazar', 'collection-2026'] },
    { id: 'lime-floral-saree', plate: '06', name: 'Lime Floral Saree', img: 'card-lime-saree.webp', alt: 'Lime saree with embroidered florals, full length', avail: 'Ready to Ship', colour: 'lime green', categories: ['sarees', 'handwork-sarees', 'printed-sarees'], collections: ['chaap', 'collection-2026'] },
    { id: 'pink-rose-saree', plate: '07', name: 'Pink Rose Saree', img: 'card-pink-red-floral-saree.webp', alt: 'Pink saree with red embroidered flowers, full length', avail: 'Made to Order', colour: 'pink red', categories: ['sarees', 'handwork-sarees'], collections: ['nazar', 'collection-2026'] },
    { id: 'ivory-embroidered-saree', plate: '08', name: 'Ivory Embroidered Saree', img: 'card-yellow-saree.webp', alt: 'Ivory saree with embroidered border', avail: 'Ready to Ship', colour: 'ivory yellow', categories: ['sarees', 'handwork-sarees'], collections: ['nazar', 'collection-2026'] }
  ];

  var LABELS = {
    category: {
      'sarees': 'Sarees', 'handwork-sarees': 'Handwork Sarees', 'printed-sarees': 'Printed Sarees', 'poshaks': 'Poshaks',
      'lehenga': 'Lehenga', 'shawls-scarves': 'Shawls/Scarves'
    },
    collection: { 'chaap': 'Chaap', 'nazar': 'Nazar', 'collection-2026': 'Collection 2026', 'collection-2025': 'Collection 2025' }
  };
  var INTROS = {
    'chaap': 'An imprint in carved wood, stamped by hand across silk and mul.',
    'nazar': 'The gaze, in thread: embroidery that rewards a second look.'
  };

  var params = new URLSearchParams(location.search);
  var kind = params.has('collection') ? 'collection' : (params.has('category') ? 'category' : null);
  var slug = kind ? params.get(kind) : null;
  var label = kind && LABELS[kind][slug];
  if (!label) { kind = null; slug = null; }

  // Heading, breadcrumb and active chip
  if (kind) {
    $('[data-shop-kicker]').textContent = kind === 'collection' ? 'Shop by Collection' : 'Shop by Category';
    $('[data-shop-title]').textContent = label;
    if (INTROS[slug]) { $('[data-shop-intro]').textContent = INTROS[slug]; $('[data-shop-intro]').hidden = false; }
    $('[data-crumb]').textContent = label;
    $('[data-crumb-sep]').hidden = false;
    document.title = label + ' — Revikaraj Rathore India';
    $('[data-shop-empty-text]').textContent = 'Pieces from ' + label + ' will be shown here soon. Our designers can walk you through what is in the studio now.';
  }
  $$('[data-chip]').forEach(function (c) {
    var key = c.dataset.chip.split(':');
    var n = key[0] === 'all' ? PIECES.length : PIECES.filter(function (p) {
      return p[key[0] === 'collection' ? 'collections' : 'categories'].indexOf(key[1]) !== -1;
    }).length;
    var count = document.createElement('em');
    count.textContent = n;
    c.appendChild(count);
    c.classList.toggle('on', kind ? c.dataset.chip === kind + ':' + slug : key[0] === 'all');
    if (c.classList.contains('on')) c.setAttribute('aria-current', 'page');
  });

  var grid = $('[data-shop-grid]');
  var empty = $('[data-shop-empty]');
  var count = $('[data-shop-count]');
  var search = $('[data-shop-search]');

  function card(p, i) {
    var imgSrc = (p.img && (p.img.startsWith('data:') || p.img.startsWith('assets/') || p.img.startsWith('http')))
      ? p.img
      : ('assets/images/' + p.img);
    var pid = p.id || (window.RRI_CATALOG ? window.RRI_CATALOG.slugify(p.name) : 'gulnar-handwork-saree');
    var plateNum = p.plate || String(i + 1).padStart(2, '0');
    return '<a href="product.html?id=' + encodeURIComponent(pid) + '" class="card">' +
      '<div class="card-meta"><span>Plate ' + plateNum + '</span><span>' + p.avail + '</span></div>' +
      '<div class="card-frame"><div><div class="slot"><img src="' + imgSrc + '" alt="' + (p.alt || p.name) + '" loading="lazy"></div></div></div>' +
      '<div class="card-name">' + p.name + '</div>' +
      '<div class="price-note">' + (p.priceNote || 'Price available on request') + '</div>' +
      '</a>';
  }

  function render() {
    var q = search.value.trim().toLowerCase();
    var list = PIECES.map(function (p, i) { return { p: p, i: i }; }).filter(function (o) {
      var inGroup = !kind || o.p[kind === 'collection' ? 'collections' : 'categories'].indexOf(slug) !== -1;
      var hit = !q || (o.p.name + ' ' + o.p.colour + ' ' + o.p.avail).toLowerCase().indexOf(q) !== -1;
      return inGroup && hit;
    });
    grid.innerHTML = list.map(function (o) { return card(o.p, o.i); }).join('');
    grid.hidden = !list.length;
    empty.hidden = !!list.length || !!q;
    count.textContent = list.length
      ? list.length + (list.length === 1 ? ' piece' : ' pieces')
      : (q ? 'No pieces match “' + search.value.trim() + '”' : '');
  }

  search.addEventListener('input', render);

  // Phones: filters live in a full-screen sheet
  var openBtn = $('[data-filter-open]');
  function setSheet(open) {
    document.body.classList.toggle('filters-open', open);
    document.body.classList.toggle('no-scroll', open);
    openBtn.setAttribute('aria-expanded', String(open));
    if (open) search.focus(); else openBtn.focus();
  }
  openBtn.addEventListener('click', function () { setSheet(true); });
  $$('[data-filter-close]').forEach(function (b) { b.addEventListener('click', function () { setSheet(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('filters-open')) setSheet(false);
  });
  if (kind) openBtn.lastChild.textContent = 'Filter · ' + label;
  if (location.hash === '#search') { if (window.matchMedia('(max-width: 900px)').matches) setSheet(true); else search.focus(); }
  render();
})();

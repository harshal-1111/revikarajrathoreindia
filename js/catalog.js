/**
 * Revikaraj Rathore India — Central Catalog & Garment Registry
 * Single source of truth for collection garments, lookbook pieces, and dynamic PDPs.
 */
(function () {
  'use strict';

  function slugify(text) {
    return String(text || '')
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  var BASE_PIECES = [
    {
      id: 'gulnar-handwork-saree',
      plate: '01',
      code: 'NZ-26-014',
      name: 'Gulnar Handwork Saree',
      avail: 'Made to Order',
      colour: 'Oxblood & Orange Rust with antique gold',
      fabric: 'Pure silk; zardozi & dabka handwork',
      desc: 'A pure silk saree in deep oxblood and rust, its border worked in zardozi and dabka with a scattered nazar motif across the drape. Paired with an unstitched blouse piece in matching silk.',
      priceNote: 'Price available on request',
      categories: ['sarees', 'handwork-sarees'],
      collections: ['nazar', 'collection-2026'],
      primaryCategory: 'Handwork Sarees',
      primaryCategorySlug: 'handwork-sarees',
      primaryCollection: 'Nazar · Collection 2026',
      img: 'card-orange-handwork-saree.webp',
      alt: 'Orange handwork saree with embroidered florals, full length',
      stills: [
        'assets/images/product-front.webp',
        'assets/images/product-drape.webp',
        'assets/images/product-pallu.webp',
        'assets/images/product-blouse.webp'
      ],
      components: '2 — Saree with unstitched blouse piece',
      care: 'Dry clean only. Store folded in muslin, away from direct light.'
    },
    {
      id: 'blush-rose-saree',
      plate: '02',
      code: 'NZ-26-018',
      name: 'Blush Rose Saree',
      avail: 'Ready to Ship',
      colour: 'Blush Pink with silver-gold micro-sequin',
      fabric: 'Handloom organza silk with tonal sequin embroidery',
      desc: 'A whisper-weight blush pink organza saree adorned with handcrafted micro-sequin florals, finished with a scalloped border and companion tissue blouse piece.',
      priceNote: 'Price available on request',
      categories: ['sarees', 'handwork-sarees'],
      collections: ['nazar', 'collection-2026'],
      primaryCategory: 'Handwork Sarees',
      primaryCategorySlug: 'handwork-sarees',
      primaryCollection: 'Nazar · Collection 2026',
      img: 'card-blush-rose-saree.webp',
      alt: 'Blush saree with a hand-embroidered sequin rose',
      stills: [
        'assets/images/card-blush-rose-saree.webp',
        'assets/images/hero-right-blush-detail.webp',
        'assets/images/deco-artisan-beadwork.webp',
        'assets/images/studio-craft-detail.webp'
      ],
      components: '2 — Saree with companion tissue blouse',
      care: 'Dry clean only. Store folded in acid-free tissue paper.'
    },
    {
      id: 'pink-berry-saree',
      plate: '03',
      code: 'NZ-26-022',
      name: 'Pink Berry Saree',
      avail: 'Ready to Ship',
      colour: 'Berry Pink with resham threadwork',
      fabric: 'Raw silk with resham embroidery & moti drops',
      desc: 'Sculpted in rich berry pink silk, detailed with botanical floral clusters rendered in delicate resham needles and freshwater pearl moti along the pallu border.',
      priceNote: 'Price available on request',
      categories: ['sarees', 'handwork-sarees'],
      collections: ['nazar', 'collection-2026'],
      primaryCategory: 'Handwork Sarees',
      primaryCategorySlug: 'handwork-sarees',
      primaryCollection: 'Nazar · Collection 2026',
      img: 'card-pink-floral-saree.webp',
      alt: 'Pink saree with embroidered berries, full length',
      stills: [
        'assets/images/card-pink-floral-saree.webp',
        'assets/images/hero-left-rose-detail.webp',
        'assets/images/deco-sewing-flatlay.webp',
        'assets/images/consultation-studio.webp'
      ],
      components: '2 — Saree with embroidered blouse piece',
      care: 'Dry clean only. Iron on reverse at low silk setting.'
    },
    {
      id: 'lilac-floral-saree',
      plate: '04',
      code: 'NZ-26-025',
      name: 'Lilac Floral Saree',
      avail: 'Made to Order',
      colour: 'Lilac Purple with antique zari',
      fabric: 'Chanderi tissue silk with zardozi borders',
      desc: 'An ethereal lilac chanderi tissue ensemble shimmering under ambient light, woven with royal Rajasthani floral jaal and antique zari work with badla needlework.',
      priceNote: 'Price available on request',
      categories: ['sarees', 'handwork-sarees'],
      collections: ['nazar', 'collection-2026'],
      primaryCategory: 'Handwork Sarees',
      primaryCategorySlug: 'handwork-sarees',
      primaryCollection: 'Nazar · Collection 2026',
      img: 'card-lilac-saree.webp',
      alt: 'Lilac saree with embroidered florals',
      stills: [
        'assets/images/card-lilac-saree.webp',
        'assets/images/deco-atelier-still-life.webp',
        'assets/images/deco-artisan-beadwork.webp',
        'assets/images/studio-craft-detail.webp'
      ],
      components: '2 — Saree with woven tissue blouse',
      care: 'Dry clean only. Roll on wooden rod to prevent crease marks.'
    },
    {
      id: 'black-embroidered-saree',
      plate: '05',
      code: 'NZ-26-029',
      name: 'Black Embroidered Saree',
      avail: 'Ready to Ship',
      colour: 'Midnight Black with tonal bullion stitch',
      fabric: 'Mulberry satin silk with tonal handwork',
      desc: 'A dramatic midnight black evening drape featuring raised bullion work and matte crystals reflecting quiet, understated opulence across the fluid drape.',
      priceNote: 'Price available on request',
      categories: ['sarees', 'handwork-sarees'],
      collections: ['nazar', 'collection-2026'],
      primaryCategory: 'Handwork Sarees',
      primaryCategorySlug: 'handwork-sarees',
      primaryCollection: 'Nazar · Collection 2026',
      img: 'card-black-embroidered-saree.webp',
      alt: 'Black saree with tonal embroidery',
      stills: [
        'assets/images/card-black-embroidered-saree.webp',
        'assets/images/hero-left-rose-detail.webp',
        'assets/images/deco-sewing-flatlay.webp',
        'assets/images/studio-craft-detail.webp'
      ],
      components: '2 — Saree with unstitched satin blouse',
      care: 'Dry clean only. Keep wrapped in dark breathable garment cover.'
    },
    {
      id: 'lime-floral-saree',
      plate: '06',
      code: 'CH-26-008',
      name: 'Lime Floral Saree',
      avail: 'Ready to Ship',
      colour: 'Lime Green with antique marodi & gota',
      fabric: 'Handblock-printed mulmul silk with gota patti',
      desc: 'From the Chaap series, master woodcut block print across vibrant lime green mulmul silk, trimmed with delicate marodi and beaten gota accents on the hemlines.',
      priceNote: 'Price available on request',
      categories: ['sarees', 'handwork-sarees', 'printed-sarees'],
      collections: ['chaap', 'collection-2026'],
      primaryCategory: 'Printed Sarees',
      primaryCategorySlug: 'printed-sarees',
      primaryCollection: 'Chaap · Collection 2026',
      img: 'card-lime-saree.webp',
      alt: 'Lime saree with embroidered florals, full length',
      stills: [
        'assets/images/card-lime-saree.webp',
        'assets/images/collection-chaap.webp',
        'assets/images/deco-atelier-still-life.webp',
        'assets/images/studio-craft-detail.webp'
      ],
      components: '2 — Saree with printed silk blouse piece',
      care: 'Dry clean only. Preserve in cool, dry wardrobe.'
    },
    {
      id: 'pink-rose-saree',
      plate: '07',
      code: 'NZ-26-033',
      name: 'Pink Rose Saree',
      avail: 'Made to Order',
      colour: 'Rose Pink & Vermilion',
      fabric: 'Pure georgette with aari taari handwork',
      desc: 'A radiant confluence of vermilion and rose pink in fluid georgette, richly worked with heirloom aari embroidery inspired by Mewari frescoes and heritage palaces.',
      priceNote: 'Price available on request',
      categories: ['sarees', 'handwork-sarees'],
      collections: ['nazar', 'collection-2026'],
      primaryCategory: 'Handwork Sarees',
      primaryCategorySlug: 'handwork-sarees',
      primaryCollection: 'Nazar · Collection 2026',
      img: 'card-pink-red-floral-saree.webp',
      alt: 'Pink saree with red embroidered flowers, full length',
      stills: [
        'assets/images/card-pink-red-floral-saree.webp',
        'assets/images/hero-left-rose-detail.webp',
        'assets/images/deco-artisan-beadwork.webp',
        'assets/images/consultation-studio.webp'
      ],
      components: '2 — Saree with companion georgette blouse',
      care: 'Dry clean only. Store flat in cotton casing.'
    },
    {
      id: 'ivory-embroidered-saree',
      plate: '08',
      code: 'NZ-26-041',
      name: 'Ivory Embroidered Saree',
      avail: 'Ready to Ship',
      colour: 'Ivory & Antique Gold',
      fabric: 'Katan silk with dense karchobi borders',
      desc: 'An archival ivory katan silk saree distinguished by dense karchobi borders and geometric pallu finery, celebrating classical Indian handcraft and royal minimalism.',
      priceNote: 'Price available on request',
      categories: ['sarees', 'handwork-sarees'],
      collections: ['nazar', 'collection-2026'],
      primaryCategory: 'Handwork Sarees',
      primaryCategorySlug: 'handwork-sarees',
      primaryCollection: 'Nazar · Collection 2026',
      img: 'card-yellow-saree.webp',
      alt: 'Ivory saree with embroidered border',
      stills: [
        'assets/images/card-yellow-saree.webp',
        'assets/images/deco-artisan-beadwork.webp',
        'assets/images/deco-atelier-still-life.webp',
        'assets/images/studio-craft-detail.webp'
      ],
      components: '2 — Saree with heavy karchobi blouse piece',
      care: 'Dry clean only. Wrap in unbleached muslin.'
    }
  ];

  /**
   * Reads extra products added through the admin panel
   */
  function getAdminPieces() {
    try {
      var raw = localStorage.getItem('rri_admin_products');
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed.filter(function (p) {
        // filter out seed items that match initial BASE_PIECES by name
        return !BASE_PIECES.some(function (b) {
          return b.name.toLowerCase() === (p.name || '').toLowerCase();
        });
      }).map(function (p, idx) {
        var slug = slugify(p.name || ('piece-' + (idx + 1)));
        var catSlug = slugify(p.category || 'sarees');
        var colSlug = slugify(p.collection || 'collection-2026');
        var imgUrl = p.img || 'assets/images/card-orange-handwork-saree.webp';
        return {
          id: slug,
          plate: String(BASE_PIECES.length + idx + 1).padStart(2, '0'),
          code: 'RR-' + (p.id ? p.id.replace('PROD-', '') : (idx + 10)),
          name: p.name || 'Atelier Garment',
          avail: p.avail || 'Made to Order',
          colour: p.colour || 'Bespoke Royal',
          fabric: p.category ? (p.category + ' with hand embroidery') : 'Pure handloom silk with zardozi accents',
          desc: 'A masterwork handcrafted in the Revikaraj Rathore India atelier, featuring refined artisanal embellishment and bespoke finishing tailored to your measures.',
          priceNote: p.priceMode || 'Price available on request',
          categories: [catSlug, 'sarees', 'handwork-sarees'],
          collections: [colSlug, 'collection-2026'],
          primaryCategory: p.category || 'Handwork Sarees',
          primaryCategorySlug: catSlug,
          primaryCollection: p.collection || 'Collection 2026',
          img: imgUrl,
          alt: (p.name || 'Garment') + ' lookbook photograph',
          stills: [imgUrl, imgUrl, 'assets/images/deco-artisan-beadwork.webp', 'assets/images/studio-craft-detail.webp'],
          components: '2 — Saree with blouse piece',
          care: 'Dry clean only. Store folded in muslin, away from direct light.'
        };
      });
    } catch (e) {
      console.warn('Could not read admin products:', e);
      return [];
    }
  }

  function getAllPieces() {
    var admin = getAdminPieces();
    return BASE_PIECES.concat(admin);
  }

  function getPieceById(id) {
    if (!id) return BASE_PIECES[0];
    var targetSlug = slugify(id);
    var all = getAllPieces();
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === targetSlug || slugify(all[i].name) === targetSlug) {
        return all[i];
      }
    }
    // Fallback if not found
    return BASE_PIECES[0];
  }

  window.RRI_CATALOG = {
    slugify: slugify,
    basePieces: BASE_PIECES,
    getAllPieces: getAllPieces,
    getPieceById: getPieceById
  };
})();

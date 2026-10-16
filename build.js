// VTech uPVC, "system" landing page. Design reference: congrue.ai (dark charcoal, mono labels, hairlines, one pinned scroll story).
// Story: one window becomes a whole-home opening schedule as you scroll. No prices or invented numbers; every product line repeats what VTech publishes.
// Colours stay VTech brand: sky blue accent on charcoal, blue/white only. Run: node build.js
const fs = require('fs');
const path = require('path');
const { PRODUCTS, GROUPS } = require('./data.js');
const REV = { html: require('./reviews-section.js')({ formHref: '#hq', line: 'upvc' }), css: fs.readFileSync(path.join(__dirname, 'reviews-section.css'), 'utf8'), js: fs.readFileSync(path.join(__dirname, 'reviews-section.client.js'), 'utf8') };

// ---- Google Ads / Analytics config: paste your IDs here, rebuild, redeploy. Empty = no tags are loaded. ----
const GA4_ID = '';          // e.g. 'G-XXXXXXXXXX'
const ADS_ID = '';          // e.g. 'AW-1234567890'
const ADS_LEAD_LABEL = '';  // conversion label, e.g. 'AbC-D_efG-h12345'
const SITE = 'https://vtech-upvc-full.vercel.app/';
const A = 'img2/', I = 'img/';
const P1 = '+91 97404 22863', P2 = '+91 99801 11468', EMAIL = 'vtechbuildingsystems@gmail.com';
const tel = (p) => 'tel:' + p.replace(/\s/g, '');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
const IMG = { 'inward-outward-opening-windows': 'prod-inward-outward', 'top-hung-casement-window': 'prod-top-hung', 'tilt-and-turn-casement-window': 'prod-tilt-turn', 'fixed-glazing-casement-window': 'prod-fixed-glazing', 'french-door': 'prod-french-door', 'multi-sliding-doors': 'prod-multi-sliding', 'two-track-sliding-windows': 'prod-two-track', 'three-track-sliding-windows': 'prod-three-track', 'monorail-sliding-windows': 'prod-monorail', 'fly-mesh-sliding-windows': 'prod-fly-mesh' };
const CLIENTS = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((n) => I + 'Picture' + n + '.webp');

/* the pinned story: [mark, opening, product id, line] (each line is a feature VTech publishes for that product) */
const SCH = [
  ['W-1', 'Living room', 'two-track-sliding-windows', 'Saves interior space'],
  ['W-2', 'Bedroom', 'tilt-and-turn-casement-window', 'Tilt position gives draft-free ventilation'],
  ['D-1', 'Balcony', 'multi-sliding-doors', 'Panels stack side by side when open'],
  ['W-3', 'Kitchen', 'inward-outward-opening-windows', 'Pile seals help keep out dust'],
  ['D-2', 'Garden side', 'french-door', 'Insulates against noise, heat and dust'],
  ['W-4', 'Insect-prone side', 'fly-mesh-sliding-windows', 'Fly mesh shutters'],
  ['F-1', 'Feature view', 'fixed-glazing-casement-window', 'Fixed pane for uninterrupted views'],
  ['W-5', 'Hall', 'three-track-sliding-windows', 'Improved breeze and better ventilation'],
  ['W-6', 'Utility', 'top-hung-casement-window', 'Multiple quality inspections before dispatch'],
];
const FAQ = [
  ['How long does the entire process take?', 'VTech states the typical timeline from first site visit to final installation is 18–21 days, covering measurement, design approval, custom manufacturing in its Bengaluru factory, and installation.'],
  ['Is the site visit really free?', 'Yes. Share your details and a VTech expert visits your site for measurement and design recommendations, with no charge for the consultation.'],
  ['Can I see the products before deciding?', 'Yes. Visit the showroom at M.N.S Arcade, Dr. Rajkumar Road, 6th Block, Rajajinagar, Bangalore. VTech also offers tours of its manufacturing facility at Kalenahalli.'],
  ['Do you remove the old windows?', 'Yes. VTech’s installation team removes existing windows, clears the debris and installs the new ones.'],
  ['What warranty do you provide?', 'VTech states a 20-year manufacturer warranty on its uPVC windows and doors.'],
  ['Which areas do you serve?', 'All of Bangalore, including Whitefield, Sarjapur, Electronic City, HSR, Indiranagar, Hebbal, Jayanagar and Rajajinagar, plus larger projects across Karnataka and India.'],
];
const LD0 = [{ '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: 'V-Tech Building Systems Pvt. Ltd', url: SITE, telephone: ['+919740422863'], email: EMAIL, address: { '@type': 'PostalAddress', streetAddress: 'No. 693, M.N.S Arcade, 3rd Floor, Dr. Rajkumar Rd, 6th Block, Rajajinagar', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: '560010', addressCountry: 'IN' }, openingHours: 'Mo-Su 09:00-21:00', image: SITE + A + 'gallery-1.webp' },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }];

const LD = LD0.concat([{ '@context': 'https://schema.org', '@type': 'ItemList', name: 'uPVC windows and doors by V-Tech', itemListElement: PRODUCTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Product', name: p.name, description: p.desc.slice(0, 200), image: SITE + A + IMG[p.id] + '.webp', brand: { '@type': 'Brand', name: 'V-Tech' } } })) }]);
LD[0].areaServed = ['Bengaluru', 'Whitefield', 'Sarjapur', 'Electronic City', 'HSR Layout', 'Indiranagar', 'Hebbal', 'Jayanagar', 'Rajajinagar'];
const opts = PRODUCTS.map((p) => `<option>${esc(p.name)}</option>`).join('');
const schRows = SCH.map(([m, o, id, l], i) => `<div class="sr" data-i="${i}"><b>${m}</b><span class="sr__o">${o}</span><span class="sr__p">${esc(byId[id].name)}</span><em>${l}</em></div>`).join('');
const segs = SCH.map(() => '<i></i>').join('');
const plist = PRODUCTS.map((p, i) => `<a class="pl" href="#hq" data-pick="${esc(p.name)}"><span class="pl__n">${String(i + 1).padStart(2, '0')}</span><span class="pl__t">${esc(p.name)}</span><span class="pl__f">${esc(p.features[0])}</span><span class="pl__a">Get quote →</span><img src="${A + IMG[p.id]}.webp" alt="" width="360" height="270" loading="lazy"></a>`).join('');
const BEN = [['Energy efficient', 'Multi-chambered profiles and double glazing keep heat out, so the AC works less.'], ['Soundproof', 'Sealed uPVC frames cut street noise on busy Bangalore roads.'], ['Dust & weather proof', 'EPDM gasket seals block dust, monsoon water and pollen.'], ['Maintenance free', 'No painting, no rusting, no termites. Wipe with a damp cloth.'], ['100% lead free', 'Made from European-grade raw material, safe for your family.'], ['Weather tested', 'Profiles tested for 25,000+ hours of weathering, built for Indian climate extremes.']];
const FIN = [['finish-white', 'Classic White', 'Timeless. The most popular choice.'], ['finish-oak', 'Golden Oak', 'Warm wood-grain laminate.'], ['finish-walnut', 'Dark Walnut', 'Rich teak-like finish.'], ['finish-grey', 'Anthracite Grey', 'Modern, architectural look.']];
const BIMG = ['gallery-3.webp', 'gallery-6.webp', 'gallery-1.webp', 'gallery-5.webp', 'finish-white.webp', 'gallery-4.webp'];
const sv = (p) => `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const BICON = [sv('<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>'), sv('<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>'), sv('<path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.5C6 9.2 12 3 12 3z"/>'), sv('<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/>'), sv('<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2.2 2.2L15.5 10"/>'), sv('<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h8"/>')];
const STEPS = [['Book free visit', 'Share your details. Our expert visits at a time that suits you.'], ['Site measurement', 'Accurate measurement and design recommendations for every opening.'], ['Custom manufacturing', 'We manufacture in our Bengaluru factory using European-grade profiles.'], ['Installation & warranty', 'Clean installation by our team, backed by a 20-year manufacturer warranty.']];
const AREAS = ["Whitefield", "Sarjapur", "Electronic City", "HSR Layout", "Indiranagar", "Hebbal", "Jayanagar", "Rajajinagar"];
// whole sentences only, never an ellipsis: keep adding sentences while the text stays within ~210 characters
const shortDesc = (d) => { const parts = d.match(/[^.!?]+[.!?]+(\s|$)/g) || [d]; let out = ''; for (const x of parts) { if (out && (out + x).length > 210) break; out += x; } return out.trim(); };
const stackCards = PRODUCTS.map((p, i) => `<article class="sc" data-i="${i}"><div class="sc__img"><img src="${A + IMG[p.id]}.webp" alt="${esc(p.name)}, image from VTech" width="900" height="675" loading="${i < 2 ? 'eager' : 'lazy'}"></div>
<div class="sc__b"><span class="sc__n">${String(i + 1).padStart(2, '0')} / ${String(PRODUCTS.length).padStart(2, '0')} · ${esc(GROUPS.find((g) => g.id === p.group).name)}</span><h3>${esc(p.name)}</h3><p>${esc(shortDesc(p.desc))}</p>
<ul>${p.features.slice(0, 3).map((f) => `<li>${esc(f)}</li>`).join('')}</ul><a class="btn btn--pill" href="#hq" data-pick="${esc(p.name)}">Get quote for this →</a></div></article>`).join('');
const GAL = [['gallery-1', 'Modern home exterior'], ['gallery-2', 'Tower balcony'], ['gallery-3', 'Independent villa'], ['gallery-4', 'High-rise apartment'], ['gallery-5', 'Garden-facing villa'], ['gallery-6', 'Bedroom']];

const THEME = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const REVTHEME = fs.readFileSync(path.join(__dirname, 'reviews-theme.css'), 'utf8');
const css = `
:root{--bg:#0F1620;--bg2:#102A57;--ln:#1B4E87;--tx:#F1F1EC;--mu:#A9AEB8;--ac:#E85A1A;--blue:#0E4B8C;--paper:#FAF6EE;--ink:#4B5667;--e:cubic-bezier(.2,.8,.2,1)}
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;scroll-padding-top:72px}
body{font:400 17px/1.55 'Archivo',Verdana,sans-serif;font-stretch:100%;color:var(--tx);background:var(--bg);-webkit-font-smoothing:antialiased;overflow-x:clip}
img{max-width:100%;display:block}a{color:inherit;text-decoration:none}ul{list-style:none}
.mono,.lab,.btn,.sr b,.sr__o,.cnt,.pl__n,.pl__a,.foot,.lf label,.hd__t{font-family:'JetBrains Mono',ui-monospace,Consolas,monospace;letter-spacing:.02em}
h1,h2,h3{font-weight:600;line-height:1.02;letter-spacing:-.02em}
.wrap{width:min(1280px,100% - 40px);margin:0 auto}
.lab{display:block;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ac);margin-bottom:14px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 26px;border:0;border-radius:6px;background:var(--ac);color:#0d1b24;font-size:15px;font-weight:600;cursor:pointer;transition:transform .25s var(--e),background .25s}
.btn:hover{transform:translateY(-2px);background:#9CC2E8}.btn--o{background:transparent;color:var(--tx);border:1px solid var(--ln)}.btn--o:hover{background:var(--bg2);border-color:var(--mu)}
/* header */
.hd{position:fixed;inset:0 0 auto;z-index:50;border-bottom:1px solid transparent;transition:background .3s,border-color .3s}.hd.s{background:rgba(10,27,61,.95);border-color:var(--ln);}
.hd .wrap{display:flex;align-items:center;justify-content:space-between;min-height:68px;gap:14px}
.logo{display:flex;align-items:center;gap:10px;font:800 26px 'Archivo',sans-serif;font-stretch:125%;letter-spacing:-.01em}.logo img{width:38px;height:38px;object-fit:contain}
.hd__r{display:flex;align-items:center;gap:14px}.hd__t{font-size:14px;color:var(--tx);padding:0 4px;min-height:44px;display:flex;align-items:center}.hd .btn{min-height:44px;padding:0 20px;font-size:14px}
/* hero */
.hero{background:linear-gradient(105deg,rgba(1,20,52,.94) 0%,rgba(2,42,99,.82) 50%,rgba(14,75,140,.5) 100%),url(img2/hero-building.webp) center/cover;min-height:0;display:grid;align-items:center;padding:88px 0 36px;border-bottom:1px solid var(--ln)}
.hero h1{font-size:clamp(40px,7vw,96px);max-width:15ch;margin-bottom:24px}.hero p{font-size:clamp(17px,1.7vw,21px);color:var(--mu);max-width:640px;margin-bottom:32px}
.hero__g{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(300px,.7fr);gap:clamp(28px,5vw,80px);align-items:center}
.hero h1{font-size:clamp(32px,4.2vw,58px);max-width:20ch;margin-bottom:16px}.h1b{display:block;color:var(--mu);font-size:.62em;font-weight:500;margin-top:10px;letter-spacing:-.01em}.hero p{margin-bottom:16px;font-size:clamp(15px,1.4vw,18px)}
.bul{display:grid;gap:7px;margin-bottom:20px;font-size:15px}.bul li:nth-child(4){display:none}.bul li{display:flex;gap:12px;align-items:flex-start}.bul li:before{content:"✓";font:600 14px 'JetBrains Mono',monospace;color:var(--ac);margin-top:3px}
.lf--hero{max-width:600px}.lf__r{display:grid;grid-template-columns:1fr 1fr;gap:12px}.lf__n{font:400 13px 'JetBrains Mono',monospace;color:var(--mu);text-align:center}.lf__n a{color:var(--tx);border-bottom:1px solid var(--ln)}
.ph{position:relative;border-radius:14px;overflow:visible}.ph img{width:100%;height:auto;aspect-ratio:4/5;max-height:calc(100vh - 150px);object-fit:cover;border-radius:14px;border:1px solid var(--ln)}
.ph__b{position:absolute;display:flex;flex-direction:column;padding:12px 18px;background:rgba(10,27,61,.92);backdrop-filter:blur(8px);border:1px solid var(--ln);border-radius:10px;box-shadow:0 20px 40px -16px rgba(0,0,0,.7);animation:fl 5s ease-in-out infinite}
.ph__b b{font:600 26px 'Archivo',sans-serif;color:var(--ac);line-height:1}.ph__b span{font:400 11px 'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.1em;color:var(--mu);margin-top:4px}
.ph__b--1{left:-28px;top:12%}.ph__b--2{right:-18px;top:46%;animation-delay:1.2s}.ph__b--3{left:-14px;bottom:8%;animation-delay:2.4s}@keyframes fl{50%{transform:translateY(-8px)}}
.proofbar{background:var(--bg2);border-bottom:1px solid var(--ln)}.proofbar .wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.proofbar div{padding:22px 8px;text-align:center}.proofbar b{display:block;font:600 clamp(24px,3vw,38px) 'Archivo',sans-serif;color:var(--ac)}.proofbar span{font:400 12px 'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.1em;color:var(--mu)}
.ben{border-bottom:1px solid var(--ln)}.ben .wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--ln);border-left:1px solid var(--ln);border-right:1px solid var(--ln)}.ben div{background:var(--bg);padding:30px 24px}.ben h3{font-size:20px;margin-bottom:8px}.ben p{font-size:14.5px;color:var(--mu)}
@keyframes up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.hero__l>*{animation:up .8s var(--e) both}.hero__l>*:nth-child(2){animation-delay:.08s}.hero__l>*:nth-child(3){animation-delay:.16s}.hero__l>*:nth-child(4){animation-delay:.24s}.hero__l>*:nth-child(5){animation-delay:.32s}.ph{animation:up 1s var(--e) .2s both}
.ben div{position:relative;transition:background .35s}.ben div:before{content:"";position:absolute;left:0;top:0;height:2px;width:0;background:var(--ac);transition:width .5s var(--e)}.ben div:hover{background:var(--bg2)}.ben div:hover:before{width:100%}
.ben h3:before{content:attr(data-n);display:block;font:500 12px 'JetBrains Mono',monospace;color:var(--ac);margin-bottom:14px;letter-spacing:.12em}
.seo{max-width:760px;color:var(--mu);margin-bottom:24px}.chips{display:flex;flex-wrap:wrap;gap:10px}.chips li{padding:9px 16px;border:1px solid var(--ln);border-radius:99px;font:400 13px 'JetBrains Mono',monospace;color:var(--tx)}
.band{background:linear-gradient(120deg,var(--blue),#0a56c8);position:relative;overflow:hidden}.band:before{content:"";position:absolute;right:-40px;top:-60px;width:320px;height:320px;opacity:.12;background:linear-gradient(90deg,transparent 49%,#fff 49%,#fff 51%,transparent 51%),linear-gradient(0deg,transparent 49%,#fff 49%,#fff 51%,transparent 51%);background-size:160px 160px;border:2px solid #fff;border-radius:14px}.band .wrap{position:relative}
.lf__st.ok{color:#9CC2E8}
.hl{display:flex;gap:10px;flex-wrap:wrap;max-width:560px}.hl input{flex:1 1 220px;min-height:52px;padding:0 16px;font:400 16px 'JetBrains Mono',monospace;color:var(--tx);background:var(--bg2);border:1px solid var(--ln);border-radius:6px}.hl input:focus{outline:none;border-color:var(--ac);box-shadow:0 0 0 3px rgba(110,193,228,.2)}.hl input[aria-invalid=true]{border-color:#fff}
.hl__st{flex-basis:100%;font:500 13px 'JetBrains Mono',monospace;color:var(--ac)}.hl__st:empty{display:none}.hero .sub{margin-top:18px;font:400 13px 'JetBrains Mono',monospace;color:var(--mu)}.hero .sub a{color:var(--tx);border-bottom:1px solid var(--ln)}
.hero__sc{margin-top:clamp(36px,5vw,64px);display:flex;flex-wrap:wrap;gap:12px 44px}.hero__sc div b{display:block;font:600 clamp(26px,3.2vw,40px) 'Archivo',sans-serif;color:var(--tx)}.hero__sc div span{font:400 12px 'JetBrains Mono',monospace;color:var(--mu);text-transform:uppercase;letter-spacing:.1em}
/* pinned story */
.story{position:relative;height:620vh;border-bottom:1px solid var(--ln)}.story__in{position:sticky;top:0;height:100vh;display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(24px,4vw,64px);align-items:center;padding:78px 0 24px}
.story h2{font-size:clamp(32px,4.6vw,64px);margin-bottom:18px}.story__p{color:var(--mu);max-width:420px;margin-bottom:26px}
.seg{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:6px;margin-bottom:10px}.seg i{height:3px;background:var(--ln);border-radius:2px;position:relative;overflow:hidden}.seg i:after{content:"";position:absolute;inset:0;background:var(--ac);transform:scaleX(0);transform-origin:0;transition:transform .5s var(--e)}.seg i.on:after{transform:none}
.stat{display:flex;justify-content:space-between;font-size:14px;color:var(--tx)}.stat .cnt{color:var(--ac)}
.sched{background:var(--bg2);border:1px solid var(--ln);border-radius:10px;overflow:hidden}
.sched__h{display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px solid var(--ln);font:500 12px 'JetBrains Mono',monospace;letter-spacing:.12em;color:var(--mu);text-transform:uppercase}
.sr{display:grid;grid-template-columns:54px 1fr 1.3fr;gap:4px 14px;align-items:baseline;padding:12px 20px;border-bottom:1px solid var(--ln);opacity:0;transform:translateY(14px);transition:opacity .5s var(--e),transform .5s var(--e),background .4s}
.sr.on{opacity:1;transform:none}.sr.cur{background:rgba(110,193,228,.09)}.sr b{font-size:13px;color:var(--ac)}.sr__o{font-size:13px;color:var(--mu)}.sr__p{font-weight:600;font-size:clamp(15px,1.4vw,18px)}
.sr em{grid-column:2/4;font-style:normal;font-size:13.5px;color:var(--mu);max-height:0;overflow:hidden;transition:max-height .5s var(--e)}.sr.cur em{max-height:30px}
.sched__f{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;font:500 13px 'JetBrains Mono',monospace;color:var(--tx);text-transform:uppercase;letter-spacing:.08em;min-height:58px}.sched__f .ok{color:var(--ac);opacity:0;transition:opacity .5s}.sched__f .ok.on{opacity:1}
.note{margin-top:12px;font:400 12px 'JetBrains Mono',monospace;color:var(--mu)}
/* sections */
.sec{padding:clamp(40px,5vw,72px) 0;border-bottom:1px solid var(--ln)}.sec h2{font-size:clamp(28px,3.8vw,48px);max-width:20ch;margin-bottom:clamp(20px,3vw,36px)}
.gl{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--ln);border:1px solid var(--ln)}.gl figure{position:relative;background:var(--bg);overflow:hidden}.gl img{width:100%;aspect-ratio:4/3;object-fit:cover;filter:saturate(.9);transition:transform .8s var(--e),filter .4s}.gl figure:hover img{transform:scale(1.05);filter:none}
.gl figcaption{position:absolute;left:0;right:0;bottom:0;padding:26px 16px 12px;font:500 12px 'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;background:linear-gradient(0deg,rgba(10,27,61,.92),transparent)}
.pl{position:relative;display:grid;grid-template-columns:60px 1.1fr 1.4fr auto;gap:16px;align-items:center;padding:22px 8px;border-top:1px solid var(--ln);transition:background .3s,padding .3s var(--e)}.pls{border-bottom:1px solid var(--ln)}
.pl:hover{background:var(--bg2);padding-left:22px}.pl__n{font-size:13px;color:var(--ac)}.pl__t{font:600 clamp(19px,2.3vw,30px) 'Archivo',sans-serif;letter-spacing:-.01em}.pl__f{font-size:14.5px;color:var(--mu)}.pl__a{font-size:13px;color:var(--ac);white-space:nowrap}
.pl img{position:absolute;right:140px;top:50%;width:200px;height:150px;object-fit:cover;border-radius:8px;transform:translateY(-50%) scale(.9) rotate(-3deg);opacity:0;pointer-events:none;transition:all .4s var(--e);z-index:2;box-shadow:0 20px 50px -10px rgba(0,0,0,.7)}.pl:hover img{opacity:1;transform:translateY(-50%) scale(1) rotate(-3deg)}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--ln);border:1px solid var(--ln)}.steps div{background:var(--bg);padding:28px 24px}.steps b{display:block;font:500 13px 'JetBrains Mono',monospace;color:var(--ac);margin-bottom:26px}.steps h3{font-size:clamp(20px,2vw,26px);margin-bottom:10px}.steps p{font-size:15px;color:var(--mu)}
.band{background:var(--blue);border-bottom:1px solid var(--ln)}.band .wrap{display:flex;flex-wrap:wrap;gap:18px 30px;align-items:center;justify-content:space-between;padding:clamp(26px,3.4vw,44px) 0}.band h3{font-size:clamp(22px,2.8vw,34px);margin-bottom:4px;color:#fff}.band p{color:#E6E2D8;font-size:15px}.band__b{display:flex;gap:12px;flex-wrap:wrap}.band .btn{background:#fff;color:var(--blue)}.band .btn--o{background:transparent;color:#fff;border-color:rgba(255,255,255,.55)}
.light{background:var(--paper);color:var(--ink);border-bottom:0}
.cl{overflow:hidden;margin-top:38px;-webkit-mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}.cl div{display:flex;gap:14px;width:max-content;animation:mq 50s linear infinite}.cl span{display:grid;place-items:center;width:160px;height:86px;padding:12px;background:#fff;border-radius:8px}.cl img{max-height:56px;width:auto;object-fit:contain}@keyframes mq{to{transform:translateX(-50%)}}
.faq{max-width:900px}.faq details{border-top:1px solid var(--ln)}.faq details:last-child{border-bottom:1px solid var(--ln)}.faq summary{display:flex;justify-content:space-between;gap:16px;align-items:center;padding:22px 4px;font:600 clamp(17px,1.8vw,22px) 'Archivo',sans-serif;cursor:pointer;list-style:none;min-height:64px}.faq summary::-webkit-details-marker{display:none}.faq summary:after{content:"+";font:400 26px 'JetBrains Mono',monospace;color:var(--ac);transition:transform .3s}.faq details[open] summary:after{transform:rotate(45deg)}.faq p{padding:0 4px 24px;color:var(--mu);max-width:720px}
.final{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.8fr);gap:clamp(28px,5vw,80px);align-items:start;border-bottom:0}.final h2{margin-bottom:20px}.final p{color:var(--mu);max-width:460px}
.addr{margin-top:28px;display:grid;gap:8px;font:400 13px 'JetBrains Mono',monospace;color:var(--mu)}.addr a{color:var(--tx)}
.lf{display:grid;gap:14px;background:var(--bg2);border:1px solid var(--ln);border-radius:10px;padding:clamp(20px,2.6vw,32px)}.lf label{display:grid;gap:7px;font-size:12px;text-transform:uppercase;color:var(--mu);letter-spacing:.1em}
.lf input,.lf select{width:100%;min-height:50px;padding:0 14px;font:400 16px 'Archivo',sans-serif;color:var(--tx);background:var(--bg);border:1px solid var(--ln);border-radius:6px}.lf input:focus,.lf select:focus{outline:none;border-color:var(--ac);box-shadow:0 0 0 3px rgba(110,193,228,.2)}.lf [aria-invalid=true]{border-color:#fff}.lf option{color:#111}
.lf .btn{width:100%}.lf__st{font:500 13px 'JetBrains Mono',monospace;color:var(--ac)}.lf__st:empty{display:none}
.foot{padding:26px 0 90px;font-size:12px;color:var(--mu);text-transform:uppercase;letter-spacing:.08em;border-top:1px solid var(--ln)}.foot .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px}
.mbar{position:fixed;left:0;right:0;bottom:0;z-index:60;display:none;gap:10px;padding:10px 12px calc(10px + env(safe-area-inset-bottom));background:var(--bg);border-top:1px solid var(--ln);transform:translateY(110%);transition:transform .4s var(--e)}.mbar.on{transform:none}.mbar .btn{flex:1;font-size:14px;padding:0 8px}
.rv{opacity:0;transform:translateY(26px);transition:opacity .8s var(--e),transform .8s var(--e)}.rv.vis{opacity:1;transform:none}
@media(max-width:980px){.hero__g{grid-template-columns:1fr}.hero__r{order:-1;max-width:380px}.ph img{aspect-ratio:16/11}.ph__b--1{left:8px}.ph__b--2{right:8px}.ph__b--3{display:none}.proofbar .wrap{grid-template-columns:1fr 1fr}.ben .wrap{grid-template-columns:1fr 1fr}.story{height:560vh}.story__in{grid-template-columns:1fr;align-content:center;gap:16px;padding-top:70px}.story__p{display:none}.story h2{font-size:30px;margin-bottom:8px}.sr{grid-template-columns:44px 1fr;padding:9px 14px}.sr__o{display:none}.sr em{grid-column:2}.pl{grid-template-columns:40px 1fr;gap:4px 12px}.pl__f,.pl__a{grid-column:2}.pl img{display:none}.steps{grid-template-columns:1fr 1fr}.gl{grid-template-columns:1fr 1fr}.final{grid-template-columns:1fr}.mbar{display:flex}.hd__t span{display:none}}
@media(max-width:560px){.lf__r{grid-template-columns:1fr}.ben .wrap{grid-template-columns:1fr}.hero__r{display:none}.bul li:nth-child(n+3){display:none}.steps{grid-template-columns:1fr}.gl{grid-template-columns:1fr}.hero{padding-top:96px}}
@media(prefers-reduced-motion:reduce){.story{height:auto}.story__in{position:static;height:auto;padding:70px 0}.sr{opacity:1;transform:none}.sr em{max-height:30px}*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}html{scroll-behavior:auto}}
`;

const js = `
window.dataLayer=window.dataLayer||[];
window.VTECH_REVIEWS_URL=window.VTECH_REVIEWS_URL||'/api/reviews';
function track(n,p){try{window.dataLayer.push(Object.assign({event:n},p||{}));if(window.gtag)window.gtag('event',n,p||{})}catch(e){}}
window.VTECH_LEAD_ENDPOINT=window.VTECH_LEAD_ENDPOINT||'';
var UTM={};try{var q=new URLSearchParams(location.search);['gclid','utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(function(k){var v=q.get(k);if(v){UTM[k]=v;sessionStorage.setItem('u_'+k,v)}else{var s=sessionStorage.getItem('u_'+k);if(s)UTM[k]=s}})}catch(e){}
function clean(p){return p.replace(/[\\s-]/g,'').replace(/^(\\+91|91|0)/,'')}
function send(d,say,f){Object.assign(d,UTM);track('generate_lead',{product:d.product||'n/a'});${ADS_ID && ADS_LEAD_LABEL ? `if(window.gtag)gtag('event','conversion',{send_to:'${ADS_ID}/${ADS_LEAD_LABEL}'});` : ''}
 if(window.VTECH_LEAD_ENDPOINT){say('Sending…');fetch(window.VTECH_LEAD_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}).then(function(r){if(!r.ok)throw 0;f.reset();say('Thank you. VTech will call you shortly.')}).catch(function(){say('Could not send. Please call ${P1}.')});return}
 var b='Name: '+(d.name||'-')+(d.last?' '+d.last:'')+(d.email?'\\nEmail: '+d.email:'')+'\\nPhone: '+d.phone+'\\nProduct: '+(d.product||'Not sure yet')+(d.qty?'\\nQuantity: '+d.qty:'')+(d.colour?'\\nColour: '+d.colour:'')+(d.gclid||d.utm_campaign?'\\nSource: '+(d.utm_source||'')+' '+(d.utm_campaign||'')+' '+(d.gclid||''):'')+'\\n\\nI would like a free site visit and quote.';
 location.href='mailto:${EMAIL}?subject='+encodeURIComponent('Free quote request')+'&body='+encodeURIComponent(b);say('Your email app opened with your details. Press Send, or call ${P1}.')}
document.querySelectorAll('[data-hl]').forEach(function(f){var st=f.querySelector('.hl__st'),say=function(t){st.textContent=t};f.addEventListener('submit',function(e){e.preventDefault();var p=clean(f.phone.value);f.phone.removeAttribute('aria-invalid');if(!/^[6-9]\\d{9}$/.test(p)){f.phone.setAttribute('aria-invalid','true');f.phone.focus();say('Enter a valid 10-digit mobile number.');return}send({phone:p,page:location.href},say,f)})});
document.querySelectorAll('[data-lead]').forEach(function(f){var st=f.querySelector('.lf__st'),say=function(t){st.textContent=t};f.addEventListener('submit',function(e){e.preventDefault();var n=f.name.value.trim(),p=clean(f.phone.value);[f.name,f.phone].forEach(function(i){i.removeAttribute('aria-invalid')});
 if(n.length<2){f.name.setAttribute('aria-invalid','true');f.name.focus();say('Please enter your name.');return}
 if(!/^[6-9]\\d{9}$/.test(p)){f.phone.setAttribute('aria-invalid','true');f.phone.focus();say('Enter a valid 10-digit mobile number.');return}
 send({name:n,phone:p,product:f.product?f.product.value:'',last:f.last?f.last.value.trim():'',email:f.email?f.email.value.trim():'',qty:f.qty?f.qty.value:'',colour:(f.colour&&f.colour.value)||'',page:location.href},say,f)})});
document.querySelectorAll('.lchip').forEach(function(c){c.addEventListener('click',function(){var g=c.parentElement;g.querySelectorAll('.lchip').forEach(function(x){x.setAttribute('aria-pressed','false')});c.setAttribute('aria-pressed','true');var h=g.parentElement.querySelector('input[name=colour]');if(h)h.value=c.dataset.v})});
document.querySelectorAll('[data-pick]').forEach(function(a){a.addEventListener('click',function(){var s=document.querySelector('#hq select[name=product]');if(s)s.value=a.dataset.pick;track('select_product',{product:a.dataset.pick})})});
document.querySelectorAll('[data-track]').forEach(function(a){a.addEventListener('click',function(){track('click_'+a.dataset.track)})});
document.querySelectorAll('.proofbar b').forEach(function(b){var m=b.textContent.match(/^(\d+)(.*)$/);if(!m||matchMedia('(prefers-reduced-motion:reduce)').matches)return;var n=+m[1],s=m[2],go=false;new IntersectionObserver(function(es,o){if(!es[0].isIntersecting||go)return;go=true;o.disconnect();var t0=null;(function f(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1300),e=1-Math.pow(1-k,3);b.textContent=Math.round(n*e)+s;if(k<1)requestAnimationFrame(f)})(performance.now())}).observe(b)});
if(window.Lenis&&!matchMedia('(prefers-reduced-motion:reduce)').matches&&matchMedia('(hover:hover)').matches){var L=new Lenis({lerp:.07,wheelMultiplier:.8,touchMultiplier:1,duration:1.3});(function r(t){L.raf(t);requestAnimationFrame(r)})(performance.now());document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();L.scrollTo(t,{offset:-70})}})})}
(function(){var cs=[].slice.call(document.querySelectorAll('.sc')),t=false;if(!cs.length||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 var topC=0;addEventListener('resize',function(){topC=0});function cv(){t=false;if(!topC)topC=parseFloat(getComputedStyle(cs[0]).top)||84;var vh=innerHeight,top=topC,n=cs.length,tops=[],cov=[],dep=[],i,j,d=0;for(i=0;i<n;i++)tops[i]=cs[i].getBoundingClientRect().top;for(i=0;i<n;i++)cov[i]=i===n-1?0:Math.min(1,Math.max(0,(vh-tops[i+1])/(vh-top)*(i+1===n-1?1.5:1.15)));for(j=n-1;j>=0;j--){d+=cov[j];dep[j]=d}for(i=0;i<n;i++){var s=cs[i].style;s.setProperty('--cover',cov[i].toFixed(3));if(i>0)s.setProperty('--enter',Math.min(1,Math.max(0,(vh-tops[i])/(vh-top))).toFixed(3));s.setProperty('--depth',dep[i].toFixed(3))}}
 addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(cv)}},{passive:true});addEventListener('resize',cv);cv()})();
 (function(){var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;  var pg=document.createElement('div');pg.className='prog';pg.setAttribute('aria-hidden','true');document.body.appendChild(pg);  var hd=document.querySelector('.hd'),ly=0,t=false;  var maxS=1;function mS(){maxS=document.documentElement.scrollHeight-innerHeight}mS();addEventListener('resize',mS);addEventListener('load',mS);if(window.ResizeObserver)new ResizeObserver(mS).observe(document.body);function onS(){t=false;var y=scrollY,h=maxS;pg.style.transform='scaleX('+(h>0?Math.min(1,y/h):0)+')';   if(hd&&!rm){if(y>ly+6&&y>240)hd.classList.add('up');else if(y<ly-6||y<120)hd.classList.remove('up')}ly=y}  addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(onS)}},{passive:true});onS();  var cards=[].slice.call(document.querySelectorAll('.sc'));  if(!('IntersectionObserver' in window)||rm){cards.forEach(function(c){c.classList.add('in')})}  else{var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target)}})},{threshold:.25});cards.forEach(function(c){io2.observe(c)})}})(); var hd=document.querySelector('.hd');addEventListener('scroll',function(){hd.classList.toggle('s',scrollY>30)},{passive:true});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{threshold:.12});document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
/* pinned schedule: scroll progress decides how many rows are shown */
(function(){var st=document.querySelector('.story');if(!st||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 var rows=[].slice.call(st.querySelectorAll('.sr')),segs=[].slice.call(st.querySelectorAll('.seg i')),cnt=st.querySelector('.cnt'),ok=st.querySelector('.ok'),ttl=st.querySelector('.stat span'),last=-1,t=false,N=rows.length;
 function upd(){t=false;var r=st.getBoundingClientRect(),k=Math.max(0,Math.min(1,-r.top/(st.offsetHeight-innerHeight))),n=Math.min(N,Math.floor(k*(N+1)));
  if(n===last)return;last=n;rows.forEach(function(x,i){x.classList.toggle('on',i<n);x.classList.toggle('cur',i===n-1&&n<N)});segs.forEach(function(x,i){x.classList.toggle('on',i<n)});
  cnt.textContent=Math.max(1,n)+' / '+N;ok.classList.toggle('on',n>=N);ttl.textContent=n>=N?'Complete schedule':n===0?'Start scrolling':'Openings matched: '+n}
 addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd()})();
var mb=document.querySelector('.mbar'),hero=document.querySelector('.hero');if(mb&&hero)new IntersectionObserver(function(es){mb.classList.toggle('on',!es[0].isIntersecting)}).observe(hero);
`;

let html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>uPVC Windows & Doors in Bangalore | Free Site Visit & Quote | V-Tech</title>
<meta name="description" content="uPVC windows and doors in Bangalore: casement, sliding, French and multi-sliding, made in Bengaluru. Free site visit, measurement and quote. Call ${P1}.">
<meta name="robots" content="index,follow,max-image-preview:large"><meta name="geo.region" content="IN-KA"><meta name="geo.placename" content="Bengaluru">
<link rel="preload" as="image" href="${A}hero-feature.webp">
<meta name="theme-color" content="#FFFFFF"><link rel="canonical" href="${SITE}">
<meta property="og:type" content="website"><meta property="og:title" content="uPVC Windows & Doors in Bangalore | Free Quote | V-Tech"><meta property="og:description" content="Every opening matched. Free site visit, measurement and quote."><meta property="og:image" content="${SITE}${A}hero-feature.webp"><meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(LD)}</script>
<link rel="icon" type="image/svg+xml" href="${I}vtech-icon.svg"><link rel="icon" type="image/png" sizes="32x32" href="${I}vtech-icon-32.png"><link rel="apple-touch-icon" href="${I}vtech-icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap">
${GA4_ID || ADS_ID ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID || ADS_ID}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());${GA4_ID ? `gtag('config','${GA4_ID}');` : ''}${ADS_ID ? `gtag('config','${ADS_ID}');` : ''}</script>` : ''}
<style>${THEME}
${REV.css}
${REVTHEME}
/* ===== phones: keep scrolling light (blur and always-on animation are what make phones stutter) ===== */
@media(max-width:900px){
  *,*::before,*::after{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}
  .lf--card{background:rgba(255,255,255,.97)}
  .hero:before{animation:none!important}
  .sc__img img,.hc .sc__img img{will-change:auto!important}
  .sc{box-shadow:0 18px 36px -24px rgba(2,32,84,.5),0 0 0 1px rgba(14,75,140,.12)!important}
  .foot{padding-bottom:calc(112px + env(safe-area-inset-bottom))!important}
}
@media(min-width:768px) and (max-width:1000px){
  .foot{padding-bottom:28px!important}
}
</style></head><body>
<header class="hd"><div class="wrap"><a class="logo" href="#top" aria-label="V-Tech"><img src="${I}vtech-icon.svg" alt="" width="30" height="30">V-TECH</a><div class="hd__r"><a class="hd__t" href="${tel(P1)}" data-track="call" aria-label="Call ${P1}"><i><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg></i><span><small>Talk to expert</small><b>${P1}</b></span></a><a class="btn hd__q" href="#hq" data-track="cta_header">Get Free Quote</a></div></div></header>
<main id="top">
<section class="hero"><div class="wrap hero__g"><div class="hero__l"><span class="lab">uPVC windows &amp; doors · Bengaluru</span>
<h1>A Better View. <span class="h1b">A Better Way to Live.</span></h1>
<p class="hero__k">uPVC windows &amp; doors in Bangalore. VTech matches every opening in your home with the right window or door, made in its own Bengaluru factory and installed by its own team.</p>
<div class="hero__cta"><a class="btn btn--pill" href="#hq">Book Free Site Visit →</a><a class="btn btn--pill btn--g" href="${tel(P1)}" data-track="call">Call ${P1}</a></div>
<ul class="bul"><li>Free site visit and measurement</li><li>Made in VTech’s own Bengaluru factory</li><li>Old windows removed, clean installation</li></ul></div>
<form id="hq" class="lf lf--hero lf--card" data-lead novalidate><span class="lf__tag">FREE CONSULTATION</span><h2 class="lf__h">Book Free Site Consultation</h2><p class="lf__sub">An expert will visit, measure and quote, free of charge.</p>
<p class="lf__note">✦ Free site visit + measurement, no obligation</p>
<div class="lf__r"><label>First name *<input name="name" autocomplete="given-name" placeholder="First name"></label><label>Last name<input name="last" autocomplete="family-name" placeholder="Last name"></label></div>
<label>Phone *<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+91 9XXXX XXXXX"></label>
<label>Email<input name="email" type="email" autocomplete="email" placeholder="you@example.com"></label>
<label>Product<select name="product"><option value="">Not sure yet</option>${opts}</select></label>
<label>How many? *<select name="qty"><option value="1 to 3">1 to 3</option><option value="4 to 6">4 to 6</option><option value="7 to 10">7 to 10</option><option value="11 to 20">11 to 20</option><option value="20+">More than 20</option><option value="Full project">Full home / building project</option></select></label>
<span class="lf__l">Colour preference *</span><div class="lchips lchips--sw" role="group" aria-label="Colour preference"><button type="button" class="lchip" data-v="White" aria-pressed="true"><i style="background:#F4F4F2"></i>White</button><button type="button" class="lchip" data-v="Wooden Finish" aria-pressed="false"><i style="background:linear-gradient(135deg,#9A6236,#5E3818)"></i>Wooden Finish</button><button type="button" class="lchip" data-v="Grey" aria-pressed="false"><i style="background:linear-gradient(135deg,#7A818C,#4A505A)"></i>Grey</button><button type="button" class="lchip" data-v="Black" aria-pressed="false"><i style="background:#151515"></i>Black</button></div><input type="hidden" name="colour" value="White">
<button class="btn btn--pill btn--full" type="submit">Submit Details →</button><p class="lf__st" role="status" aria-live="polite"></p><p class="lf__n">Used only to contact you about this request</p></form></div></section>
<section class="proofbar" aria-label="Figures as stated by VTech"><div class="wrap"><div><b>1 Lakh+</b><span>Happy customers</span></div><div><b>200+</b><span>Projects</span></div><div><b>20+</b><span>Years</span></div><div><b>5+</b><span>Quality certifications</span></div></div></section>
<div class="tick" aria-hidden="true"><div>${[...PRODUCTS.map((p) => esc(p.name)),...PRODUCTS.map((p) => esc(p.name))].map((n) => `<span>${n}</span><i>✦</i>`).join('')}</div></div>
<section class="bph" id="why"><div class="wrap"><span class="lab rv">Why uPVC</span><h2 class="rv">Six reasons families switch to V-Tech.</h2><div class="bph__g">${BEN.map(([t,d],i)=>`<article class="bc rv" style="--bg:url(${A}${BIMG[i]})"><span class="bc__i">${BICON[i]}</span><span class="bc__n">0${i+1}</span><div class="bc__t"><h3>${t}</h3><p>${d}</p></div></article>`).join('')}</div></div></section>
<section class="band"><div class="wrap"><div><h3>See how your home fits.</h3><p>Free site visit and measurement. No obligation.</p></div><div class="band__b"><a class="btn" href="#hq" data-track="cta_band">Get my free quote →</a><a class="btn btn--o" href="${tel(P1)}" data-track="call">Call ${P1}</a></div></div></section>
<section class="sec colours" id="colours"><div class="wrap"><span class="lab rv">Colour &amp; texture</span><h2 class="rv">Choose a finish that fits your home.</h2><p class="seo rv">Foil-laminated finishes that don’t need repainting.</p><div class="fin">${FIN.map(([f,n,d])=>`<figure class="rv"><img src="${A}${f}.webp" alt="${n} uPVC finish" width="400" height="400" loading="lazy"><figcaption><b>${n}</b><span>${d}</span></figcaption></figure>`).join('')}</div></div></section>
<section class="sec stage" id="systems"><div class="wrap"><span class="lab rv">10 systems</span><h2 class="rv">Choose the system.</h2><div class="stack">${stackCards}</div></div></section>
<section class="sec gal" id="projects"><div class="wrap"><span class="lab rv">Recent installations</span><h2 class="rv">200+ projects across Bangalore &amp; beyond.</h2><div class="gal__g">${GAL.map(([g,n],i)=>`<figure class="rv g${i+1}"><img src="${A}${g}.webp" alt="${n}, V-Tech installation" width="800" height="600" loading="lazy"><figcaption>${n}</figcaption></figure>`).join('')}</div></div></section>
<section class="sec how" id="how"><div class="wrap"><span class="lab rv">Quote to install in about 21 days</span><h2 class="rv">How it works.</h2><ol class="hw">${STEPS.map(([t,d],i)=>`<li class="rv"><b>0${i+1}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol></div></section>
<div class="light">${REV.html}</div>

<section class="sec" id="areas"><div class="wrap"><span class="lab rv">Where we work</span><h2 class="rv">uPVC windows across Bangalore.</h2>
<p class="seo rv">VTech makes uPVC casement windows, sliding windows, French doors and multi-sliding doors at its own factory in Kalenahalli, Bengaluru, and installs them with its own team. Visit the showroom in Rajajinagar or ask for a free site visit and measurement at your home or project site.</p>
<ul class="chips rv">${AREAS.map((a) => `<li>uPVC windows in ${a}</li>`).join('')}</ul></div></section>
<section class="sec"><div class="wrap"><span class="lab rv">Questions</span><h2 class="rv">Good to know.</h2><div class="faq">${FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div></section>
<section class="sec final" id="quote-s"><div class="wrap" style="display:contents"><div><span class="lab">Free site visit</span><h2>Let’s fit your home.</h2><p>Share a few details in the quote form and V-Tech’s team calls you back to fix a free site visit and measurement.</p>
<div class="addr"><span>Call <a href="${tel(P1)}" data-track="call">${P1}</a></span></div></div>
<div class="fcta"><span class="fcta__k">Free site visit and quote</span><h3>Ready when you are.</h3><p>One short form is all it takes. The V-Tech team calls you back.</p><a class="btn btn--pill btn--full" href="#hq" data-track="cta_final">Get Free Quote →</a><a class="btn btn--pill btn--o btn--full" href="${tel(P1)}" data-track="call">Call ${P1}</a></div></div></section>
<section class="sec cards" id="visit"><div class="wrap"><span class="lab rv">Visit us</span><h2 class="rv">Showroom &amp; factory.</h2><div class="cc"><div class="rv"><h3>Showroom · Rajajinagar</h3><p>No. 693, M.N.S Arcade, East Facing 3rd Floor, Dr. Rajkumar Rd, 6th Block, Rajajinagar, Bangalore 560010</p><p><a href="${tel(P1)}" data-track="call">${P1}</a></p><p>Open all days, 09:00 AM to 09:00 PM</p></div><div class="rv"><h3>Factory · Kalenahalli</h3><p>4GW7+P2Q, Kalenahalli, Bengaluru 560089</p><p>Capacity: 10,000+ uPVC units a year</p><p>Factory tours on request</p></div></div></div></section>
</main>
<footer class="foot"><div class="wrap"><span>© V-Tech Building Systems Pvt. Ltd, Bengaluru</span><span>Figures as published on vtechwindows.com · Design prototype, not the official VTech website</span></div></footer>
<div class="mbar" role="region" aria-label="Quick actions"><a class="btn btn--o" href="${tel(P1)}" data-track="call">Call now</a><a class="btn" href="#hq">Book free visit</a></div>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script>${js}\n${REV.js}</script></body></html>`;


// perf: async decoding everywhere; phones and tablets get the 900px twin of the big photos
html = html.replace(/<img (?![^>]*decoding=)/g, '<img decoding="async" ');

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
fs.writeFileSync(path.join(__dirname, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + SITE + 'sitemap.xml\n');
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + SITE + '</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>\n');
console.log('index.html', (html.length / 1024).toFixed(1) + ' KB');

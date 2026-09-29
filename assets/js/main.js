const img = (seed, w = 600, h = 400) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const servicios = [
  ['🚐','Rotulación vehicular','Wraps completos y parciales para autos, camionetas y flotillas.','wrap-car'],
  ['🖨️','Impresión digital','Gran formato en lona, vinil, tela, rígidos y microperforado.','printing'],
  ['🪧','Señalización','Señalética interior, exterior, de seguridad y direccional.','signage'],
  ['💡','Anuncios luminosos','Cajas de luz, anuncios espectaculares y bastidores LED.','lightbox'],
  ['🔠','Letras 3D','Channel letters en acero, aluminio y acrílico con iluminación.','letters3d'],
  ['⚙️','Router CNC','Corte y grabado de MDF, PVC, acrílico, aluminio y madera.','cnc-router'],
  ['✂️','Corte láser','Precisión milimétrica para piezas, displays y grabados.','laser-cut'],
  ['🎨','Diseño gráfico','Creamos la imagen de tu marca y las artes para producción.','graphic-design'],
  ['🧰','Instalación','Montaje profesional en cualquier altura y superficie.','installation'],
];
const apps = [
  ['Flotillas y vehículos','Tu marca en movimiento','fleet'],
  ['Displays y stands','Puntos de venta que venden','stand'],
  ['Convenciones y expos','Destaca en cada evento','expo'],
  ['Decoración de interiores','Espacios con identidad','interior'],
  ['Torneos y eventos','Lonas, banners y trofeos','golf'],
  ['Señalización de seguridad','Protección civil y normas','safety'],
];

document.getElementById('gridServicios').innerHTML = servicios.map(([ic,t,d,s]) => `
  <article class="tarjeta revelar">
    <div class="img"><img loading="lazy" src="${img(s)}" alt="${t}"><div class="icono">${ic}</div></div>
    <div class="cuerpo"><h3>${t}</h3><p>${d}</p><a href="#contacto" class="mas">Conocer más →</a></div>
  </article>`).join('');

document.getElementById('gridApps').innerHTML = apps.map(([t,d,s]) => `
  <a href="#contacto" class="app revelar"><img loading="lazy" src="${img(s,800,600)}" alt="${t}">
    <div class="info"><h3>${t}</h3><span>${d}</span></div></a>`).join('');

document.getElementById('instaGrid').innerHTML = Array.from({length:6},(_,i) =>
  `<a href="#"><img loading="lazy" src="${img('insta'+i,400,400)}" alt="Publicación ${i+1}"></a>`).join('');

const cats = {cajas:'Cajas de luz', laser:'Corte láser', senal:'Señalización'};
const fotos = Object.keys(cats).flatMap(c => [1,2,3,4].map(n => ({c, s:c+n})));
document.getElementById('gridGaleria').innerHTML = fotos.map(f => `
  <div class="foto" data-cat="${f.c}"><img loading="lazy" src="${img(f.s,500,500)}" data-grande="${img(f.s,1200,1200)}" alt="${cats[f.c]}"><span class="tag">${cats[f.c]}</span></div>`).join('');

const marcas = ['ACME','NOVA','ZENITH','ORBITA','KAPPA','VERTEX','AURA','DELTA','LUMEN','NEXO','PRISMA','TERRA','VOLTA','ALFA','ÍCARO','SOLAR'];
const logos = marcas.map(m => `<div class="logo-cliente">${m}</div>`).join('');
document.getElementById('pista').innerHTML = logos + logos;

document.getElementById('footServicios').innerHTML = servicios.slice(0,6).map(s => `<li><a href="#servicios">${s[1]}</a></li>`).join('');
document.getElementById('footApps').innerHTML = apps.map(a => `<li><a href="#aplicaciones">${a[0]}</a></li>`).join('');
document.getElementById('selServicio').innerHTML += servicios.map(s => `<option>${s[1]}</option>`).join('');
document.getElementById('anio').textContent = new Date().getFullYear();

// Carrusel hero
const slides = [...document.querySelectorAll('.slide')];
const puntos = document.querySelector('.puntos');
let actual = 0, timer;
slides.forEach((_, i) => { const b = document.createElement('button'); b.ariaLabel = 'Slide ' + (i+1); b.onclick = () => ir(i); puntos.appendChild(b); });
function ir(i){
  slides[actual].classList.remove('activo'); puntos.children[actual].classList.remove('activo');
  actual = (i + slides.length) % slides.length;
  slides[actual].classList.add('activo'); puntos.children[actual].classList.add('activo');
  clearInterval(timer); timer = setInterval(() => ir(actual + 1), 6000);
}
document.querySelector('.flecha.izq').onclick = () => ir(actual - 1);
document.querySelector('.flecha.der').onclick = () => ir(actual + 1);
ir(0);

// Menú móvil
const nav = document.getElementById('nav');
document.getElementById('abrirNav').onclick = () => nav.classList.add('abierto');
document.querySelector('.cerrar-nav').onclick = () => nav.classList.remove('abierto');
document.querySelectorAll('.desplegable > a').forEach(a => a.addEventListener('click', e => {
  if (innerWidth <= 992) { e.preventDefault(); a.parentElement.classList.toggle('expandido'); }
}));
nav.querySelectorAll('.submenu a, nav > ul > li:not(.desplegable) > a').forEach(a => a.addEventListener('click', () => nav.classList.remove('abierto')));

// Filtros galería + lightbox
document.querySelectorAll('.filtros button').forEach(b => b.onclick = () => {
  document.querySelector('.filtros .activo').classList.remove('activo'); b.classList.add('activo');
  document.querySelectorAll('.foto').forEach(f => f.classList.toggle('oculta', b.dataset.filtro !== 'todos' && f.dataset.cat !== b.dataset.filtro));
});
const lb = document.getElementById('lightbox');
document.getElementById('gridGaleria').onclick = e => {
  const i = e.target.closest('.foto')?.querySelector('img'); if (!i) return;
  lb.querySelector('img').src = i.dataset.grande; lb.classList.add('abierto');
};
lb.onclick = e => { if (e.target !== lb.querySelector('img')) lb.classList.remove('abierto'); };

// Animación al hacer scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll('.revelar').forEach(el => io.observe(el));

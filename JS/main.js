const CONTAINERS = document.querySelectorAll('.container');
const MODAL = document.getElementById('modal');
const CLOSE_MODAL = document.getElementById('close-modal');
const MENU_BUTTON = document.getElementById('menu-button');
const SIDEBAR = document.getElementById('sidebar');
const CLOSE_SIDEBAR = document.getElementById('close-sidebar');
const SIDEBAR_OVERLAY = document.getElementById('sidebar-overlay');
const VIDEO_FRAME = document.getElementById('video-frame');
const VIDEO_TITLE = document.getElementById('video-title');
const VIDEO_DESCRIPTION = document.getElementById('video-description');

const VIDEO_DATA = {
	'container-1': {
		title: 'Better MC',
		description: '¿Listo para la aventura definitiva? Este pack incluye más de 100 misiones y una generación de mundo completamente renovada con biomas espectaculares gracias a mods como Biomas a Plenitud y Geofílico. Está totalmente optimizado, incluye preajustes de sombreadores personalizados y ha overhaulado las fortalezas y strongholds. Enfréntate a nuevos jefes y criaturas con Mowzies Mobs y Cataclismo, explora miles de mazmorras y estructuras nuevas con Cuando las Mazmorras Surgen y Estructuras AdoraBuild, y descubre la dimensión del Aether ampliada con aldeas, Deep Aether y Aether Redux. Disfruta de características de calidad de vida como Piedras de teletransporte y Tómos de XP, un minimapa de Xaero con funciones adicionales y hasta dragones montables. Con más de 350 mods y muchas características personalizadas para una experiencia mejorada, además de la posibilidad de compartir mundos de forma gratuita y integrada, este es el viaje que estabas esperando.',
		url: 'https://www.youtube.com/embed/IF31Rew9RpM?si=inNDOMk62RTTOGvB'
	},
	'container-2': {
		title: 'RL Craft',
		description: '¿Estás listo para poner a prueba tus habilidades de supervivencia como nunca antes? RL Craft transforma Minecraft por completo en una experiencia de rol hardcore donde cada decisión cuenta. Este pack incluye un sistema de supervivencia extremo con sed, hambre y temperatura realistas, donde deberás luchar contra más de 100 tipos de criaturas mejoradas y jefes aterradores como los dragones de Ice and Fire que pueden destruir paisajes enteros. Tu progreso depende de un sistema de niveles y habilidades que te obliga a especializarte, mientras exploras dungeons generados con Lycanites Mobs que te harán reconsiderar cada exploración. Con mecánicas de construcción realistas donde los bloques pueden colapsar, enfermedades que debes tratar y un combate táctico que premia la estrategia sobre el clickeo rápido, cada partida se convierte en una épica lucha por la supervivencia. ¿Tienes lo que se necesita para sobrevivir en un mundo donde la muerte llega rápido y las consecuencias son permanentes?',
		url: 'https://www.youtube.com/embed/tbRAUWNf-2Y?si=pUDxRVPfQzK2bcyX'
	},
	'container-3': {
		title: 'Cobbleverse',
		description: '¿Sueñas con ser Maestro Pokémon en Minecraft? Este pack fusiona perfectamente el universo Pokémon con Minecraft, permitiéndote capturar, entrenar y combatir con los 1025 Pokémon oficiales mientras exploras las regiones de Kanto, Johto y Hoenn reconstruidas. Enfréntate a Líderes de Gimnasio animados, desafía a la Elite Four y busca Pokémon Legendarios en estructuras especiales, incluso al Rayquaza Shiny en la dimensión del End. Con mecánicas avanzadas como Mega-Evolución, Movimientos Z y Dinamax, más de 200 Pokémon montables, y la posibilidad de completar tu Living Dex con 1200 espacios en el PC, cada partida se siente como un auténtico juego de Pokémon. Los mobs comunes de Minecraft están desactivados para centrarte en tu aventura Pokémon, con banda sonora personalizada y optimización para multijugador. ¿Listo para convertirte en Leyenda?',
		url: 'https://www.youtube.com/embed/HUD1ltMD2AM?si=pxEQFZIHXLUUI3DL'
	},
	'container-4': {
		title: 'Linggango',
		description: '¿Buscas un survival único y diferente? Este pack redefine completamente la experiencia de Minecraft con una progresión basada en lingotes únicos que debes descubrir y combinar. Comenzarás con herramientas primitivas que se rompen fácilmente, forzándote a explorar ruinas antiguas y descifrar misteriosas recetas de fabricación para desbloquear metales más avanzados. Cada nuevo lingote descubierto abre posibilidades antes imposibles - desde armas con habilidades especiales hasta mecanismos que transforman el mundo. Con estructuras personalizadas llenas de pistas, un sistema de fabricación que premia la experimentación y criaturas adaptadas a este ecosistema único, cada partida se convierte en una emocionante carrera tecnológica. ¿Podrás dominar todos los lingotes y convertirte en el maestro artesano del mundo de Linggango?',
		url: 'https://www.youtube.com/embed/REWpPquL8qU?si=BNbp6DGMm7Qlw4Im'
	},
	'container-5': {
		title: 'Prominence II: Hasturian Era',
		description: '¿Buscas un RPG épico dentro de Minecraft? Este pack transforma Minecraft en un auténtico juego de rol con una campaña narrativa dividida en dos arcos: La Invasión del Vacío y la Era Hasturiana. Desarrolla tu personaje único a través de un árbol de talentos volcánico con 16 habilidades pasivas, 5 activas y 100 mejoras de estadísticas, enfrentándote a enemigos que escalan según tu nivel. Forja artefactos legendarios con habilidades únicas y enfréntate a jefes míticos de dificultad infinita en combates donde la muerte tiene consecuencias reales. Con un diseño visual completamente personalizado, sistema de transfiguración para personalizar tu equipo sin perder estadísticas, y progresión que une la historia con tu desarrollo personal, cada partida se siente como una aventura épica. ¿Estás listo para escribir tu leyenda en este mundo de fuego y oscuridad?   ',
		url: 'https://www.youtube.com/embed/4uPmfzcIPQY?si=dfqRnrFqre9BqYO3'
	},
	'container-6': {
		title: 'Beyond Depth',
		description: '¿Te atreves a explorar las profundidades más oscuras de Minecraft? Este pack transforma el subsuelo en una experiencia de exploración aterradora y fascinante, añadiendo 9 dimensiones subterráneas únicas con biomas, criaturas y recursos que no encontrarás en ningún otro lugar. Comenzando en cuevas superficiales y descendiendo progresivamente hacia reinos lovecraftianos, cada capa presenta nuevos peligros, estructuras antiguas y materiales exóticos que obligan a mejorar tu equipo constantemente. Con mecánicas de iluminación y oxígeno que añaden tensión a la exploración, jefes dimensionales que guardan secretos ancestrales, y una progresión natural que recompensa la valía de los aventureros más temerarios, cada excavación se convierte en una expedición a lo desconocido. ¿Tienes el valor de descender donde nadie más se ha atrevido?',
		url: 'https://www.youtube.com/embed/yBai9purmjQ?si=dHfSt3E1DVe9uwrK'
	}
};

if (CONTAINERS.length > 0) {
	CONTAINERS.forEach(container => {
		container.addEventListener('click', () => {
			const info = container.querySelector('.info');
			if (info) {
				info.style.display = 'block';
			}

			const id = container.id;
			const data = VIDEO_DATA[id];
			if (data && MODAL && VIDEO_FRAME && VIDEO_TITLE && VIDEO_DESCRIPTION) {
				VIDEO_FRAME.src = data.url;
				VIDEO_TITLE.textContent = data.title;
				VIDEO_DESCRIPTION.textContent = data.description;
				MODAL.setAttribute('data-source', id);
				MODAL.style.display = 'flex';
				MODAL.setAttribute('aria-hidden', 'false');
				MODAL.setAttribute('aria-modal', 'true');
			}
		});
	});
}

function openSidebar() {
	if (SIDEBAR) {
		SIDEBAR.classList.add('open');
		SIDEBAR.setAttribute('aria-hidden', 'false');
	}
	if (SIDEBAR_OVERLAY) {
		SIDEBAR_OVERLAY.classList.add('active');
		SIDEBAR_OVERLAY.removeAttribute('hidden');
	}
}

function closeSidebar() {
	if (SIDEBAR) {
		SIDEBAR.classList.remove('open');
		SIDEBAR.setAttribute('aria-hidden', 'true');
	}
	if (SIDEBAR_OVERLAY) {
		SIDEBAR_OVERLAY.classList.remove('active');
		SIDEBAR_OVERLAY.setAttribute('hidden', '');
	}
}

if (MENU_BUTTON) {
	MENU_BUTTON.addEventListener('click', openSidebar);
}
if (CLOSE_SIDEBAR) {
	CLOSE_SIDEBAR.addEventListener('click', closeSidebar);
}
if (SIDEBAR_OVERLAY) {
	SIDEBAR_OVERLAY.addEventListener('click', closeSidebar);
}

window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		closeSidebar();
	}
});


if (CLOSE_MODAL) {
	CLOSE_MODAL.addEventListener('click', () => {
		if (MODAL) {
			MODAL.style.display = 'none';
			MODAL.removeAttribute('data-source');
			MODAL.setAttribute('aria-hidden', 'true');
			MODAL.removeAttribute('aria-modal');
		}
		if (VIDEO_FRAME) VIDEO_FRAME.src = '';
	});
}

if (MODAL) {
	window.addEventListener('click', (e) => {
		if (e.target === MODAL) {
			MODAL.style.display = 'none';
			if (MODAL) MODAL.removeAttribute('data-source');

			if (MODAL) {
				MODAL.setAttribute('aria-hidden', 'true');
				MODAL.removeAttribute('aria-modal');
			}
			if (VIDEO_FRAME) VIDEO_FRAME.src = '';
		}
	});
}



+(function setupScrollAnimations() {
	const reveals = document.querySelectorAll('.reveal');
	if (reveals.length === 0) return;

	function checkReveal() {
		reveals.forEach(element => {
			const windowHeight = window.innerHeight;
			const elementTop = element.getBoundingClientRect().top;
			const elementVisible = 120;

			if (elementTop < windowHeight - elementVisible) {
				element.classList.add('active');
			}
		});
	}

	checkReveal();
	window.addEventListener('scroll', checkReveal, { passive: true });
})();


+(function setupParallax() {
	const section = document.getElementById('parallax-section');
	if (!section) return;

	const bg = section.querySelector('.layer-bg');
	const mid = section.querySelector('.layer-mid');
	const fg = section.querySelector('.layer-fg');

	let ticking = false;

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const rect = section.getBoundingClientRect();
				const windowH = window.innerHeight;

				const progress = Math.min(Math.max((windowH - rect.top) / (windowH + rect.height), -1), 1);

				const bgY = (rect.top) * 0.15;
				const midY = (rect.top) * 0.25;
				const fgY = (rect.top) * 0.45;

				if (bg) bg.style.transform = `translate3d(0, ${bgY}px, 0)`;
				if (mid) mid.style.transform = `translate3d(0, ${midY}px, 0)`;
				if (fg) fg.style.transform = `translate3d(0, ${fgY}px, 0)`;

				ticking = false;
			});
			ticking = true;
		}
	}


	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
})();


document.addEventListener('DOMContentLoaded', () => {
	const menuButton = document.getElementById('menu-button');
	const sidebar = document.getElementById('sidebar');
	const sidebarOverlay = document.getElementById('sidebar-overlay');
	const closeSidebar = document.getElementById('close-sidebar');
	const contactBtn = document.getElementById('contact-btn');

	function safeShowOverlay() {
		if (!sidebarOverlay) return;
		sidebarOverlay.style.display = 'block';
		sidebarOverlay.style.pointerEvents = 'auto';
	}

	function safeHideOverlay() {
		if (!sidebarOverlay) return;
		sidebarOverlay.style.display = 'none';
		sidebarOverlay.style.pointerEvents = 'none';
	}

	function openSidebarMenu() {
		if (!sidebar) return;
		sidebar.classList.add('open');
		safeShowOverlay();
	}

	function closeSidebarMenu() {
		if (!sidebar) return;
		sidebar.classList.remove('open');

		safeHideOverlay();
	}

	if (menuButton) {
		menuButton.addEventListener('click', openSidebarMenu);
	}

	if (closeSidebar) {
		closeSidebar.addEventListener('click', closeSidebarMenu);
	}

	if (sidebarOverlay) {
		sidebarOverlay.addEventListener('click', closeSidebarMenu);
	}

	if (contactBtn) {
		contactBtn.addEventListener('click', () => {

			closeSidebarMenu();
			const footerSection = document.getElementById('footer-section');
			if (!footerSection) return;

			setTimeout(() => {
				footerSection.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		});
	}
});


document.addEventListener('DOMContentLoaded', () => {

	const revealEls = Array.from(document.querySelectorAll('.reveal'));
	if (revealEls.length) {
		if ('IntersectionObserver' in window) {
			const revObserver = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					const el = entry.target;
					if (entry.isIntersecting) {

						const delay = (revealEls.indexOf(el) % 6) * 80;
						el.style.transitionDelay = delay + 'ms';
						el.classList.add('is-visible');
					} else {

						el.classList.remove('is-visible');
						el.style.transitionDelay = '0ms';
					}
				});
			}, { threshold: 0.15 });

			revealEls.forEach(r => revObserver.observe(r));
		} else {

			revealEls.forEach(r => r.classList.add('is-visible'));
		}
	}
});
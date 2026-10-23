const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	const dark = document.body.classList.contains('dark');

	themeToggle.textContent = dark ? '☀' : '☾';
	localStorage.setItem('shayma-theme', dark ? 'dark' : 'light');
});

if (localStorage.getItem('shayma-theme') === 'dark') {
	document.body.classList.add('dark');
	themeToggle.textContent = '☀';
}

const bubble = document.getElementById('welcomeBubble');
const sayHi = document.getElementById('sayHiAgain');

if (sayHi) {
	sayHi.addEventListener('click', () => {
		bubble.animate(
			[
				{ transform: 'scale(.94)', opacity: 0.7 },
				{ transform: 'scale(1)', opacity: 1 },
			],
			{ duration: 350, easing: 'ease-out' },
		);
		sayHi.textContent = 'Lovely to have you here!';
		setTimeout(() => (sayHi.textContent = 'Say hello again'), 2200);
	});
}

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach((a) =>
	a.addEventListener('click', () => navLinks.classList.remove('open')),
);

document.querySelectorAll('.filter').forEach((btn) =>
	btn.addEventListener('click', () => {
		document.querySelectorAll('.filter').forEach((button) =>
			button.classList.remove('active'),
		);
		btn.classList.add('active');

		const f = btn.dataset.filter;
		document.querySelectorAll('.project').forEach((card) => {
			card.hidden = !(f === 'all' || card.dataset.category === f);
		});
	}),
);

const observer = new IntersectionObserver(
	(entries) =>
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		}),
	{ threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) =>
	observer.observe(element),
);
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('copyEmail').addEventListener('click', async () => {
	try {
		await navigator.clipboard.writeText('tradshayma@gmail.com');
		document.getElementById('copyEmail').textContent = 'Copied ✓';
	} catch (error) {
		window.location.href = 'mailto:tradshayma@gmail.com';
	}
});

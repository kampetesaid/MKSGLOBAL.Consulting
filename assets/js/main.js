// ==========================================================================
// MKSGLOBAL Consulting — script principal
// ==========================================================================

// --- Menu mobile ---
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Ouvrir le menu');
  });
});

// --- Onglets Services ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// --- Année du copyright, toujours à jour ---
const copyYear = document.getElementById('copyYear');
if (copyYear) copyYear.textContent = new Date().getFullYear();

// --- Formulaire de contact : ouvre WhatsApp avec le message pré-rempli ---
// Le clic envoie la demande vers WhatsApp (+237 692 274 316). WhatsApp exige que
// la personne clique elle-même sur "Envoyer" dans la conversation (aucun outil web
// ne peut envoyer un message WhatsApp à sa place sans compte WhatsApp Business payant
// et validé par Meta) — on ouvre donc la conversation avec tout déjà rempli, il ne
// reste qu'un clic à faire côté client.
// En parallèle, une copie est aussi envoyée par email via FormSubmit.co (silencieusement,
// sans bloquer l'ouverture de WhatsApp) pour garder une trace écrite de chaque demande.
const WHATSAPP_NUMBER = '237692274316';

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Piège à robots (honeypot) : si rempli, on ignore silencieusement
  if (form.querySelector('[name="_honey"]').value) return;

  const name = document.getElementById('f-name').value.trim() || 'là';
  const contact = document.getElementById('f-contact').value.trim();
  const service = document.getElementById('f-service').value;
  const message = document.getElementById('f-message').value.trim();

  const lines = [
    'Nouvelle demande — site MKSGLOBAL Consulting',
    '',
    `Nom : ${name}`,
    `Téléphone / email : ${contact}`,
    `Pôle concerné : ${service}`,
    `Projet : ${message || '(non précisé)'}`
  ];
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;

  // Ouvrir WhatsApp tout de suite (doit rester synchrone au clic pour éviter
  // que le navigateur ne bloque l'ouverture du nouvel onglet).
  window.open(waUrl, '_blank', 'noopener');

  statusEl.textContent = 'WhatsApp vient de s\'ouvrir dans un nouvel onglet avec votre message déjà rempli : il ne vous reste qu\'à appuyer sur Envoyer pour nous le transmettre.';
  statusEl.classList.remove('error');
  statusEl.classList.add('visible', 'success');

  // Copie silencieuse par email (best effort, n'affecte pas l'expérience si ça échoue)
  fetch('https://formsubmit.co/ajax/mksconsulting@outlook.fr', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(form)
  }).catch(() => { /* silencieux : WhatsApp reste le canal principal */ });

  form.reset();
});


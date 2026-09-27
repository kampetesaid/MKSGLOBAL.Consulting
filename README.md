# MKSGLOBAL Consulting — site web

Ce dossier contient la version améliorée de ton site. Avant de mettre le site en ligne, il reste **4 choses à faire toi-même** (10 minutes au total).

## 1. Le formulaire de contact envoie vers WhatsApp

Quand un visiteur clique sur **"Envoyer ma demande"**, WhatsApp s'ouvre dans un nouvel onglet (application ou WhatsApp Web selon l'appareil) avec un message déjà rédigé, à destination du **+237 692 274 316** : nom, téléphone/email, pôle concerné et description du projet.

**Point important à comprendre** : WhatsApp n'autorise aucun site web à envoyer un message à la place de la personne — il faut toujours qu'un humain clique sur "Envoyer" dans WhatsApp lui-même. C'est une règle de WhatsApp (anti-spam), pas une limite technique de ton site. Le site fait donc tout le travail (rédaction du message, ouverture de la conversation) et ne laisse qu'un seul clic final au visiteur.

En parallèle, une copie de chaque demande est aussi envoyée par email à `mksconsulting@outlook.fr` (silencieusement, via FormSubmit.co — voir point 2), pour garder une trace écrite même si le visiteur ferme WhatsApp sans envoyer.

Si tu préfères qu'un **autre numéro** reçoive les messages, change la valeur `WHATSAPP_NUMBER` tout en haut du bloc "Formulaire de contact" dans `assets/js/main.js` (format international, sans `+` ni espaces, ex. `237691234567`).

## 2. Activer la copie par email (optionnel mais recommandé)

Le formulaire envoie maintenant un vrai email à `mksconsulting@outlook.fr` via le service gratuit [FormSubmit.co](https://formsubmit.co) — aucun serveur à gérer.

**Étape obligatoire :** la toute première fois que quelqu'un remplit le formulaire (toi, pour tester, ou ton premier vrai client), FormSubmit envoie un email de confirmation à `mksconsulting@outlook.fr`. Il faut **cliquer sur le lien dans cet email** pour activer la réception des demandes. Sans ça, les messages suivants n'arriveront pas.

→ Fais donc un premier test du formulaire dès la mise en ligne, et vérifie la boîte mail (et les spams).

Si un jour tu veux changer l'email de réception, remplace `mksconsulting@outlook.fr` à trois endroits :
- `index.html` → attribut `action` du `<form>`
- `assets/js/main.js` → l'URL `https://formsubmit.co/ajax/...`
- Le champ caché `_subject` si tu veux aussi changer l'objet de l'email

## 3. Remplacer le nom de domaine provisoire

J'ai utilisé `https://www.mksglobalconsulting.com/` comme domaine provisoire (à titre d'exemple) dans plusieurs endroits nécessaires au bon référencement :
- `index.html` : balises `canonical`, `og:url`, `og:image`, `twitter:image`, et le JSON-LD
- `robots.txt` : ligne `Sitemap`
- `sitemap.xml` : balise `<loc>`

Une fois que tu as ton vrai nom de domaine (ou une adresse d'hébergement gratuite type `tonsite.netlify.app`), remplace `https://www.mksglobalconsulting.com` par ta vraie adresse dans ces fichiers (recherche/remplace).

## 4. Ajouter tes vrais liens de réseaux sociaux

En bas de page, les icônes Facebook / LinkedIn / Instagram pointent encore vers `#` (placeholder). Dans `index.html`, cherche le commentaire `TODO` juste avant `<div class="socials">` et remplace les `href="#"` par tes vraies URLs.

---

## Ce qui a changé par rapport à la version précédente

**Performance**
- Les images étaient encodées en base64 directement dans le HTML (~750 Ko rien que pour ça). Elles sont maintenant des fichiers séparés, redimensionnés et compressés en WebP dans `assets/img/` (~165 Ko au total) : chargement plus rapide, et le navigateur peut les mettre en cache.
- Le CSS et le JavaScript sont dans des fichiers séparés (`assets/css/style.css`, `assets/js/main.js`) plutôt qu'intégrés dans le HTML — même bénéfice de mise en cache.
- L'image du hero se charge en priorité (`fetchpriority="high"`), les images plus bas se chargent en différé (`loading="lazy"`).
- Chaque image a ses dimensions déclarées (`width`/`height`) pour éviter que la page "saute" pendant le chargement.

**SEO & visibilité**
- Balises Open Graph et Twitter Card ajoutées : un lien partagé sur WhatsApp, Facebook ou LinkedIn affichera désormais un aperçu propre (titre, description, logo).
- Données structurées (JSON-LD, type `ProfessionalService`) ajoutées : elles aident Google à comprendre qu'il s'agit d'une entreprise locale (adresse, téléphone, horaires), ce qui peut améliorer l'affichage dans les résultats de recherche.
- `robots.txt` et `sitemap.xml` ajoutés pour faciliter l'indexation par les moteurs de recherche.
- Balise `canonical` ajoutée (évite les problèmes de contenu dupliqué).

**Formulaire de contact**
- Envoie la demande sur WhatsApp (+237 692 274 316) avec le message déjà rédigé, plus une copie email en arrière-plan (voir points 1 et 2 ci-dessus) — au lieu d'afficher une simple alerte.
- Un champ invisible anti-robot (honeypot) a été ajouté pour limiter le spam.
- Un message de succès ou d'erreur s'affiche directement sur la page.

**Accessibilité**
- Lien d'évitement ("Aller au contenu principal") pour les utilisateurs au clavier/lecteur d'écran.
- Le contenu principal est maintenant dans une balise `<main>`.
- Le bouton du menu mobile indique son état ouvert/fermé (`aria-expanded`) aux lecteurs d'écran.
- Les onglets de la section Services suivent maintenant le standard d'accessibilité ARIA (`role="tab"`, `aria-selected`, etc.).
- Les icônes de réseaux sociaux ne sont plus cachées aux lecteurs d'écran (elles avaient un `aria-hidden` qui entrait en conflit avec leurs `aria-label`).

**Petits plus**
- L'année du copyright en pied de page se met à jour automatiquement chaque année.

## Où héberger le site

Le site est 100% statique (HTML/CSS/JS), tu peux donc l'héberger gratuitement sur :
- [Netlify](https://www.netlify.com) ou [Vercel](https://vercel.com) : glisser-déposer le dossier, en ligne en 1 minute.
- [GitHub Pages](https://pages.github.com) : gratuit si le code est sur GitHub.
- Ou ton hébergeur web habituel (dépose simplement tout le contenu de ce dossier à la racine).

Pense juste à revenir faire l'étape 3 (nom de domaine) une fois l'adresse définitive connue.

import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { categories, clients, contact, method, projects } from './content.js';
import './styles.css';

const assets = `${import.meta.env.BASE_URL}assets`;
const emailHref = `mailto:${contact.email}`;

function Brand() {
  return (
    <a className="brand" href="#accueil">
      <img src={`${assets}/monogramme.png`} alt="" width="24" height="24" />
      <span>Marsollier Video</span>
    </a>
  );
}

function CategoryLinks() {
  return categories.map(({ href, title }) => (
    <a key={href} href={href}>{title}</a>
  ));
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = useRef(null);

  function handleEscape(event) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
      menuToggle.current.focus();
    }
  }

  return (
    <header className="site-header" id="accueil" onKeyDown={handleEscape}>
      <Brand />
      <button
        ref={menuToggle}
        className="button button-outline menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? 'Fermer' : 'Menu'}
      </button>
      <nav
        className="main-nav"
        id="navigation"
        aria-label="Navigation principale"
        data-open={menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <CategoryLinks />
        <a className="button button-accent mobile-contact" href="#contact">Me contacter</a>
      </nav>
      <a className="button button-accent header-contact" href="#contact">Me contacter</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">Vidéaste &amp; monteur vidéo · Toulouse</p>
        <h1 id="hero-title">Des vidéos pour vos <em>communications</em></h1>
        <p className="lead">Contenus de marque, motion design et films créatifs. Montés pour être regardés jusqu’au bout.</p>
        <a className="button button-primary" href="#projets">Voir les projets</a>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className="clients" aria-labelledby="clients-title">
      <div className="container">
        <h2 className="eyebrow" id="clients-title">Ils m’ont fait confiance</h2>
        <ul>{clients.map((client) => <li key={client}>{client}</li>)}</ul>
      </div>
    </section>
  );
}

function Offers() {
  return (
    <section className="offers" aria-labelledby="offers-title">
      <h2 className="eyebrow" id="offers-title">Deux façons de travailler ensemble</h2>
      <div className="offers-grid">
        <article className="offer offer-brand">
          <p className="metadata">Pour les marques</p>
          <h3>Contenus de marque</h3>
          <p>Reels, interviews, films de lancement, after movies et films 100 % motion design à partir de vos visuels. Montés à votre charte, livrés prêts à publier.</p>
          <p className="motion-note">Motion design&nbsp;: jusqu’à 2 min, livré sous 7 jours après le brief, garanti</p>
          <div className="offer-links">
            <a href="#contenus-de-marque">Contenus de marque</a>
            <a href="#motion-design">Motion design</a>
          </div>
        </article>
        <article className="offer offer-creative">
          <p className="metadata">Pour l’image</p>
          <h3>Films créatifs</h3>
          <p>Courts-métrages, clips, films d’auteur. Toulouse ma ville, NEUF NEUF&nbsp;: les films où se construit le regard que je mets ensuite dans vos projets.</p>
          <div className="offer-links">
            <a href="#creatif">Découvrir Toulouse ma ville</a>
          </div>
        </article>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const { id, category, title, description, format, image, alt } = project;

  return (
    <article className="project-card" id={id} tabIndex={-1} aria-labelledby={`${id}-title`}>
      <p className="eyebrow">{category}</p>
      <figure>
        <div className="project-media framed-media">
          <img src={`${assets}/${image}`} alt={alt} loading="lazy" decoding="async" />
        </div>
        <figcaption>
          <h3 id={`${id}-title`}>{title}</h3>
          <p>{description}</p>
          <p className="metadata">{format}</p>
        </figcaption>
      </figure>
    </article>
  );
}

function Projects() {
  return (
    <section className="projects" id="projets" tabIndex={-1} aria-labelledby="projects-title">
      <p className="eyebrow">Sélection</p>
      <h2 id="projects-title">Trois projets, trois façons de faire.</h2>
      <p className="lead">Un film créatif, un motion design, un reel de marque.</p>
      <div className="projects-grid">
        {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  );
}

function Method() {
  return (
    <section className="method section-padding" aria-labelledby="method-title">
      <div className="container">
        <p className="eyebrow">Méthode</p>
        <h2 id="method-title">Trois étapes, pas plus.</h2>
        <ol className="method-grid">
          {method.map(({ title, description }, index) => (
            <li key={title}>
              <span className="step-number" aria-hidden="true">{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-padding" aria-labelledby="about-title">
      <div className="container about-grid">
        <img
          className="portrait framed-media"
          src={`${assets}/alexandre-marsollier.webp`}
          alt="Portrait d’Alexandre Marsollier"
          width="776"
          height="969"
          loading="lazy"
          decoding="async"
        />
        <div>
          <p className="eyebrow">Qui je suis</p>
          <h2 id="about-title">Je m’appelle Alexandre, je suis vidéaste et monteur vidéo basé à Toulouse.</h2>
          <p>Mon parcours a commencé dans la communication, avant que l’image ne prenne progressivement une place centrale dans mon travail. Aujourd’hui, je réalise des vidéos pour des entreprises, des marques et des créateurs, de la réflexion initiale jusqu’au montage final.</p>
          <p>Ce qui m’intéresse, c’est autant la manière de raconter une histoire que celle de la mettre en images. Le choix d’un cadre, le rythme d’un montage, un travail sur le son ou un détail graphique&nbsp;: ce sont souvent ces éléments qui donnent sa personnalité à une vidéo.</p>
          <p>J’aime prendre le temps de comprendre un projet, chercher la bonne approche et construire un résultat qui lui ressemble.</p>
          <p className="metadata">Montage · Motion design · Sound design · Captation légère</p>
          <div className="actions">
            <a className="button button-outline" href="#contact">Me contacter</a>
            <a href={contact.malt}>Profil Malt</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-padding" id="contact" tabIndex={-1} aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Parlons de votre projet.</h2>
          <p>Trois lignes suffisent. Je réponds sous 24 h avec des questions, un ordre de prix et une date.</p>
          <div className="actions">
            <a className="button button-accent" href={`${emailHref}?subject=Brief%20vid%C3%A9o`}>Décrire mon projet</a>
            <a className="button button-outline" href={contact.phoneHref}>{contact.phone}</a>
          </div>
        </div>
        <dl className="contact-details">
          <div>
            <dt className="eyebrow">Email</dt>
            <dd><a href={emailHref}>{contact.email}</a></dd>
          </div>
          <div>
            <dt className="eyebrow">Malt</dt>
            <dd><a href={contact.malt}>Profil vérifié · contrat sécurisé</a></dd>
          </div>
          <div>
            <dt className="eyebrow">Où</dt>
            <dd>Toulouse. Tournages en Occitanie, montage à distance partout.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>Vidéaste &amp; monteur vidéo à Toulouse. Contenus de marque, motion design et films créatifs, montés pour être regardés jusqu’au bout.</p>
          <div className="actions">
            <a className="button button-outline" href="#contact">Me contacter</a>
            <span className="metadata">Réponse sous 24 h</span>
          </div>
        </div>
        <nav aria-labelledby="footer-pages">
          <h2 className="eyebrow" id="footer-pages">Pages</h2>
          <a href="#accueil">Accueil</a>
          <CategoryLinks />
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer-contact">
          <h2 className="eyebrow">Contact</h2>
          <a href={emailHref}>{contact.email}</a>
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={contact.malt}>Malt · profil vérifié</a>
          <div className="socials">
            <a href={contact.instagram}>Instagram</a>
            <a href={contact.linkedin}>LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <small>© {new Date().getFullYear()} Marsollier Video · Toulouse</small>
        <a href={contact.legal}>Mentions légales et confidentialité</a>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView();
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Header />
      <main id="contenu" tabIndex={-1}>
        <Hero />
        <Clients />
        <div className="container section-padding portfolio">
          <Offers />
          <Projects />
        </div>
        <Method />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

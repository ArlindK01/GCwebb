import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CaretDown,
  Check,
  Clock,
  EnvelopeSimple,
  FacebookLogo,
  FileText,
  HouseLine,
  InstagramLogo,
  Leaf,
  List,
  MapPin,
  Percent,
  Phone,
  Plant,
  PlayCircle,
  SealCheck,
  ShieldCheck,
  Snowflake,
  Sparkle,
  SquareSplitHorizontal,
  Star,
  TiktokLogo,
  Tree,
} from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const phone = '073-749-33-12';
const phoneHref = `tel:${phone.replace(/[^\d+]/g, '')}`;
const email = 'info@kgtomtservice.se';
const socialLinks = {
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/kgtomt_fonsterservice?igsh=MTgxdmRsdmtjem5mYw==',
  tiktok: 'https://www.tiktok.com/@kgtomtservice?_r=1&_t=ZN-96AuoKGp4ly',
};

const workPageHash = '#se-oss-i-arbete';
const navItems = ['Om oss', 'Tjänster', 'Priser', 'FAQ', 'Kontakt'];

const services = [
  {
    title: 'Gräsklippning',
    text: 'Gräsklippning i Västerås och Västmanland för en jämn, välskött gräsmatta.',
    slug: 'tjanst-grasklippning',
    icon: Leaf,
  },
  {
    title: 'Fönsterputs',
    text: 'Fönsterputs i Västerås med professionell utrustning och noggrann teknik.',
    slug: 'tjanst-fonsterputs',
    icon: Sparkle,
  },
  {
    title: 'Trädgårdsskötsel',
    text: 'Trädgårdsskötsel, häckklippning och tomtskötsel för hem och fastighet.',
    slug: 'tjanst-tradgardsskotsel',
    icon: Tree,
  },
  {
    title: 'Vinterservice',
    text: 'Snöskottning och vinterservice i Västerås för trygga vintermånader.',
    slug: 'tjanst-vinterservice',
    icon: Snowflake,
  },
];

const servicePages = [
  {
    slug: 'tjanst-grasklippning',
    kicker: 'Gräsklippning',
    title: 'Gräsklippning i Västerås utan krångel',
    intro: 'Vi hjälper dig hålla gräset på en lagom nivå under säsongen i Västerås och Västmanland, med tydlig planering och ett prydligt resultat efter varje besök.',
    includes: ['Gräsklippning för villa, tomt och fastighet', 'Kanttrimning vid gångar, staket och rabattkanter', 'Genomgång av ytor innan arbetet startar', 'Uppsamling eller fördelning av gräsklipp enligt överenskommelse', 'Återkommande klippning under högsäsong'],
    options: ['Säsongsupplägg med fasta intervaller', 'Extra trimning runt svåråtkomliga ytor', 'Enklare tomtgenomgång vid första besöket', 'Påminnelse inför återkommande service'],
    goodFor: ['Villor', 'Radhus', 'Sommarstugor', 'Tomter som snabbt växer igen'],
  },
  {
    slug: 'tjanst-fonsterputs',
    kicker: 'Fönsterputs',
    title: 'Fönsterputs i Västerås som släpper in mer ljus',
    intro: 'Fönsterputs utförs noggrant med rätt utrustning för ett klart och fräscht helhetsintryck i Västerås och Västmanland, både invändigt och utvändigt.',
    includes: ['Utvändig fönsterputs', 'Invändig fönsterputs vid behov', 'Puts av bågar och karmnära ytor enligt överenskommelse', 'Fläckborttagning från glasytor', 'Kontroll av resultat efter varje fönster'],
    options: ['Inglasade balkonger', 'Svåråtkomliga fönster', 'Återkommande puts inför säsong', 'Puts inför visning, flytt eller högtider'],
    goodFor: ['Lägenheter', 'Villafönster', 'Altandörrar', 'Större glaspartier'],
  },
  {
    slug: 'tjanst-tradgardsskotsel',
    kicker: 'Trädgårdsskötsel',
    title: 'Trädgårdsskötsel och tomtskötsel i Västmanland',
    intro: 'Vi hjälper till med löpande skötsel och punktinsatser i trädgården, från enklare rensning till samlad tomtskötsel i Västerås och Västmanland.',
    includes: ['Häckklippning och enklare beskärning', 'Ogräsrensning i gångar och rabatter', 'Tomtskötsel med krattning, uppsamling och prydliga ytor', 'Röjning av mindre igenväxta delar', 'Säsongsstädning vår och höst'],
    options: ['Bortforsling enligt överenskommelse', 'Planering av återkommande trädgårdshjälp', 'Extra genomgång inför försäljning eller besök', 'Kombination med gräsklippning'],
    goodFor: ['Trädgårdar som behöver komma ikapp', 'Häckar och rabatter', 'Gångar och uteplatser', 'Säsongsrensning'],
  },
  {
    slug: 'tjanst-vinterservice',
    kicker: 'Vinterservice',
    title: 'Snöskottning och vinterservice i Västerås',
    intro: 'Vinterservice kan anpassas efter väder, yta och behov så att entréer, gångar och viktiga passager hålls säkrare under vintern i Västerås och Västmanland.',
    includes: ['Snöskottning av gångar och entréer', 'Skottning vid garage, uppfart och postlåda', 'Halkbekämpning med sand eller salt enligt behov', 'Röjning efter plogvallar i mindre omfattning', 'Akuta eller planerade besök beroende på väderläge'],
    options: ['Återkommande vinterupplägg', 'Extra kontroll vid halka', 'Prioriterade ytor runt entré och bilplats', 'Kombination med annan säsongsservice'],
    goodFor: ['Privata uppfarter', 'Entréer', 'Gångvägar', 'Äldre eller upptagna hushåll'],
  },
];

const grundservicePrices = ['0 till 399 kvm: 1 299 kr', '400 till 699 kvm: 1 990 kr', '700 till 999 kvm: 2 690 kr', '1000 till 1500 kvm: 3 590 kr'];

const packages = [
  {
    name: 'Grundservice',
    type: 'Gräsklippning',
    price: 'Från 1 299 kr',
    rows: grundservicePrices,
    points: [
      '1 till 2 gånger i månaden',
      'Prydligt resultat varje gång',
      'Anpassas efter din tomt',
      'Perfekt för dig som vill ha det enkelt och snyggt',
    ],
  },
  {
    name: 'Fönsterservice',
    type: 'Invändig och utvändig fönsterputs som abonnemang',
    price: '1 399 kr/mån',
    rows: [],
    points: ['Alltid rena fönster', 'Noggrann fönsterputs', 'Förtur under högsäsong', 'Tydlig städinformation'],
  },
];

const flexibleTabs = {
  Gräsklippning: {
    title: 'Gräsklippning',
    text: 'Boka gräsklippning i Västerås vid behov utan bindningstid.',
    price: '349 kr/timme efter RUT',
    points: ['Gräsklippning', 'Busktrimning', 'Ogräsborttagning', 'Gräs och löv tas bort efter jobb'],
  },
  Komplett: {
    title: 'Komplett',
    text: 'Samlad tomtskötsel och fastighetsnära utomhusservice i Västmanland.',
    price: '419 kr/timme efter RUT',
    points: ['Tomtgenomgång', 'Skötselplan', 'Återkommande service', 'Hantering av RUT-avdrag'],
  },
  Fönsterputs: {
    title: 'Fönsterputs',
    text: 'Enstaka fönsterputs i Västerås när fönstren behöver bli klara igen. Faktureras per påbörjad timme.',
    price: '349 kr/timme efter RUT',
    points: ['Invändigt och utvändigt', 'Professionell utrustning', 'Noggrann detaljkontroll', 'Bokas vid behov'],
  },
};

const flexibleTabIcons = {
  Gräsklippning: Plant,
  Komplett: HouseLine,
  Fönsterputs: SquareSplitHorizontal,
};

const workVideos = [
  {
    src: '/assets/work-video-1.mov',
    label: 'Fönsterputs i Västerås på plats hos kund',
    description: 'Video som visar fönsterputs utförd av KG Tomt & Fönsterservice.',
  },
  {
    src: '/assets/work-video-2.mov',
    label: 'Tomtskötsel och utomhusservice i Västmanland',
    description: 'Video som visar tomtskötsel och fastighetsnära utomhusservice ute hos kund.',
  },
  {
    src: '/assets/work-video-3.mov',
    label: 'Noggrant utförd fönsterputs och service',
    description: 'Video som visar noggrant utfört arbete för hem och fastighet.',
  },
];

const faqs = [
  ['Erbjuder ni fönsterputs i Västerås?', 'Ja, vi erbjuder fönsterputs i Västerås och övriga Västmanland för villor, lägenheter, företag och fastigheter.'],
  ['Arbetar ni i hela Västmanland?', 'Ja, KG Tomt & Fönsterservice hjälper privatpersoner, företag, bostadsrättsföreningar och fastighetsägare i Västerås och hela Västmanland med fönsterputs, gräsklippning, tomtskötsel, trädgårdsskötsel och snöskottning.'],
  ['Kan jag använda RUT-avdrag för fönsterputs och trädgårdsarbete?', 'Ja, RUT-avdraget gäller arbetskostnaden för hushållsnära tjänster som fönsterputs och flera typer av trädgårdsarbete. Du får avdraget direkt på fakturan när villkoren är uppfyllda.'],
  ['Erbjuder ni gräsklippning utan abonnemang?', 'Ja, du kan boka gräsklippning vid enstaka tillfällen utan bindningstid. Vi kan också lägga upp återkommande tomtskötsel efter behov.'],
  ['Utför ni snöskottning under vintern?', 'Ja, vi erbjuder snöskottning och vinterservice i Västerås och Västmanland för entréer, gångar, uppfarter och andra viktiga ytor.'],
];

const reviews = [
  {
    name: 'Admir Beka',
    text: 'Otroligt nöjd med både bemötandet och resultatet.\n\nProffsig och noggrann.\n\nRekommenderas starkt!',
  },
  {
    name: 'Asta Thor',
    text: 'Jag är mycket nöjd med KGTomt & Fönsterservice. Arbetet utfördes noggrant och professionellt, och resultatet blev precis som jag önskade. Trevligt bemötande, bra kommunikation och hög kvalitet från start till mål. Rekommenderas varmt.',
  },
  {
    name: 'Elin Karlsson',
    text: 'Väldigt nöjd med resultatet. Arbetet utfördes snabbt, noggrant och med ett trevligt bemötande. Rekommenderas verkligen!',
  },
  {
    name: 'Marcus Lindgren',
    text: 'Bra service från första kontakt till färdigt arbete. Tydlig kommunikation, professionellt utfört och ett resultat som överträffade mina förväntningar.',
  },
  {
    name: 'Sara Holm',
    text: 'Jag är supernöjd med hjälpen jag fick. Punktliga, noggranna och väldigt trevliga. Kommer definitivt anlita KGTomt & Fönsterservice igen.',
  },
];

const contactItems = [
  ['Telefon', phone, Phone],
  ['E post', email, EnvelopeSimple],
  ['Öppettider', 'Mån till Fre 08:00 till 19:00', Clock],
  ['Område', 'Västerås och hela Västmanland', MapPin],
];

function slugify(value) {
  return value.toLowerCase().replaceAll(' ', '-').replaceAll('ä', 'a').replaceAll('å', 'a').replaceAll('ö', 'o');
}

function SectionIntro({ kicker, title, text }) {
  return (
    <div className="section-intro">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function WorkVideosSection({ page = false }) {
  return (
    <section id="se-oss-i-arbete" className={page ? 'work-videos work-videos-page' : 'work-videos'} aria-labelledby="work-videos-title">
      <SectionIntro
        kicker="SE OSS I ARBETE"
        title={<span id="work-videos-title">Riktiga jobb.<br />Riktiga resultat.</span>}
        text="Här får du en inblick i hur vi arbetar ute hos våra kunder i Västerås och Västmanland, från fönsterputs till tomtskötsel och säsongsbaserade uppdrag."
      />
      <div className="work-video-grid reveal">
        {workVideos.map((video, index) => (
          <article className={index === 0 ? 'work-video-card featured' : 'work-video-card'} key={video.src}>
            <video src={video.src} controls muted playsInline preload="metadata" aria-label={video.label} title={video.label} />
            <div className="video-play-cue" aria-hidden="true">
              <PlayCircle size={42} weight="fill" />
            </div>
          </article>
        ))}
      </div>
      <div className="social-follow social-follow-work reveal">
        <p>Vill du se fler jobb vi utfört? Följ oss på Instagram, Facebook och TikTok.</p>
        <div className="social-follow-links" aria-label="Följ KG Tomt & Fönsterservice i sociala medier">
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={18} weight="bold" />Instagram</a>
          <a href={socialLinks.facebook} target="_blank" rel="noreferrer"><FacebookLogo size={18} weight="fill" />Facebook</a>
          <a href={socialLinks.tiktok} target="_blank" rel="noreferrer"><TiktokLogo size={18} weight="fill" />TikTok</a>
        </div>
      </div>
    </section>
  );
}

function ServiceDetailPage({ service }) {
  return (
    <section className="service-detail-page">
      <div className="service-detail-hero reveal">
        <a className="service-back" href="#tjanster"><ArrowLeft size={16} weight="bold" />Tillbaka till tjänster</a>
        <p className="kicker">{service.kicker}</p>
        <h1>{service.title}</h1>
        <p>{service.intro}</p>
      </div>

      <div className="service-detail-grid reveal">
        <article className="service-detail-card service-detail-card-large">
          <span>Vad ingår</span>
          <h2>Det här kan vi hjälpa dig med i Västerås och Västmanland</h2>
          <ul>
            {service.includes.map((item) => (
              <li key={item}><Check size={18} weight="bold" />{item}</li>
            ))}
          </ul>
        </article>

        <article className="service-detail-card">
          <span>Tillägg</span>
          <h2>Kan anpassas</h2>
          <ul>
            {service.options.map((item) => (
              <li key={item}><Check size={18} weight="bold" />{item}</li>
            ))}
          </ul>
        </article>

        <article className="service-detail-card">
          <span>Passar för</span>
          <h2>Vanliga behov</h2>
          <div className="service-tags">
            {service.goodFor.map((item) => <em key={item}>{item}</em>)}
          </div>
        </article>

        <article className="service-detail-cta">
          <p>Vill du veta vad som passar din fastighet bäst?</p>
          <a className="button primary" href="#kontakt">Be om offert</a>
        </article>
      </div>
    </section>
  );
}

function App() {
  const rootRef = useRef(null);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const [activeTab, setActiveTab] = useState('Gräsklippning');
  const [openFaq, setOpenFaq] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const activeService = flexibleTabs[activeTab];
  const ActiveServiceIcon = flexibleTabIcons[activeTab];
  const [priceValue, priceUnit] = activeService.price.includes(' ')
    ? activeService.price.split(/ (.+)/)
    : [activeService.price, ''];
  const priceUnitLines = priceUnit.includes(' efter RUT')
    ? priceUnit.replace(' efter RUT', '\nefter RUT').split('\n')
    : [priceUnit];
  const isWorkPage = currentHash === workPageHash;
  const activeServicePage = servicePages.find((service) => currentHash === `#${service.slug}`);

  const formMessage = useMemo(() => {
    if (formStatus === 'loading') return 'Skickar din förfrågan...';
    if (formStatus === 'success') return 'Tack. Vi återkommer så snabbt vi kan.';
    if (formStatus === 'error') return 'Det gick inte att skicka just nu. Kontrollera fälten eller ring oss direkt.';
    return '';
  }, [formStatus]);
  const showPreviousReview = () => setActiveReview((index) => (index === 0 ? reviews.length - 1 : index - 1));
  const showNextReview = () => setActiveReview((index) => (index + 1) % reviews.length);

  useLayoutEffect(() => {
    function syncPageWithHash() {
      setCurrentHash(window.location.hash);
      setMenuOpen(false);
    }

    window.addEventListener('hashchange', syncPageWithHash);
    syncPageWithHash();
    return () => window.removeEventListener('hashchange', syncPageWithHash);
  }, []);

  useLayoutEffect(() => {
    if (isWorkPage || activeServicePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const hash = window.location.hash.slice(1);
    if (!hash || hash === 'top' || hash === 'se-oss-i-arbete' || servicePages.some((service) => service.slug === hash)) return;

    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [isWorkPage, activeServicePage]);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.nav', { y: -20, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.set(['.hero-overlay', '.hero-copy > *'], { opacity: 0 });
      gsap.fromTo('.hero-copy > *', { y: 36, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '+=320',
          scrub: 0.75,
        },
      });
      gsap.to('.hero-overlay', {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '+=260',
          scrub: true,
        },
      });

      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 28 }, {
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [isWorkPage, activeServicePage]);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveReview((index) => (index + 1) % reviews.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const hasRequired = form.get('name') && form.get('lastName') && form.get('email') && form.get('phone') && form.get('interest') && form.get('message');

    if (!hasRequired) {
      setFormStatus('error');
      return;
    }

    setFormStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form)),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'Could not send contact form');
      }

      setFormStatus('success');
      formElement.reset();
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    }
  }

  return (
    <main ref={rootRef} className="page">
      <nav className={menuOpen ? 'nav menu-open' : 'nav'} aria-label="Huvudnavigering">
        <a className="brand" href="#top" aria-label="KG Tomt & Fönsterservice" onClick={() => setMenuOpen(false)}>
          <span><img src="/assets/kg-logo-mark.png" alt="" /></span>
          <strong>Tomt & Fönsterservice</strong>
        </a>
        <div className="nav-links" id="mobile-navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${slugify(item)}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </div>
        <a className="nav-work" href={workPageHash} onClick={() => setMenuOpen(false)}>
          <PlayCircle size={22} weight="regular" />
          Se oss i arbete
        </a>
        <a className="nav-call" href={phoneHref} onClick={() => setMenuOpen(false)}>
          <Phone size={18} weight="bold" />
          Ring oss
        </a>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <List size={24} weight="bold" />
        </button>
      </nav>

      {isWorkPage ? (
        <WorkVideosSection page />
      ) : activeServicePage ? (
        <ServiceDetailPage service={activeServicePage} />
      ) : (
        <>
      <section id="top" className="hero">
        <img className="hero-bg" src="/assets/hero-window-cleaning.png" alt="Fönsterputs i Västerås utförd av KG Tomt & Fönsterservice" fetchPriority="high" decoding="async" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-badge">
              <ShieldCheck size={18} weight="bold" />
              RUT-avdrag på fönsterputs och trädgårdsarbete
            </p>
            <h1>Fönsterputs och tomtskötsel i Västerås & Västmanland</h1>
            <p className="hero-text">KG Tomt & Fönsterservice hjälper dig med trygg och noggrann utomhusservice i Västerås och hela Västmanland.</p>
            <div className="hero-actions" aria-label="Snabba val">
              <a className="button primary" href="#priser">Se våra paket</a>
              <a className="button secondary" href="#kontakt">Kontakta oss</a>
              <a className="button quiet" href="#kontakt">Kostnadsfri offert</a>
            </div>
            <div className="trust-points">
              <span><Check size={18} weight="bold" />Nöjda kunder</span>
              <span><Check size={18} weight="bold" />Verksamma i Västmanland</span>
            </div>
          </div>
        </div>
      </section>

      <section id="om-oss" className="about reveal">
        <div className="about-text">
          <p className="kicker">Om oss</p>
          <h2>Lokal service i Västerås med tydliga besked.</h2>
          <p>KG Tomt & Fönsterservice hjälper privatpersoner, företag, bostadsrättsföreningar och fastighetsägare i Västerås och hela Västmanland med fönsterputs, gräsklippning, tomtskötsel, trädgårdsskötsel och snöskottning.</p>
        </div>
        <figure className="about-image about-image-tall">
          <img src="/assets/kg-hoodie.jpg" alt="KG Tomt & Fönsterservice arbetskläder för fönsterputs och tomtskötsel i Västerås" loading="lazy" decoding="async" />
        </figure>
        <figure className="about-image about-image-wide">
          <img src="/assets/kg-window-result.jpg" alt="Nyputsade fönster efter fönsterputs i Västmanland" loading="lazy" decoding="async" />
        </figure>
        <div className="about-text about-person">
          <p className="kicker">MÖT PERSONEN BAKOM FÖRETAGET</p>
          <h2>Personlig service från första kontakt till färdigt resultat</h2>
          <p>KG Tomt & Fönsterservice drivs av Elton Kaciku Gasi, ägare och utförare med cirka tre års erfarenhet av fönsterputs, tomtskötsel och utomhusservice. Som kund har du direktkontakt med samma person genom hela processen.</p>
          <p>Med fokus på tydlig kommunikation, noggrannhet och pålitlig service är målet alltid att göra det enkelt för kunden och lämna efter sig ett prydligt och professionellt resultat. KG Tomt & Fönsterservice är verksamt i Västerås och hela Västmanland.</p>
        </div>
      </section>

      <section id="tjanster" className="services" aria-label="Våra tjänster">
        <div className="services-panel reveal">
          <div className="services-panel-heading">
            <p className="kicker">Våra tjänster</p>
            <h2>Fönsterputs och utomhusservice nära dig</h2>
          </div>
          <div className="custom-service-grid">
            {services.map((service) => (
              <article className={service.slug === 'tjanst-tradgardsskotsel' ? 'custom-service-card custom-service-card-long-title' : 'custom-service-card'} key={service.title}>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
                <a href={`#${service.slug}`}>Läs mer <ArrowRight size={17} weight="bold" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="priser" className="pricing">
        <div className="pricing-heading">
          <p className="kicker">Priser</p>
          <h2>Välj ditt paket</h2>
        </div>
        <div className="pricing-grid reveal">
          <article className="price-card price-card-garden">
            <div className="price-band">
              <span>Gräsklippning</span>
            </div>
            <div className="price-body">
              <h3>Grundservice för gräsklippning</h3>
              <span className="price-prefix">Från</span>
              <strong className="price-amount">1 299 kr</strong>
              <div className="price-rule" />
              <div className="price-table">
                {[
                  ['0 till 399 kvm:', '1 299 kr'],
                  ['400 till 699 kvm:', '1 990 kr'],
                  ['700 till 999 kvm:', '2 690 kr'],
                  ['1000 till 1500 kvm:', '3 590 kr'],
                ].map(([size, price]) => (
                  <p key={size}><span>{size}</span><strong>{price}</strong></p>
                ))}
              </div>
              <ul>
                {packages[0].points.map((point) => (
                  <li key={point}><Check size={18} weight="bold" aria-hidden="true" />{point}</li>
                ))}
              </ul>
              <a className="button primary full" href="#kontakt"><CalendarCheck size={20} weight="bold" />Boka kostnadsfri offert</a>
            </div>
          </article>
          <article className="price-card price-card-window">
            <div className="price-band price-band-light">
              <span>Invändig och utvändig fönsterputs som abonnemang</span>
            </div>
            <div className="price-body">
              <h3>Fönsterservice med RUT-avdrag</h3>
              <span className="price-prefix">Från</span>
              <strong className="price-amount">1 399 kr<small>/mån</small></strong>
              <div className="price-rule" />
              <ul>
                {packages[1].points.map((point) => (
                  <li key={point}><Check size={18} weight="bold" aria-hidden="true" />{point}</li>
                ))}
              </ul>
              <a className="button secondary full" href="#kontakt"><CalendarCheck size={20} weight="bold" />Boka kostnadsfri offert</a>
            </div>
            <img src="/assets/pricing-window-reference.png" alt="Rent fönster efter fönsterputs i Västerås med grönska utanför" loading="lazy" decoding="async" />
          </article>
        </div>
      </section>

      <section className="flexible reveal">
        <div>
          <SectionIntro
            kicker="Utan bindningstid"
            title="Flexibla tjänster"
          />
          <div className="tabs" role="tablist" aria-label="Flexibla tjänster">
            {Object.keys(flexibleTabs).map((tab) => {
              const Icon = flexibleTabIcons[tab];
              return (
                <button className={activeTab === tab ? 'active' : ''} key={tab} onClick={() => setActiveTab(tab)} type="button" role="tab" aria-selected={activeTab === tab} aria-controls="flexible-service-panel">
                  <Icon size={18} weight={activeTab === tab ? 'fill' : 'regular'} />
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>
          <p className="flexible-copy">Boka hjälp vid enstaka tillfällen när du behöver extra handräckning. Ingen bindningstid och inga löpande abonnemang.</p>
        </div>
        <article className="tab-panel" id="flexible-service-panel" role="tabpanel">
          <div className="tab-visual" aria-hidden="true">
            <ActiveServiceIcon size={58} weight="duotone" />
            <span />
          </div>
          <div className="tab-price">
            <strong>{priceValue}</strong>
            {priceUnit && (
              <span className="tab-price-unit">
                {priceUnitLines.map((line) => <span key={line}>{line}</span>)}
              </span>
            )}
          </div>
          <h3>{activeService.title}</h3>
          <p>{activeService.text}</p>
          <ul>
            {activeService.points.map((point) => <li key={point}><Check size={18} weight="bold" />{point}</li>)}
          </ul>
          <a className="button secondary full" href="#kontakt" aria-label={`Boka ${activeService.title} i Västerås och Västmanland`}>Boka nu <ArrowRight size={18} weight="bold" /></a>
        </article>
      </section>

      <section className="rut-section reveal">
        <div className="rut-content">
          <div className="rut-heading">
            <p className="kicker">RUT-AVDRAG</p>
            <h2>Spara 50% med RUT-avdrag</h2>
            <p>Fönsterputs och flera typer av trädgårdsarbete kan berättiga till RUT-avdrag, vilket innebär att du bara betalar hälften av arbetskostnaden. Vi hjälper dig med processen, enkelt och smidigt.</p>
          </div>
          <div className="rut-benefits">
            {[
              [Percent, '50% avdrag', 'Du betalar bara halva priset, resterande dras av automatiskt via Skatteverket.'],
              [FileText, 'Vi sköter pappersarbetet', 'Vi ansöker om RUT-avdraget åt dig. Du behöver inte göra något själv.'],
              [CalendarCheck, 'Boka idag och börja spara direkt', 'Ju tidigare du bokar, desto mer sparar du. Ingen bindningstid och inga dolda avgifter, bara ren besparing från dag ett.'],
            ].map(([Icon, title, text]) => (
              <article className="rut-benefit" key={title}>
                <span><Icon size={30} weight="duotone" /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="rut-example-wrap">
          <article className="rut-example">
            <div className="rut-example-top">
              <HouseLine size={72} weight="duotone" />
              <h3>Räkneexempel:<br />Komplett service</h3>
              <div className="rut-badge"><strong>50%</strong><span>RUT-AVDRAG</span></div>
            </div>
            <div className="rut-example-body">
              <p><span>Ordinarie pris</span><strong>2 990 kr/mån</strong></p>
              <p><span>RUT-avdrag (50%)</span><strong>1 495 kr avdrag</strong></p>
              <p className="total"><span>Du betalar</span><strong>1 495 kr/mån</strong></p>
            </div>
          </article>
          <div className="rut-trust">
            <span aria-hidden="true" />
            <p>Godkänt för RUT-avdrag via Skatteverket</p>
            <span aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="faq" className="faq reveal">
        <SectionIntro kicker="FAQ" title="Vanliga frågor" text="Hittar du inte svaret? Ring oss gärna!" />
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <article className="faq-item" key={question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`}>
                <span>{question}</span>
                <CaretDown className={openFaq === index ? 'rotated' : ''} size={20} weight="bold" aria-hidden="true" />
              </button>
              {openFaq === index && <p id={`faq-answer-${index}`}>{answer}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="reviews reveal" aria-label="Kundomdömen">
        <div className="reviews-heading">
          <p className="kicker">Recensioner</p>
          <h2>Vad våra kunder säger</h2>
        </div>
        <div className="reviews-carousel">
          <button className="review-arrow" type="button" onClick={showPreviousReview} aria-label="Visa föregående recension">
            <ArrowLeft size={22} weight="bold" />
          </button>
          <div className="reviews-window">
            <div className="reviews-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
              {reviews.map((review) => (
                <article className="review-card" key={review.name}>
                  <div className="review-meta">
                    <span className="review-stars" aria-label="5 av 5">
                      {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={17} weight="fill" />)}
                    </span>
                    <h3>{review.name}</h3>
                  </div>
                  <blockquote>
                    {review.text.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
          <button className="review-arrow" type="button" onClick={showNextReview} aria-label="Visa nästa recension">
            <ArrowRight size={22} weight="bold" />
          </button>
        </div>
        <div className="review-dots" aria-label="Välj recension">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              className={activeReview === index ? 'active' : ''}
              onClick={() => setActiveReview(index)}
              aria-label={`Visa recension från ${review.name}`}
              aria-current={activeReview === index ? 'true' : undefined}
            />
          ))}
        </div>
      </section>

      <section id="kontakt" className="contact">
        <div className="contact-grid reveal">
          <aside className="contact-panel">
            <img className="contact-logo" src="/assets/kg-logo-full.png" alt="KG Tomt & Fönsterservice logotyp för lokal service i Västmanland" loading="lazy" decoding="async" />
            <div className="contact-heading">
              <p className="kicker">Kontakt</p>
              <h2>Begär offert</h2>
              <p>Kontakta oss för en kostnadsfri genomgång av vad som passar just din fastighet i Västerås eller Västmanland.</p>
            </div>
            <dl className="contact-details">
              <div>
                <dt>Telefon</dt>
                <dd><a href={phoneHref}>{phone}</a></dd>
              </div>
              <div>
                <dt>E post</dt>
                <dd><a href={`mailto:${email}`}>{email}</a></dd>
              </div>
              <div>
                <dt>Öppettider</dt>
                <dd>Mån till Fre 08:00 till 19:00</dd>
              </div>
              <div>
                <dt>Område</dt>
                <dd>Västerås och hela Västmanland</dd>
              </div>
            </dl>
            <div className="social-follow contact-social">
              <p>Du kan även följa våra senaste jobb och kontakta oss via sociala medier.</p>
              <div className="social-follow-links" aria-label="Sociala medier">
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={18} weight="bold" />Instagram</a>
                <a href={socialLinks.facebook} target="_blank" rel="noreferrer"><FacebookLogo size={18} weight="fill" />Facebook</a>
                <a href={socialLinks.tiktok} target="_blank" rel="noreferrer"><TiktokLogo size={18} weight="fill" />TikTok</a>
              </div>
            </div>
          </aside>
          <form className="contact-form" onSubmit={handleSubmit} aria-label="Kontaktformulär för offert">
            <label>Förnamn *<input name="name" autoComplete="given-name" required /></label>
            <label>Efternamn *<input name="lastName" autoComplete="family-name" required /></label>
            <label>E post *<input name="email" type="email" autoComplete="email" required /></label>
            <label>Telefon *<input name="phone" autoComplete="tel" required /></label>
            <label>Intresserad av *
              <select name="interest" defaultValue="" required>
                <option value="" disabled>Välj tjänst...</option>
                {['Gräsklippning', 'Fönsterputs', 'Tomtskötsel', 'Häckklippning', 'Snöskottning', 'Vinterservice', 'Paket och abonnemang', 'Annat'].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="wide">Meddelande *<textarea name="message" required /></label>
            <button className="button primary submit" type="submit" disabled={formStatus === 'loading'}>
              {formStatus === 'loading' ? 'Skickar...' : 'Skicka förfrågan'}
              <ArrowRight size={18} weight="bold" />
            </button>
            {formMessage && <p className={`form-message ${formStatus}`}>{formMessage}</p>}
          </form>
        </div>
      </section>
        </>
      )}

      <footer className="footer">
        <div className="footer-about footer-card">
          <a className="footer-brand" href="#top">
            <span><img src="/assets/kg-logo-mark.png" alt="" /></span>
            <strong>Tomt & Fönsterservice</strong>
          </a>
          <p>Trygg hjälp med fönsterputs, tomtskötsel och säsongsskötsel i Västerås och Västmanland.</p>
          <div className="footer-socials" aria-label="Sociala medier">
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookLogo size={22} weight="fill" /></a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramLogo size={22} weight="bold" /></a>
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><TiktokLogo size={22} weight="fill" /></a>
          </div>
        </div>
        <div className="footer-links">
          <h3>Snabblänkar</h3>
          {navItems.map((item) => <a key={item} href={`#${slugify(item)}`}>{item}</a>)}
        </div>
        <div className="footer-contact">
          <h3>Kontakt</h3>
          <a href={phoneHref}>{phone}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <span>Mån till Fre 08:00 till 19:00</span>
        </div>
        <p className="copyright">© 2026 KG Tomt & Fönsterservice. Alla rättigheter förbehållna.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

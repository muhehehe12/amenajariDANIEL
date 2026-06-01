/**
 * 1. Sistem de Traducere (i18n)
 * Gestioneaza schimbarea limbii pe site fara a reincarca pagina.
 */
const translations = {
    ro: {
        hero_title: "Renovări și Amenajări Profesionale în Cluj-Napoca",
        hero_sub: "Finisaje complete pentru apartamente, case și spații comerciale.",
        btn_call: "Sună Acum",
        btn_whatsapp: "Mesaj WhatsApp",
        btn_quote: "Cere Ofertă",
        about_title: "Expertiză dovedită în timp",
        about_desc: "Cu peste 6 ani de activitate continuă și clienți mulțumiți pe platforme precum OLX din 2018, abordăm fiecare proiect cu seriozitatea unui partener de încredere, nu doar a unui executant.",
        stat_years: "Ani Experiență",
        stat_projects: "Proiecte Finalizate",
        stat_focus: "Orientare Client",
        services_title: "Serviciile Noastre",
        services_sub: "Soluții complete pentru interior și exterior.",
        srv_1_title: "Gresie și Faianță",
        srv_1_desc: "Montaj de precizie pentru băi, bucătării și holuri.",
        srv_2_title: "Parchet",
        srv_2_desc: "Montaj parchet laminat și stratificat, perfect plan.",
        srv_3_title: "Glet și Zugrăveli",
        srv_3_desc: "Pereți perfecți și finisaje impecabile, vopsea lavabilă.",
        srv_4_title: "Rigips",
        srv_4_desc: "Tavane false, scafe și compartimentări gips-carton.",
        srv_5_title: "Șape și Tencuieli",
        srv_5_desc: "Baze solide și plane pentru orice tip de finisaj ulterior.",
        srv_6_title: "Exterior & Structuri",
        srv_6_desc: "Garduri, terase, confecții metalice și structuri ușoare.",
        gallery_title: "Lucrări Recente",
        contact_title: "Pregătit să începem proiectul tău?",
        contact_sub: "Contactează-ne pentru o evaluare gratuită și un deviz personalizat.",
        contact_name: "Daniel - Prezent pe OLX din 2018"
    },
    en: {
        hero_title: "Professional Renovation & Construction in Cluj-Napoca",
        hero_sub: "Complete finishing services for apartments, houses, and commercial spaces.",
        btn_call: "Call Now",
        btn_whatsapp: "WhatsApp Us",
        btn_quote: "Get Quote",
        about_title: "Proven Expertise Over Time",
        about_desc: "With over 6 years of continuous activity and satisfied clients on platforms like OLX since 2018, we approach every project as a trusted partner, not just an executor.",
        stat_years: "Years Experience",
        stat_projects: "Completed Projects",
        stat_focus: "Customer Focus",
        services_title: "Our Services",
        services_sub: "Complete indoor and outdoor solutions.",
        srv_1_title: "Tiles & Ceramics",
        srv_1_desc: "Precision installation for bathrooms, kitchens, and hallways.",
        srv_2_title: "Hardwood & Laminate",
        srv_2_desc: "Perfectly flat laminate and engineered wood flooring.",
        srv_3_title: "Plastering & Painting",
        srv_3_desc: "Flawless walls and impeccable finishes, washable paint.",
        srv_4_title: "Drywall (Rigips)",
        srv_4_desc: "Dropped ceilings, bulkheads, and drywall partitions.",
        srv_5_title: "Screeds & Plaster",
        srv_5_desc: "Solid and flat bases for any subsequent finishing.",
        srv_6_title: "Exterior & Structures",
        srv_6_desc: "Fences, terraces, metal structures, and light frameworks.",
        gallery_title: "Recent Works",
        contact_title: "Ready to start your project?",
        contact_sub: "Contact us for a free evaluation and personalized quote.",
        contact_name: "Daniel - Active on OLX since 2018"
    }
};

function setLanguage(lang) {
    // Salvăm preferința în browser
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;

    // Actualizăm textul pentru fiecare element cu atributul 'data-i18n'
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        // Verificăm dacă avem HTML în traducere (ex: <br>)
        if(translations[lang][key].includes('<br>')) {
             el.innerHTML = translations[lang][key];
        } else {
             el.textContent = translations[lang][key];
        }
    });

    // Actualizăm starea butoanelor din navbar
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });
}

// Setăm limba inițială bazată pe ultima vizită sau default 'ro'
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'ro';
    setLanguage(savedLang);
});


/**
 * 2. Animații la Scroll (Intersection Observer)
 * Apare elementele când intră în viewport
 */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Declanșează când 15% din element este vizibil
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Opțional: Oprește observarea după ce s-a animat o dată
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate').forEach(element => {
    fadeObserver.observe(element);
});


/**
 * 3. Funcția pentru Numărătoare Animată (Stats Counter)
 */
const countUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 secunde total
            const step = Math.ceil(target / (duration / 16)); // ~60fps
            
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.innerText = current;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
            observer.unobserve(counter); // Animăm doar o dată
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    countUpObserver.observe(counter);
});

/**
 * 4. Efect Header la Scroll (Pentru varianta Dark Premium)
 */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

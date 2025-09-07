
// Funció per actualitzar el contingut de la pàgina amb les traduccions
const updateContent = () => {
  // Comprovem si i18next està llest
  if (!i18next.isInitialized) return;

  // Actualitzem tots els elements amb l'atribut data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    // Gestionem les metaetiquetes que necessiten actualitzar l'atribut 'content'
    if (key.startsWith('[content]')) {
      const attrKey = key.substring(9); // Eliminem '[content]'
      el.setAttribute('content', i18next.t(attrKey));
    } else {
      el.innerHTML = i18next.t(key);
    }
  });

  // Actualitzem el títol de la pàgina explícitament
  document.title = i18next.t('meta.title');
};

// Funció per canviar l'idioma
const changeLanguage = (lng) => {
  i18next.changeLanguage(lng);
};

// Inicialització de i18next
i18next
  .use(i18nextHttpBackend)
  .init({
    lng: 'ca', // Idioma per defecte
    fallbackLng: 'ca', // Idioma de reserva
    debug: true,
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json', // Ruta relativa als fitxers de traducció
    },
    ns: ['translation'],
    defaultNS: 'translation'
  }).then(() => {
    // Un cop inicialitzat, fem la primera traducció
    updateContent();
  });

// Quan l'idioma canvia, actualitzem el contingut
i18next.on('languageChanged', () => {
  updateContent();
});

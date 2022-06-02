import de from "./locales/de/translation.json"; // .use(i18nextHttpBackend) didn't work out of the box
import en from "./locales/en/translation.json"; // .use(i18nextHttpBackend) didn't work out of the box

const languages = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
};

const rerender = () => {
  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  $("body").localize();
};

$(function () {
  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    // i18next-http-backend
    // loads translations from your server
    // https://github.com/i18next/i18next-http-backend
    // .use(i18nextHttpBackend) // .use(i18nextHttpBackend) didn't work out of the box
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(i18nextBrowserLanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init(
      {
        debug: true,
        fallbackLng: "en",
        resources: {
          en: {
            translation: en, // .use(i18nextHttpBackend) didn't work out of the box
          },
          de: {
            translation: de, // .use(i18nextHttpBackend) didn't work out of the box
          },
        },
      },
      (err, t) => {
        if (err) return console.error(err);

        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        jqueryI18next.init(i18next, $, { useOptionsAttr: true });

        // fill language switcher
        Object.keys(languages).map((lng) => {
          const opt = new Option(languages[lng].nativeName, lng);
          if (lng === i18next.resolvedLanguage) {
            opt.setAttribute("selected", "selected");
          }
          $("#languageSwitcher").append(opt);
        });
        $("#languageSwitcher").change((a, b, c) => {
          const chosenLng = $(this).find("option:selected").attr("value");
          i18next.changeLanguage(chosenLng, () => {
            rerender();
          });
        });

        rerender();
      }
    );
});

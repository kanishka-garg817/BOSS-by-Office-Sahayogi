export const THEME_STORAGE_KEY = "boss-theme";

/**
 * Runs before the page is painted, so a visitor who chose (or whose device prefers) the dark
 * theme never sees a flash of the light one. A fixed string with nothing from the visitor in it.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

const defaultPalette = "kum"; // "kum" | "mavi" | "yesil" | "gri"

function getPreferPalette() {
  return localStorage.getItem("palette") || defaultPalette;
}

let paletteValue = getPreferPalette();

function setPalette(value) {
  paletteValue = value;
  localStorage.setItem("palette", paletteValue);
  reflectPalette();
}

function reflectPalette() {
  document.firstElementChild.setAttribute("data-palette", paletteValue);
  document
    .querySelectorAll("[data-palette-btn]")
    .forEach(btn =>
      btn.setAttribute(
        "aria-pressed",
        btn.getAttribute("data-palette-btn") === paletteValue ? "true" : "false"
      )
    );
}

// set early so no page flashes / CSS is made aware
reflectPalette();

window.onload = () => {
  function setPaletteFeature() {
    reflectPalette();
    document.querySelectorAll("[data-palette-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        setPalette(btn.getAttribute("data-palette-btn"));
      });
    });
  }

  setPaletteFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setPaletteFeature);
};

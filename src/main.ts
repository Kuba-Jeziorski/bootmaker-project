import Alpine from "alpinejs";

import { defaultBootsObject } from "./variables/global-variables";

import { getBoots } from "./utils/get-boots";
import { handleGalleryImgsHidden } from "./functions/handle-gallery-img-hidden";
import { getShowMoreButtonSetup } from "./functions/get-show-more-button-setup";

// fetch data asap and save it as a localStorage item
(async () => {
  const boots = await getBoots();

  if (boots) {
    localStorage.setItem("boots", JSON.stringify(boots));
  } else {
    localStorage.setItem("boots", "");
    console.error("Failed to fetch boots");
  }
})();

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("boots", () => {
    let bootsObject = defaultBootsObject;

    try {
      const bootsRaw = localStorage.getItem("boots");
      if (bootsRaw) {
        const boots = JSON.parse(bootsRaw);
        if (boots.length > 0) {
          bootsObject = boots[0];
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }

    console.log(bootsObject);

    const localStorageVariant = localStorage.getItem("dispayedVariant") ?? "0";
    console.log(`localStorageVariant: ${localStorageVariant}`);

    return {
      ...bootsObject,
      displayedVariant: Number(localStorageVariant),
      numberOfVariants: bootsObject.variant.length,
      setVariant(index: number) {
        this.displayedVariant = index;
        localStorage.setItem("displayedVariant", String(index));
      },
    };
  });
});

Alpine.start();

window.addEventListener("DOMContentLoaded", () => {
  getShowMoreButtonSetup();
  handleGalleryImgsHidden();
});

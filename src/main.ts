import Alpine from "alpinejs";

import { defaultBootsObject, staleTime } from "./global/global-variables";

// import { getBoots } from "./utils/get-boots";
import { handleGalleryImgsHidden } from "./functions/handle-gallery-img-hidden";
import { getShowMoreButtonSetup } from "./functions/get-show-more-button-setup";
import { fetchAndStoreBoots } from "./utils/fetch-and-store-boots";
import { handleSizeOverlayOpen } from "./functions/handle-size-overlay-open";
import {
  sizeOverlayButtonOpen,
  sliderLeftButton,
  sliderRightButton,
} from "./global/global-elements";
import { handleSizeOverlayClose } from "./functions/handle-size-overlay-close";
import { handleSlider } from "./functions/handle-slider";
import { fetchAndStoreRecommended } from "./utils/fetch-and-store-recommended";

fetchAndStoreBoots();

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

window.Alpine = Alpine;

type Proposition = {
  id: string | number;
  name: string;
  image: string;
  price: string;
  colors: {
    colorName: string;
    image: string;
  }[];
};

type RecommendedItem = {
  id: string;
  propositions: Proposition[];
};

document.addEventListener("alpine:init", () => {
  Alpine.data("boots", () => {
    const displayedVariant = localStorage.getItem("displayedVariant") ?? "0";
    const displayedSize = localStorage.getItem("displayedSize") ?? "N/A";
    const displayedWidth = localStorage.getItem("displayedWidth") ?? "N/A";
    const displayedCalfWidth =
      localStorage.getItem("displayedCalfWidth") ?? "N/A";

    let bootsData = { ...defaultBootsObject };

    return {
      ...bootsData,

      // UI state
      displayedVariant,
      displayedSize,
      displayedWidth,
      displayedCalfWidth,

      // Additional data
      recommended: [] as RecommendedItem[],

      // Methods
      setVariant(index: string) {
        this.displayedVariant = index;
        localStorage.setItem("displayedVariant", String(index));
      },
      setSize(size: string) {
        this.displayedSize = size;
        localStorage.setItem("displayedSize", String(size));
      },
      setWidth(width: string) {
        this.displayedWidth = width;
        localStorage.setItem("displayedWidth", width);
      },
      setCalfWidth(length: string) {
        this.displayedCalfWidth = length;
        localStorage.setItem("displayedCalfWidth", length);
      },

      getRecommendedForDisplayed() {
        const id = this.variant[Number(this.displayedVariant)]?.id;
        return (
          this.recommended.find(
            (singleRecommended) => singleRecommended.id === String(id)
          )?.propositions ?? []
        );
      },

      refresh() {
        try {
          const bootsRaw = localStorage.getItem("boots");
          const recommendedRaw = localStorage.getItem("recommended");

          if (bootsRaw) {
            const boots = JSON.parse(bootsRaw);
            if (boots.length > 0) {
              Object.assign(this, boots[0]);
            }
          }

          if (recommendedRaw) {
            this.recommended = JSON.parse(recommendedRaw);
          }
        } catch (err) {
          console.error("Error refreshing state from localStorage:", err);
        }
      },

      init() {
        Promise.all([fetchAndStoreBoots(), fetchAndStoreRecommended()]).then(
          () => {
            this.refresh();
          }
        );

        setInterval(() => {
          Promise.all([fetchAndStoreBoots(), fetchAndStoreRecommended()]).then(
            () => {
              this.refresh();
            }
          );
        }, staleTime * 60 * 1000);
      },
    };
  });
});

Alpine.start();

window.addEventListener("DOMContentLoaded", () => {
  getShowMoreButtonSetup();
  handleGalleryImgsHidden();

  // SELECT OVERLAY
  sizeOverlayButtonOpen?.addEventListener("click", () =>
    handleSizeOverlayOpen()
  );
  document.body.addEventListener("click", (e) => {
    const target = e.target as Element;
    const closest = target.closest(".size-overlay-close");

    if (!closest) {
      return;
    }
    handleSizeOverlayClose();
  });

  // RECOMMENDED SLIDER
  sliderLeftButton?.addEventListener("click", () => handleSlider("left"));
  sliderRightButton?.addEventListener("click", () => handleSlider("right"));
});

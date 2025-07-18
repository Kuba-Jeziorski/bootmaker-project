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
import { handleGenericButton } from "./functions/handle-generic-button";
import { handleImgModalOpen } from "./functions/handle-img-modal-open";
import { handleImgModalClose } from "./functions/handle-img-modal-close";

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
    const displayedInModal = "";

    let bootsData = { ...defaultBootsObject };

    let recommendedData = [];

    try {
      const bootsRaw = localStorage.getItem("boots");
      if (bootsRaw) {
        const bootsParsed = JSON.parse(bootsRaw);
        if (bootsParsed.length > 0) bootsData = bootsParsed[0];
      }

      const recommendedRaw = localStorage.getItem("recommended");
      if (recommendedRaw) {
        recommendedData = JSON.parse(recommendedRaw);
      }
    } catch (e) {
      console.error("Error parsing localStorage:", e);
    }

    return {
      ...bootsData,

      // UI STATE
      displayedVariant,
      displayedSize,
      displayedWidth,
      displayedCalfWidth,
      displayedInModal,

      // ADDITIONAL DATA
      recommended: [] as RecommendedItem[],

      // METHODS
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
      setModalImg(src: string) {
        this.displayedInModal = src;
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

  // INFORM BUTTON
  document.body.addEventListener("click", (e) => {
    const target = e.target as Element;
    const closest = target.closest(".generic-button");

    if (!closest) {
      return;
    }
    handleGenericButton();
  });

  // IMG MODAL
  document.body.addEventListener("click", (e) => {
    const target = e.target as Element;
    const closest = target.closest(".gallery-imgs img");

    if (!closest) {
      return;
    }
    handleImgModalOpen();
  });
  document.body.addEventListener("click", (e) => {
    const target = e.target as Element;
    const closest = target.closest(".modal-close");

    if (!closest) {
      return;
    }
    handleImgModalClose();
  });
});

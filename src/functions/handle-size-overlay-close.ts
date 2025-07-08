import { sizeOverlay, sizeOverlayContent } from "../global/global-elements";

export const handleSizeOverlayClose = () => {
  sizeOverlayContent?.classList.add("translate-x-full");
  setTimeout(() => {
    sizeOverlay?.classList.add("hidden");
    sizeOverlay?.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }, 300);
};

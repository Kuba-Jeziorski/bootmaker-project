import { sizeOverlay, sizeOverlayContent } from "../global/global-elements";

export const handleSizeOverlayOpen = () => {
  sizeOverlay?.classList.remove("hidden");
  sizeOverlay?.classList.add("flex");
  document.body.classList.add("overflow-hidden");
  requestAnimationFrame(() => {
    sizeOverlayContent?.classList.remove("translate-x-full");
  });
};

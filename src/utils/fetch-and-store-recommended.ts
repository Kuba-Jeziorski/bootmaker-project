import { getRecommended } from "./get-recommended";

export const fetchAndStoreRecommended = async () => {
  try {
    const recommended = await getRecommended();

    if (recommended) {
      localStorage.setItem("recommended", JSON.stringify(recommended));
    } else {
      localStorage.setItem("recommended", "");
      console.error("Failed to fetch recommended");
    }
  } catch (err) {
    console.error("Recommended fetch error:", err);
  }
};

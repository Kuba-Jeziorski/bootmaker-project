import { getBoots } from "./get-boots";

export const fetchAndStoreBoots = async () => {
  try {
    const boots = await getBoots();

    if (boots) {
      localStorage.setItem("boots", JSON.stringify(boots));
    } else {
      localStorage.setItem("boots", "");
      console.error("Failed to fetch boots");
    }
  } catch (err) {
    console.error("Boots fetch error:", err);
  }
};

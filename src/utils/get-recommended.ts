import { localServerRecommendedUrl } from "../global/global-variables";

export const getRecommended = async () => {
  try {
    const response = await fetch(localServerRecommendedUrl);
    if (!response.ok) {
      throw new Error(
        `Response status: ${response.status}. Make sure that json-server is on!`
      );
    }

    const json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown error", error);
    }
  }
};

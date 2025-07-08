import { slider } from "../global/global-elements";

type Props = "left" | "right";

export const handleSlider = (direction: Props) => {
  const isLeft = direction === "left" ? -1 : 1;
  const sliderWidth = slider?.getBoundingClientRect().width;
  const sliderShift = sliderWidth ? sliderWidth / 2 : 0;

  slider?.scrollBy({
    left: Number(`${isLeft * sliderShift}`),
    behavior: "smooth",
  });
};

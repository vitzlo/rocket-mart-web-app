import rocket_red from "../images/rocket_red.svg";
import rocket_may from "../images/rocket_may.svg";
import rocket_serena from "../images/rocket_serena.svg";

export const pfpPathToSvg = {
  "rocket_red": rocket_red,
  "rocket_may": rocket_may,
  "rocket_serena": rocket_serena,
};

export const generatePfp = () => {
  const pfpPool = Object.keys(pfpPathToSvg);
  return pfpPool[Math.floor(Math.random() * pfpPool.length)];
};

export const blankPfpPath = "https://www.svgrepo.com/show/135058/circle-outline.svg";

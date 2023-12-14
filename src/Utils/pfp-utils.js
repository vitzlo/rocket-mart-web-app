const internalPfpPathToSvg = {
  rocket_red: "/images/rocket_red.sv",
  rocket_may: "/images/rocket_may.svg",
  rocket_serena: "/images/rocket_serena.svg",
};

export const pfpPathToSvg = {
  ...internalPfpPathToSvg,
  // can add custom pfp that we want in here
  grader:
    "https://media.discordapp.net/attachments/892903537263116349/1167966808133869598/IMG_3044.jpg?ex=657e315a&is=656bbc5a&hm=9dd1aba1f8548f73403417dacf28db3a4f09828100878c8e9cb0d70398307dec&=&format=webp&width=442&height=590",
};

export const generatePfp = () => {
  const pfpPool = Object.keys(internalPfpPathToSvg);
  return pfpPool[Math.floor(Math.random() * pfpPool.length)];
};

export const blankPfpPath =
  "https://www.svgrepo.com/show/135058/circle-outline.svg";

const mapCollectionsToCategory = {
  Sculptures: "4mFBpLBMtNUa7xN2C5vN",
  Drawings: "8rDENGVXRYeY0SV5nsjA",
  Musings: "9u6LyU51y0GBrjxFwAtK",
  Photography: "Xeni4dQg0iusQOa80ws2",
  DigitalArt: "aSfVVMcGrwlApClvcule",
};

export const getDocId = (categoryName) => {
  return mapCollectionsToCategory[categoryName];
};

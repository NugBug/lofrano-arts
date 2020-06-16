const mapCollectionsToCategory = {
  Sculptures: "4mFBpLBMtNUa7xN2C5vN",
  Sketches: "8rDENGVXRYeY0SV5nsjA",
  Paintings: "9u6LyU51y0GBrjxFwAtK",
  Photography: "Xeni4dQg0iusQOa80ws2",
  Prints: "aSfVVMcGrwlApClvcule",
};

export const getDocId = (categoryName) => {
  return mapCollectionsToCategory[categoryName];
};

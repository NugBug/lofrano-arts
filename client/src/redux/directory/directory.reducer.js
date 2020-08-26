const INITIAL_STATE = {
  sections: [
    {
      title: "sculptures",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FNegative%20Cubes_original?alt=media&token=6135c2ee-fefd-4a46-a6ab-5c71fb2f2d50",
      thumbUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FNegative%20Cubes_thumb?alt=media&token=d9bd4ce6-4f24-4bb3-827f-c86ca47163a1",
      id: 1,
      linkUrl: "gallery/sculptures",
    },
    {
      title: "photography",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FEspresso_1594662951124_original?alt=media&token=dafc90a3-4d06-47ff-8265-1058f4b25582",
      thumbUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FEspresso_1594662951124_thumb?alt=media&token=cd3717a0-a9dc-4ce8-abe2-e72c2844a306",
      id: 2,
      linkUrl: "/gallery/photography",
    },
    {
      title: "musings",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FSculpture%20Work_thumb?alt=media&token=1f2a8c0b-fec6-4883-a959-6e8c0b17f829",
      id: 3,
      linkUrl: "/gallery/musings",
    },
    {
      title: "drawings",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FMorning%20Commute%201_1593286233553_original?alt=media&token=6385f5f0-f13c-41bc-a319-2faad58362ae",
      thumbUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FMorning%20Commute%201_1593286233553_thumb?alt=media&token=da40f27e-1886-42eb-8aee-93fdc26a0ac5",
      size: "large",
      id: 4,
      linkUrl: "/gallery/drawings",
    },
    {
      title: "digital art",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FStreet%20Car_1593286530167_original?alt=media&token=6396f41e-d1b8-4715-9585-3481c93c0528",
      thumbUrl:
        "https://firebasestorage.googleapis.com/v0/b/lofrano-arts.appspot.com/o/images%2FStreet%20Car_1593286530167_thumb?alt=media&token=5c84bf49-f1f6-4263-b326-f30206a369fb",
      size: "large",
      id: 5,
      linkUrl: "/gallery/digital%20art",
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;

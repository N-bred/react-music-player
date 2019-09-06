const makeSchema = (id, name, artist, src, img) => {
   const schema = {
      id,
      src,
      name,
      artist,
      img
   };

   return schema;
};

export { makeSchema };

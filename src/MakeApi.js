const path = require('path');
const fs = require('fs');

const makeApi = async () => {
  fs.readdir(path.join(__dirname, 'Music'), (err, files) => {
    if (err) return err;

    const schemas = files.map((file, id) => {
      const splitted = file.split('-');

      const schema = {
        id,
        src: file,
        name: splitted[1].trim().replace('.mp3', ''),
        artist: splitted[0].trim()
      };

      return schema;
    });

    console.log(schemas);

    fs.writeFile(
      path.join(__dirname, 'Api', 'api.js'),
      `export default ${JSON.stringify(schemas)}`,
      { flag: 'w' },
      err => {
        if (err) return err;
        console.log('Saved');
      }
    );
  });
};

makeApi();

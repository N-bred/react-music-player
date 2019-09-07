const path = require('path');
const fs = require('fs');
const publicMusicRoute =
  process.env.NODE_ENV === 'production'
    ? '/react-music-player/Music/'
    : '/Music/';
const publicImgRoute =
  process.env.NODE_ENV === 'production' ? '/react-music-player/img/' : '/img/';

const makeApi = async () => {
  fs.readdir(path.join(__dirname, 'public', 'Music'), (err, files) => {
    if (err) return err;

    fs.readdir(path.join(__dirname, 'public', 'img'), (err2, covers) => {
      if (err2) return err2;

      console.log(covers);

      const coversFiltered = covers.filter(cover => cover !== 'img.map.js');

      const schemas = files.map((file, id) => {
        const splitted = file.split('-');
        const schema = {
          id,
          src: publicMusicRoute + file,
          name: splitted[1].trim().replace('.mp3', ''),
          artist: splitted[0].trim(),
          img:
            publicImgRoute +
            coversFiltered.find(
              cover =>
                cover.replace('.jpg', '') ===
                splitted[1].trim().replace('.mp3', '')
            )
        };

        return schema;
      });

      console.log(schemas);

      fs.writeFile(
        path.join(__dirname, 'src', 'Api', 'api.js'),
        `export default ${JSON.stringify(schemas)}`,
        { flag: 'w' },
        err => {
          if (err) return err;
          console.log('Saved');
        }
      );
    });
  });
};

makeApi();

import glob from 'glob';

/**
 * Big ol' hack to require all src/ files so that istanbul detects them and generates code coverage information
 * accurately.
 */
describe('code coverage hack', () => {
  const requireDem = (path, done) => {
    glob(path, {}, (err, files) => {
      if (err) {
        console.error(err);
        done();
      }

      files.forEach((file, index) => {
        // removes the './src/' from the beginning of the string
        const trimmed = file.substring(6);

        try {
          require(trimmed);
        } catch (e) {
          console.error(`Error trying to require ${trimmed}, ${e}`);
        }

        if (files.length - 1 === index) {
          done();
        }
      });
    });
  };

  it('should require all /components', done => requireDem('./src/components/**/*.js*', done));
  it('should require all /pages', done => requireDem('./src/pages/**/*.js*', done));
  it('should require all /state', done => requireDem('./src/state/**/*.js*', done));
  it('should require all /util', done => requireDem('./src/util/**/*.js*', done));
});

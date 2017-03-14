
import path from 'path';
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs';
import pkg from '../package.json';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */

async function copy() {
  await makeDir('build');
  await Promise.all([
    writeFile('build/package.json', JSON.stringify({
      private: true,
      engines: pkg.engines,
      dependencies: pkg.dependencies,
      scripts: {
        start: 'node server.js',
      },
    }, null, 2)),
    copyDir('public', 'build/public'),
  ]);
}

export default copy;

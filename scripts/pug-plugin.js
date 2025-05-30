/****************************************************
 * File: pug-plugin.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 *****************************************************/
import {compileFile} from 'pug';
import {join} from 'path';

export default function pugPlugin({index, options, data} = {}) {
  let alias = null;

  return {
    name: 'vite-pug-plugin',
    configResolved(resolvedConfig) {
      alias = resolvedConfig.resolve.alias.reduce(
        (accu, {find, replacement}) => (typeof find !== 'string' ? accu : ({
          ...accu, [find]: replacement
        })),
        {}
      );
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!/^\/(?:index\.html)?$/.test(req.url)) return next();

          res.end(
            await server.transformIndexHtml?.(
              req.url,
              compilePugFile(index),
              req.originalUrl
            )
          );
        });
      };
    },
    resolveId(id) {
      return id;
    },
    load(id) {
      return id === join(process.cwd(), 'index.html')
        ? compilePugFile(index)
        : null;
    }
  };

  function compilePugFile(pugFile) {
    const root = alias[pugFile.charAt(0)];
    if (root) pugFile = join(root, pugFile.slice(1));
    return compileFile(pugFile, options)(data);
  }
}
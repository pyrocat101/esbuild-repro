import esbuild from 'esbuild';

const resolvePlugin = {
  name: 'resolve-plugin',
  setup(build) {
    build.onResolve({ filter: /./ }, async ({path, ...options}) => {
      // Prevent recursion
      if (options.pluginData?.pluginApplied) {
        return;
      } else {
        options.pluginData = {pluginApplied: true};
      }

      // Use built-in resolver to resolve the path
      const result = await build.resolve(path, options);
      // Example post processing of the result.
      console.log(result.path);

      return result;
    })
  }
}

await esbuild.build({
  entryPoints: ['index.mjs'],
  bundle: true,
  write: false,
  plugins: [resolvePlugin],
})

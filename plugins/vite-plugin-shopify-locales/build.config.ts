import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    './src/index',
    {
      builder: 'mkdist',
      input: './src/generated',
      outDir: './dist/generated',
    },
  ],
  rollup: {
    emitCJS: true,
  },
  outDir: './dist',
  declaration: 'compatible',
  failOnWarn: false,
});

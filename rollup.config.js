import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/main.ts',
  output: {
    file: 'output/main.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript()
  ]
};
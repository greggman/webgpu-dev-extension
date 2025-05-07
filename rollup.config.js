import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import fs from 'node:fs';
import path from 'node:path';

// changes a filename's extension
function setExtensionTo(p, newExt) {
    const ext = path.extname(p);
    return `${p.substring(0, p.length - ext.length)}${newExt}`;
}

const banner = '// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!';

const plugins = [
    nodeResolve(),
    typescript({ tsconfig: './tsconfig.json' }),
];
const shared = {
    watch: {
        clearScreen: false,
    },
};

const targets = [
    {
        input: `src/popup/popup.js`,
        output: [
            {
                file: `extension/popup.js`,
                format: 'esm',
                sourcemap: true,
                freeze: false,
                banner,
            },
        ],
        plugins,
        ...shared,
    },
];

targets.push(...fs.readdirSync('src/scripts')
    .filter(filename => /\.(js|ts)$/.test(filename))
    .map(filename => {
        return {
            input: `src/scripts/${filename}`,
            output: [
                {
                    file: `extension/scripts/${setExtensionTo(filename, '.js')}`,
                    format: 'iife',
                    sourcemap: true,
                    freeze: false,
                    banner,
                },
            ],
            plugins,
            ...shared,
        };
    }));

export default targets;
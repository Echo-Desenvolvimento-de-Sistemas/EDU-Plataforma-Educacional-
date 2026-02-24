const fs = require('fs');
const path = require('path');

const walk = function (dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

const replacements = {
    'bg-blue-600': 'bg-primary',
    'bg-indigo-600': 'bg-primary',
    'hover:bg-blue-700': 'hover:bg-primary/90',
    'hover:bg-indigo-700': 'hover:bg-primary/90',
    'text-blue-600': 'text-primary',
    'text-indigo-600': 'text-primary',
    'text-blue-700': 'text-primary/90',
    'text-indigo-700': 'text-primary/90',
    'text-blue-800': 'text-primary',
    'text-indigo-800': 'text-primary',
    'hover:text-blue-800': 'hover:text-primary/80',
    'hover:text-indigo-800': 'hover:text-primary/80',
    'border-blue-600': 'border-primary',
    'border-indigo-600': 'border-primary',
    'border-blue-500': 'border-primary/80',
    'border-indigo-500': 'border-primary/80',
    'ring-blue-500': 'ring-primary',
    'ring-indigo-500': 'ring-primary',
    'focus:ring-blue-500': 'focus:ring-primary',
    'focus:ring-indigo-500': 'focus:ring-primary',
    'focus:border-blue-500': 'focus:border-primary',
    'focus:border-indigo-500': 'focus:border-primary',
    'bg-blue-50': 'bg-primary/10',
    'bg-indigo-50': 'bg-primary/10',
    'bg-blue-100': 'bg-primary/20',
    'bg-indigo-100': 'bg-primary/20',
    'shadow-blue-200': 'shadow-primary/20',
    'shadow-indigo-200': 'shadow-primary/20',
    'shadow-blue-300': 'shadow-primary/30',
    'shadow-indigo-300': 'shadow-primary/30',
    'text-blue-400': 'text-primary/80',
    'text-indigo-400': 'text-primary/80',
    'text-blue-300': 'text-primary/70',
    'text-indigo-300': 'text-primary/70',
    'text-blue-500': 'text-primary/80',
    'text-indigo-500': 'text-primary/80',
    'text-blue-900': 'text-primary',
    'text-indigo-900': 'text-primary',
    'border-blue-300': 'border-primary/40',
    'border-indigo-300': 'border-primary/40',
    'border-blue-100': 'border-primary/20',
    'border-indigo-100': 'border-primary/20',
    'hover:bg-blue-100': 'hover:bg-primary/20',
    'hover:bg-indigo-100': 'hover:bg-primary/20',
    'hover:border-blue-300': 'hover:border-primary/40',
    'hover:border-indigo-300': 'hover:border-primary/40',
    'dark:text-blue-400': 'dark:text-primary/80',
    'dark:text-indigo-400': 'dark:text-primary/80',
    'dark:text-blue-300': 'dark:text-primary/70',
    'dark:text-indigo-300': 'dark:text-primary/70',
    'dark:bg-blue-900/50': 'dark:bg-primary/30',
    'dark:bg-indigo-900/50': 'dark:bg-primary/30',
    'dark:bg-blue-900/30': 'dark:bg-primary/20',
    'dark:bg-indigo-900/30': 'dark:bg-primary/20',
    'dark:hover:bg-blue-900/50': 'dark:hover:bg-primary/30',
    'dark:hover:bg-indigo-900/50': 'dark:hover:bg-primary/30',
    'dark:border-blue-800': 'dark:border-primary/30',
    'dark:border-indigo-800': 'dark:border-primary/30',
    'bg-blue-900/20': 'bg-primary/20',
    'bg-indigo-900/20': 'bg-primary/20',
    'from-blue-50': 'from-primary/10',
    'from-indigo-50': 'from-primary/10',
    'to-blue-100': 'to-primary/20',
    'to-indigo-100': 'to-primary/20',
    'hover:text-blue-600': 'hover:text-primary',
    'hover:text-indigo-600': 'hover:text-primary',
};

const targetDirs = [
    path.resolve(__dirname, 'resources/js/Pages/Professor'),
    path.resolve(__dirname, 'resources/js/components/Activity')
];

let filesProcessed = 0;
let filesModified = 0;

targetDirs.forEach(dir => {
    walk(dir, function (err, results) {
        if (err) throw err;

        results.forEach(file => {
            if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;

            filesProcessed++;
            let content = fs.readFileSync(file, 'utf8');
            let originalContent = content;

            // Sort keys by length descending to prevent partial replacements
            // e.g. hover:bg-blue-700 should be replaced before bg-blue-700
            const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);

            for (const key of keys) {
                const value = replacements[key];
                // Using split/join is safe here because tailwind classes are unique substrings
                content = content.split(key).join(value);
            }

            if (content !== originalContent) {
                fs.writeFileSync(file, content, 'utf8');
                filesModified++;
                console.log(`Modified: ${file}`);
            }
        });

        console.log(`Finished processing ${dir}. Total files modified overall: ${filesModified}`);
    });
});

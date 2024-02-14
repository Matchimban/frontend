const path = require('path');

const buildEslintAndPrettierCommand = filenames => [
	`npx next lint --fix --file ${filenames
		.map(f => path.relative(process.cwd(), f))
		.join(' --file ')}`,
	`npx prettier --write ${filenames
		.map(f => path.relative(process.cwd(), f))
		.join(' ')}`,
	'git add .',
];

module.exports = {
	'*.{js,jsx,ts,tsx}': [buildEslintAndPrettierCommand],
};

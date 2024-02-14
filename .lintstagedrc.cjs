const path = require('path');

const buildEslintCommand = filenames =>
	`next lint --fix --file ${filenames
		.map(f => path.relative(process.cwd(), f))
		.join(' --file ')}`;

const prettierCommand = filenames =>
	`prettier --write --file ${filenames
		.map(f => path.relative(process.cwd(), f))
		.join(' --file ')}`;

const buildEslintAndPrettierCommand = filenames => [
	`next lint --fix --file ${filenames
		.map(f => path.relative(process.cwd(), f))
		.join(' --file ')}`,
	`prettier --write ${filenames
		.map(f => path.relative(process.cwd(), f))
		.join(' ')}`,
];

module.exports = {
	'*.{js,jsx,ts,tsx}': [buildEslintAndPrettierCommand],
};

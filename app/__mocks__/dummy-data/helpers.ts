import { promises } from 'fs';
import path from 'path';

import { JsonDataType, filenames } from '@/app/__mocks__/dummy-data/types.ts';

// const json_filepath = path.join(__dirname, 'json');
const json_filepath = path.join(
	process.cwd(),
	'app/__mocks__/dummy-data',
	'json',
);

export const getJSON = async <DataType extends JsonDataType>(
	filename: filenames,
): Promise<DataType[]> => {
	const filepath = path.join(json_filepath, filename);
	const data = await promises.readFile(filepath);

	return JSON.parse(data.toString());
};

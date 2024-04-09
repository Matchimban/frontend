import { promises } from 'fs';
import path from 'path';

import { Filenames } from '@/mocks/dummy-data/constants.ts';
import { JsonDataType } from '@/mocks/dummy-data/types.ts';

// const json_filepath = path.join(__dirname, 'json');
const json_filepath = path.join(process.cwd(), 'mocks/dummy-data', 'json');

export const getJSON = async <DataType extends JsonDataType>(
	filename: Filenames,
): Promise<DataType> => {
	const filepath = path.join(json_filepath, filename);
	const data = await promises.readFile(filepath);

	return JSON.parse(data.toString());
};

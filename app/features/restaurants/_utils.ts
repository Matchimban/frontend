import Compressor from 'compressorjs';

import { FileType } from '@/app/features/restaurants/_types.ts';

export const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});

export const compressImage = (
	image: File | Blob,
	options?: Compressor.Options,
) =>
	new Promise((resolve, reject) => {
		new Compressor(image, {
			...options,
			success(result) {
				resolve(result);
			},
			error(error) {
				reject(error);
			},
		});
	});

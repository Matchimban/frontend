import Compressor from 'compressorjs';

import type { FileType } from '@/app/features/restaurant/_types.ts';

export const getBase64 = (file: FileType | File): Promise<string> =>
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

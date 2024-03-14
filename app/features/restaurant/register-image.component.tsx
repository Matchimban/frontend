'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';

import type { FileType } from '@/app/features/restaurant/_types';
import { getBase64 } from '@/app/features/restaurant/_utils';

export default function RegisterImages() {
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');

	const form = Form.useFormInstance(); // 현재 form 컨텍스트의 instance를 가져옴

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
		);
	};

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		// https://stackoverflow.com/questions/54845951/react-antdesign-add-uploaded-images-to-formdata
		// this is equivalent to your "const img = event.target.files[0]"
		// here, antd is giving you an array of files, just like event.target.files
		// but the structure is a bit different that the original file
		// the original file is located at the `originFileObj` key of each of this files
		// so `event.target.files[0]` is actually fileList[0].originFileObj
		// you store them in state, so that you can make a http req with them later

		// console.log('handleChange: ', newFileList, 'file: ', file);

		// new Compressor(newFileList[newFileList.length - 1].originFileObj!, {
		// 	quality: 0.4,

		// 	success(file) {
		// 		console.log('compress successed!: ', file);
		// 		setCompressedFile(prevFiles => [...prevFiles, file]);

		// 		form.setFieldsValue({
		// 			// images: newFileList.map(file => file.originFileObj),
		// 			images: [...compressedFile, file],
		// 		});
		// 	},
		// 	error(error) {
		// 		console.error('Image Compressing Error: ', error.message);
		// 	},
		// });

		form.setFieldValue(
			'images',
			newFileList.map(file => file.originFileObj),
		);
		setFileList(newFileList);
	};

	return (
		<>
			<Upload
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				beforeUpload={() => {
					// Antd's Upload component is doing the upload files under the hood.
					// This function will be executed before upload.
					// If false returned, uploading will be stopped.
					return false;
				}}
			>
				{fileList.length <= 2 && <UploadButton />}
			</Upload>

			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img alt="preview-image" src={previewImage} className="w-full" />
			</Modal>
		</>
	);
}

function UploadButton() {
	return (
		<button className="border-0 bg-none" type="button">
			<PlusOutlined />
			{/* <div className="mt-1">Upload</div> */}
		</button>
	);
}

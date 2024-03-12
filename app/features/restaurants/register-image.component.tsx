'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import Compressor from 'compressorjs';
import { useState } from 'react';

import { FileType } from '@/app/features/restaurants/_types.ts';
import { getBase64 } from '@/app/features/restaurants/_utils.ts';

export default function RegisterImages() {
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [compressedFile, setCompressedFile] = useState<Array<File | Blob>>([]);

	const form = Form.useFormInstance(); // 현재 form 컨텍스트의 instance를 가져옴

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		console.log('handlePreview: ', file);

		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
		);

		console.log('handlePreview2: ', file);
	};

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		// https://stackoverflow.com/questions/54845951/react-antdesign-add-uploaded-images-to-formdata
		// this is equivalent to your "const img = event.target.files[0]"
		// here, antd is giving you an array of files, just like event.target.files
		// but the structure is a bit different that the original file
		// the original file is located at the `originFileObj` key of each of this files
		// so `event.target.files[0]` is actually fileList[0].originFileObj
		console.log('handleChange: ', newFileList);

		// you store them in state, so that you can make a http req with them later

		new Compressor(newFileList[newFileList.length - 1].originFileObj!, {
			quality: 0.6,

			success(file) {
				console.log('compress successed!: ', file);
				setCompressedFile(prev => [...prev, file]);

				form.setFieldsValue({
					// images: newFileList.map(file => file.originFileObj),
					images: [...compressedFile, file],
				});
			},
			error(error) {
				console.error('Image Compress Error: ', error.message);
			},
		});

		setFileList(newFileList);
	};

	return (
		<>
			<Upload
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				beforeUpload={(file: RcFile, fileList: RcFile[]) => {
					console.log('beforeUpload: ', file, 'list: ', fileList);
					return false;
				}}
			>
				<UploadButton />
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

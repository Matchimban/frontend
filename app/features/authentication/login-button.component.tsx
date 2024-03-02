'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AuthForm = dynamic(
	() => import('@/app/features/authentication/auth-form.component.tsx'),
	{
		ssr: false,
		loading: () => (
			<div className="m-10 flex items-center justify-center">
				<Spin indicator={<LoadingOutlined />} spinning />
			</div>
		),
	},
);

export default function LoginButton() {
	const [isSinginModalOpen, setIsSinginModalOpen] = useState(false);

	const showModal = () => {
		setIsSinginModalOpen(true);
	};

	const closeModal = () => {
		setIsSinginModalOpen(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				로그인
			</Button>
			{isSinginModalOpen && (
				<Modal
					open={isSinginModalOpen}
					onCancel={closeModal}
					width={400}
					footer={[]}>
					<AuthForm />
				</Modal>
			)}
		</>
	);
}

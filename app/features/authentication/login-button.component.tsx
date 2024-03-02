'use client';

import { Button, Modal } from 'antd';
import { useState } from 'react';

import AuthForm from '@/app/features/authentication/auth-form.component.tsx';

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
					footer={[]}
				>
					<AuthForm />
				</Modal>
			)}
		</>
	);
}

import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';

import RecoilProvider from '@/app/(routes)/recoil-provider.tsx';

import './globals.css';

export const metadata: Metadata = {
	title: 'Matchimban',
	description: 'Matchimban project',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<RecoilProvider>
					<AntdRegistry>{children}</AntdRegistry>
				</RecoilProvider>
			</body>
		</html>
	);
}

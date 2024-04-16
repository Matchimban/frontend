import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Metadata } from 'next';

import NextAuthProvider from '@/app/(routes)/nextauth-provider.tsx';
import RecoilProvider from '@/app/(routes)/recoil-provider.tsx';

import './globals.css';

export const metadata: Metadata = {
	title: {
		default: '맛침반 | 나만의 맛집을 찾아주는 나침반',
		template: '%s | 맛침반',
	},
	description:
		'맛침반을 통해 오늘 하루 여러분과 사랑하는 사람에게 맛있는 식사 한 끼를 제공해보세요.\n 주변 음식점을 검색한 후 맛침반에서 제공하는 상세한 정보를 바탕으로 원하는 음식점을 찾아보세요.\n 예약 현황을 실시간으로 확인하고 클릭 한 번으로 쉽게 예약해보세요.\n 맛침반을 통해 나만의 새로운 맛집을 발견하고, 편리하게 식사 계획을 세울 수 있습니다.\n 맛침반은 여러분의 식사 시간을 더 즐겁고 특별하게 만들어 드릴 준비가 되어 있습니다. 지금 바로 맛침반에서 오늘의 맛있는 식사를 찾아보세요!',
	keywords: [
		'food',
		'search',
		'reservation',
		'맛집',
		'음식점',
		'검색',
		'맛집 찾기',
		'맛집 검색',
		'맛집 예약',
	],
	metadataBase: new URL('https://matchimban.vercel.app'),
	openGraph: {
		title: '맛침반 - 나만의 맛집을 찾아주는 나침반',
		description:
			'맛침반을 통해 나만의 새로운 맛집을 발견하고, 사랑하는 사람에게 맛있는 식사 한 끼를 제공해보세요.',
		url: '/',
		siteName: 'Matchimban',
		type: 'website',
		locale: 'ko_KR',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<NextAuthProvider>
					<RecoilProvider>
						<AntdRegistry>{children}</AntdRegistry>
					</RecoilProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}

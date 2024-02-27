import { useEffect, useState } from 'react';

// 스크롤에 따라 네비게이션 바 혹은 헤더 translate 적용.
// 렌더링이 매끄럽지 않음...
export default function useBarScrolling() {
	const [currentScrollY, setCurrentScrollY] = useState(0);
	const [height, setHeight] = useState(0);

	const handleScrollY = () => {
		const change = +window.scrollY.toFixed() - currentScrollY;

		if (change > 0 && height > 45) return;
		if (change < 0 && height < 0) return;

		setCurrentScrollY(+window.scrollY.toFixed());
		setHeight(prev => {
			const next = prev + change;

			if (next > 45) return 45;
			if (next < 0) return 0;

			return next;
		});
	};

	useEffect(() => {
		// 현재 스크롤 위치 기억
		setCurrentScrollY(+window.scrollY.toFixed());
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScrollY);

		return () => window.removeEventListener('scroll', handleScrollY);
	}, [currentScrollY, height]);

	return height;
}

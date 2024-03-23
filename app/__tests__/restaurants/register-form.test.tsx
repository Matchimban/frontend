import { render, screen } from '@testing-library/react';

import RegisterForm from '@/app/features/restaurant/register-form.component';

describe('매장 등록 폼 테스트', () => {
	vi.mock('next/navigation', () => {
		const actual = vi.importActual('next/navigation');
		return {
			...actual,
			useRouter: vi.fn(() => ({
				push: vi.fn(),
			})),
			useSearchParams: vi.fn(() => ({
				get: vi.fn(),
			})),
			usePathname: vi.fn(),
		};
	});

	test('상호명, 전화번호, 사업자번호, 주소, 카테고리, 영업시간, 휴일, 소개, 안내사항, 사진 input & 등록하기 버튼 렌더링', async () => {
		const fn = vi.fn();
		render(<RegisterForm onSubmit={fn} />);

		expect(screen.getByLabelText('상호명')).toBeInTheDocument();
		expect(screen.getByLabelText('전화 번호')).toBeInTheDocument();
		expect(screen.getByLabelText('사업자 번호')).toBeInTheDocument();
		expect(screen.getByLabelText('주소')).toBeInTheDocument();
		expect(screen.getByLabelText('분류')).toBeInTheDocument();
		expect(screen.getByLabelText('영업 시간')).toBeInTheDocument();
		expect(screen.getByLabelText('휴일')).toBeInTheDocument();
		expect(screen.getByLabelText('소개')).toBeInTheDocument();
		expect(screen.getByLabelText('안내 사항')).toBeInTheDocument();

		expect(screen.getByText('사진')).toBeInTheDocument(); // input이 없어서 form control에 포함되지 않아서 label role로 인식하지 않음.

		// 등록하기 버튼
		expect(
			screen.getByRole('button', {
				name: '등록하기',
			}),
		).toBeInTheDocument();
	});
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SignInForm from '@/app/features/authentication/signin-form.component.tsx';
import SignUpForm from '@/app/features/authentication/signup-form.component.tsx';

describe('로그인 폼 테스트', () => {
	test('render', () => {
		const fn1 = vi.fn();
		const fn2 = vi.fn();

		render(<SignUpForm onModeChange={fn1} onSubmit={fn2} />);

		expect(
			screen.getByRole('button', { name: '회원가입' }),
		).toBeInTheDocument();

		screen.debug();
	});
});

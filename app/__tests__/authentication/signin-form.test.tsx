import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignInForm from '@/app/features/authentication/signin-form.component.tsx';

describe('로그인 폼 테스트', () => {
	const user = userEvent.setup();
	const fn1 = vi.fn();
	const fn2 = vi.fn();

	test('email & password input 및 로그인 버튼 렌더링', () => {
		render(<SignInForm onModeChange={fn1} onSubmit={fn2} />);

		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
	});

	test('email 유효성 검사', async () => {
		render(<SignInForm onModeChange={fn1} onSubmit={fn2} />);

		const emailInputEl = screen.getByPlaceholderText(/email/i);
		const loginButtonEl = screen.getByRole('button', { name: '로그인' });

		// email required check
		await user.click(loginButtonEl);
		expect(
			screen.getByText('이메일을 입력해주세요', { exact: false }),
		).toBeInTheDocument();

		// email type check
		await user.type(emailInputEl, 'test');
		await user.click(loginButtonEl);
		expect(
			screen.getByText('올바른 이메일 형식이 아닙니다', { exact: false }),
		).toBeInTheDocument();
	});
	test('password 유효성 검사', async () => {
		render(<SignInForm onModeChange={fn1} onSubmit={fn2} />);

		const passwordInputEl = screen.getByPlaceholderText(/password/i);
		const loginButtonEl = screen.getByRole('button', { name: '로그인' });

		// password required check
		await user.click(loginButtonEl);
		expect(
			screen.getByText('비밀번호를 입력해주세요', { exact: false }),
		).toBeInTheDocument();

		// password min-length check
		await user.type(passwordInputEl, '1');
		await user.click(loginButtonEl);
		expect(
			screen.getByText('4자리 이상 입력해주세요', { exact: false }),
		).toBeInTheDocument();
	});
});

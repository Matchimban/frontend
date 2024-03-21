import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignUpForm from '@/app/features/authentication/signup-form.component.tsx';

describe('회원가입 폼 테스트', () => {
	const user = userEvent.setup();
	const fn1 = vi.fn();
	const fn2 = vi.fn();

	test('name, nick name, email, password input 및 회원가입 버튼 렌더링', () => {
		render(<SignUpForm onModeChange={fn1} onSubmit={fn2} />);

		expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/nick name/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: '회원가입' }),
		).toBeInTheDocument();
	});

	test('name 유효성 검사', async () => {
		render(<SignUpForm onModeChange={fn1} onSubmit={fn2} />);
		// const nameInputEl = screen.getByPlaceholderText(/name/i);
		const loginButtonEl = screen.getByRole('button', { name: '회원가입' });

		await user.click(loginButtonEl);
		expect(
			screen.getByText('이름을 입력해주세요', { exact: false }),
		).toBeInTheDocument();
	});

	test('nick name 유효성검사', async () => {
		render(<SignUpForm onModeChange={fn1} onSubmit={fn2} />);
		// const nickNameInputEl = screen.getByPlaceholderText(/nick/i);
		const loginButtonEl = screen.getByRole('button', { name: '회원가입' });

		await user.click(loginButtonEl);
		expect(
			screen.getByText('닉네임을 입력해주세요', { exact: false }),
		).toBeInTheDocument();
	});

	test('email 유효성 검사', async () => {
		render(<SignUpForm onModeChange={fn1} onSubmit={fn2} />);
		// const emailInputEl = screen.getByPlaceholderText(/email/i);
		const loginButtonEl = screen.getByRole('button', { name: '회원가입' });

		await user.click(loginButtonEl);
		expect(
			screen.getByText('이메일을 입력해주세요', { exact: false }),
		).toBeInTheDocument();
	});

	test('password 유효성 검사', async () => {
		render(<SignUpForm onModeChange={fn1} onSubmit={fn2} />);
		// const passwordInputEl = screen.getByPlaceholderText(/password/i);
		const loginButtonEl = screen.getByRole('button', { name: '회원가입' });

		await user.click(loginButtonEl);
		expect(
			screen.getByText('비밀번호를 입력해주세요', { exact: false }),
		).toBeInTheDocument();
	});
});

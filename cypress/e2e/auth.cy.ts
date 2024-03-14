describe('로그인/회원가입 테스트', () => {
	it('로그인/회원가입 모달', () => {
		cy.visit('/');

		// 로그인 창
		cy.findByRole('button', { name: '로그인' }).click();
		cy.findByRole('heading', { name: '로그인' }).should('exist');

		// 회원가입 창
		cy.findByText('회원가입하기').click();
		cy.findByRole('heading', { name: '회원가입' }).should('exist');
	});
});

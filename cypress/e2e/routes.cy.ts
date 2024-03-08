it('displays correct heading when navigating to shows route', () => {
	cy.visit('/');
	cy.findByRole('button', { name: '로그인' }).click();
	cy.findByRole('heading', { name: '로그인' }).should('exist');
});

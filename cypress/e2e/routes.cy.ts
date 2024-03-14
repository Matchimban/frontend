describe('메인 화면 테스트', () => {
	it('logo', () => {
		cy.visit('/');
		cy.findByText('logo').should('exist');
	});
});

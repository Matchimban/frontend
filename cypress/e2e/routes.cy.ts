describe('메인 화면 테스트', () => {
	// 맛침반 텍스트 테스트 오류 해결하기

	it('전체보기 텍스트 렌더링', () => {
		cy.visit('/');
		cy.findByText('전체 보기').should('exist');
	});

	it.skip('테스트 매장 렌더링', () => {
		const name = 'restaurant_test';
		const category = ['KOREA', '한식'];
		const address = 'address_test';

		cy.intercept('GET', Cypress.env('apiUrl') + '/api' + '/restaurants', {
			statusCode: 200,

			body: JSON.stringify({
				code: 20000,
				msg: null,
				result: [
					{
						id: 0,
						name,
						category: category[0],
						addrSido: address,
						imageUrl: '',
					},
				],
			}),
		});

		cy.visit('/');

		cy.findByRole('heading', { name }).should('exist');
		cy.findByText(category[1]).should('exist');
		cy.findByText(address).should('exist');
	});
});

describe('메인 화면 테스트', () => {
	// 맛침반 텍스트 테스트 오류

	it('전체보기 텍스트 렌더링', () => {
		cy.visit('/');
		cy.findByText('전체 보기').should('exist');
	});
});

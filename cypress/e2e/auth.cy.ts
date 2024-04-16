describe('인증 및 인가 테스트', () => {
	it('로그인/회원가입 모달 렌더링 및 로그인', () => {
		cy.visit('/');

		// 로그인 창
		cy.findByRole('button', { name: '로그인' }).click();
		cy.findByRole('heading', { name: '로그인' }).should('exist');

		// 회원가입 창
		cy.findByText('회원가입하기').click();
		cy.findByRole('heading', { name: '회원가입' }).should('exist');

		// 로그인 폼 작성
		cy.findByText('로그인하기').click();
		cy.findByPlaceholderText(/email/i).clear();
		cy.findByPlaceholderText(/email/i).type(Cypress.env('USER_EMAIL'));

		cy.findByPlaceholderText(/password/i).clear();
		cy.findByPlaceholderText(/password/i).type(Cypress.env('USER_PASSWORD'));

		// 로그인 폼 제출
		cy.findByRole('dialog').within(() => {
			cy.findByRole('button', { name: '로그인' }).click();
		});

		// 로그인 버튼 대신 유저 이름 표시
		cy.findByRole('button', { name: Cypress.env('USER_NAME') }).should('exist');
		cy.findByRole('button', { name: '로그인' }).should('not.exist');

		// 유저 버튼 클릭시 로그아웃, 매장등록 표시
		cy.findByRole('button', { name: Cypress.env('USER_NAME') }).click();
		cy.findByText('로그아웃').should('exist');
		cy.findByText('매장등록').should('exist');
	});

	// 로그인 실패시 에러 메시지

	it('매장 등록 페이지 인가 처리', () => {
		// 미로그인 상태에서 /restaurant/register 페이지 접근 시 /로 리다이렉트
		cy.visit('/restaurant/register');
		cy.findByText('전체 보기').should('exist');
		cy.findByRole('heading', { name: '매장 등록' }).should('not.exist');

		// 로그인
		const email = Cypress.env('USER_EMAIL');
		const password = Cypress.env('USER_PASSWORD');
		cy.signIn(email, password);

		// 로그인 상태에서 /restaurant/register 페이지 접근 시 register 페이지 렌더링
		cy.findByRole('button', { name: Cypress.env('USER_NAME') }).click();
		cy.findByText('매장등록').click();
		cy.findByText('전체 보기').should('not.exist');
		cy.findByRole('heading', { name: '매장 등록' }).should('exist');
	});

	it('매장 수정 페이지 인가 처리', () => {
		// 미로그인 상태에서 /restaurant/edit?id=14 페이지 접근 시 /로 리다이렉트
		// >>> 나중에 db 설정과 함께 테스트 전용 매장 페이지 만들 것 <<<
		cy.visit('/restaurant/edit?id=14');
		cy.findByText('전체 보기').should('exist');
		cy.findByRole('heading', { name: '매장 수정' }).should('not.exist');

		// 로그인
		const email = Cypress.env('USER_EMAIL');
		const password = Cypress.env('USER_PASSWORD');
		cy.signIn(email, password);

		// 로그인 상태에서 /restaurant/edit?id=14 페이지 접근 시 매장 수정 페이지 렌더링
		cy.visit('/restaurant/edit?id=14');
		cy.findByText('전체 보기').should('not.exist');
		cy.findByRole('heading', { name: '매장 수정' }).should('exist');
	});

	it('메뉴 등록 페이지 인가 처리', () => {
		// 미로그인 상태에서 /restaurant/menu?id=14 페이지 접근 시 /로 리다이렉트
		// >>> 나중에 db 설정과 함께 테스트 전용 매장 페이지 만들 것 <<<
		cy.visit('/restaurant/menu?id=14');
		cy.findByText('전체 보기').should('exist');
		cy.findByRole('heading', { name: '메뉴 등록' }).should('not.exist');

		// 로그인
		const email = Cypress.env('USER_EMAIL');
		const password = Cypress.env('USER_PASSWORD');
		cy.signIn(email, password);

		// 로그인 상태에서 /restaurant/menu?id=14 페이지 접근 시 메뉴 등록 페이지 렌더링
		cy.visit('/restaurant/menu?id=14');
		cy.findByText('전체 보기').should('not.exist');
		cy.findByRole('heading', { name: '메뉴 등록' }).should('exist');
	});
});

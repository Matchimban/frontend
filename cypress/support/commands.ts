import '@testing-library/cypress/add-commands';

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add('signIn', (email, password) => {
	// 로그인 버튼 클릭
	cy.findByRole('button', { name: '로그인' }).click();

	// 로그인 폼 작성
	cy.findByPlaceholderText(/email/i).clear();
	cy.findByPlaceholderText(/email/i).type(email);

	cy.findByPlaceholderText(/password/i).clear();
	cy.findByPlaceholderText(/password/i).type(password);

	// 로그인 폼 제출
	cy.findByRole('dialog').within(() => {
		cy.findByRole('button', { name: '로그인' }).click();
	});

	// 로그인 확인 -> 로그인 버튼 대신 유저 이름 표시
	cy.findByRole('button', { name: Cypress.env('USER_NAME') }).should('exist');
});

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			signIn(email: string, password: string): Chainable<void>;
			// drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
			// dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
			// visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
		}
	}
}

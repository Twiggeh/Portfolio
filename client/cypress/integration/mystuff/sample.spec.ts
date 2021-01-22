describe('Routing', () => {
	it('Loads Home page', () => {
		cy.visit('/');
		cy.waitForReact(1001, '#root');
	});

	it('Loads Contact Page', () => {
		cy.visit('/contact');
		cy.waitForReact(1001, '#root');
		cy.react('Contact').should('exist');
	});

	it('Fills out Form', () => {
		cy.react('Input', { props: { name: 'email' } }).type('hello@twiggeh.com');

		cy.react('TextArea', { props: { name: 'message' } }).type(
			'This an automated test message'
		);

		cy.react('Option', { props: { txt: 'Please Select A Subject' } }).click();

		cy.react('Option').should('have.length.at.least', 4);

		cy.react('Option', { props: { txt: 'Paint me something !' } }).click();

		cy.react('Button', { props: { content: 'Send' } })
			.should('exist')
			.should('not.have.a.property', 'disabled');

		cy.react('Button', { props: { content: 'Send' } }).click();
	});
});

/// <reference types="cypress" />

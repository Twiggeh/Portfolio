/* eslint-disable cypress/no-unnecessary-waiting */
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
		cy.react('Input', { props: { name: 'email' } })
			.type('hello@twiggeh.com')
			.should('have.value', 'hello@twiggeh.com');

		cy.react('TextArea', { props: { name: 'message' } })
			.type('This an automated test message')
			.should('have.value', 'This an automated test message');

		cy.react('Option', { props: { txt: 'Please Select A Subject' } }).click();
		cy.react('Option', {}).should('have.length.at.least', 5);

		let visibleAmount = 0;
		let notVisibleAmount = 0;
		cy.react('Option', { props: { txt: 'Paint me something !' } }).click();

		cy.react('Option', {})
			.wait(2000)
			.each(el => {
				const isVisible = Number(el.css('opacity')) > 0;
				isVisible ? visibleAmount++ : notVisibleAmount++;
			})
			.then(() => {
				if (visibleAmount !== 1) throw 'Bad amount of visible elements';
				if (notVisibleAmount !== 4) throw 'Bad amount of not visible elements';
			});

		cy.react('Button', { props: { content: 'Send' } })
			.should('exist')
			.should('not.have.a.property', 'disabled');

		cy.react('Button', { props: { content: 'Send' } }).click();
	});
});

/// <reference types="cypress" />

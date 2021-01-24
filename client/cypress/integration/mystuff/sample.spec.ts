// safely handles circular references
const safeStringify = (obj: any, indent = 2) => {
	let cache: any = [];
	const retVal = JSON.stringify(
		obj,
		(key, value) =>
			typeof value === 'object' && value !== null
				? cache.includes(value)
					? undefined // Duplicate reference found, discard key
					: cache.push(value) && value // Store value in our collection
				: value,
		indent
	);
	cache = null;
	return retVal;
};

/* eslint-disable cypress/no-unnecessary-waiting */
describe('Routing', () => {
	it('Loads Home page', () => {
		cy.visit('/');
		cy.waitForReact(1001);

		cy.react('FeatureImg').each(image => {
			// cy.wrap(image).scrollIntoView().click();
			image.trigger('click');
			cy.react('ModalWrapper').should('exist');
			cy.react('ModalButton').should('exist').trigger('click');
		});
	});

	it('Loads Contact Page', () => {
		cy.visit('/contact');
		cy.waitForReact(1001);
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
		cy.react('Option').should('have.length.at.least', 5);

		let visibleAmount = 0;
		let notVisibleAmount = 0;
		cy.react('Option', { props: { txt: 'Paint me something !' } }).click();

		cy.react('Option')
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

	it('Loads Art page', () => {
		cy.visit('/art');
		cy.waitForReact(1001);
	});
});

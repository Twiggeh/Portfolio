import { Button } from '../../../src/static/Projects';

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

const ContentPages = ['art', 'projects', '/'] as const;

/* eslint-disable cypress/no-unnecessary-waiting */
describe('Routing', () => {
	before(() => {
		cy.visit('/');
		cy.waitForReact(1001);
	});

	it('Loads all content pages', () => {
		const loadsContentPage = (pages: typeof ContentPages) => {
			for (const page of pages) {
				cy.visit(page)
					.get('[class*="SideAndMainPage"]')
					.should('exist')
					.should('have.length.at.least', 1)
					.get('[class*="SideWrapper"]')
					.should('exist')
					.should('have.length.at.least', 1);
			}
		};
		loadsContentPage(ContentPages);
	});

	it('Loads Contact Page', () => {
		cy.visit('/contact');
		cy.waitForReact(1001);
		cy.react('Contact').should('exist');
	});
});

	it('Shows Modals for Buttons', () => {
		cy.visit('/');
		cy.waitForReact(1001);

		cy.getReact('MediumButtons')
			.should('exist')
			.each(node => {
				cy.wrap(node)
					.getProps('buttons')
					.then(buttonsProp => {
						for (
							let buttonIndex = 0;
							buttonIndex < buttonsProp.length;
							buttonIndex += 1
						) {
							const { btnName, modal, btnUrl }: Button = buttonsProp[buttonIndex];

							if (!modal) continue;

							cy.react('BtnListWrap', { props: { href: btnUrl } })
								.should('exist')
								.eq(0)
								.click()
								.then(() => {
									//cy.react('ModalWrapper').should('exist');
									cy.getReact('ModalButton').nthNode(0).should('exist').trigger('click');
								});
						}
					});
			});
	});
});

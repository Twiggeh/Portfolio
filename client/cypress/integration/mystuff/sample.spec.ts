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

describe('Content Page functionality', () => {
	before(() => cy.visit('/'));
	it('Shows Modals for Buttons', () => {
		cy.waitForReact(1001);

		cy.getReact('MediumButtons').each(BtnListWrap => {
			cy.wrap(BtnListWrap)
				.getProps('buttons')
				.each((btnProp: Button) => {
					if (btnProp.modal === undefined) return true;
					cy.react('BtnListWrap', { props: { href: btnProp.btnUrl } }).click();
					cy.get('[class*="content"]')
						.should('have.css', 'color', 'black')
						.get('[class*="ModalButton"]')
						.should('exist')
						.click();
				});
		});
	});

	it('PopUp Images load and work', () => {
		cy.get('[class*="FeatureImg"]').each(image => {
			cy.wrap(image)
				.trigger('click')
				.get('[class*="StyledDialog"]')
				.should('exist')
				.get('[class*="ModalButton"]')
				.should('exist')
				.trigger('click')
				.get('[class*="ModalWrapper"]')
				.should('not.exist');
		});
	});
});
			});
	});
});

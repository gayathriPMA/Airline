describe('SpiceJet Ticket Search', () => {
    const URL = 'https://www.spicejet.com/';
    const DELHI = 'DEL';
    const BENGALURU = 'BLR';
    const DEPARTURE_DATE = '2024-06-25';
    const RETURN_DATE = '2024-07-02';

    beforeEach(() => {
        cy.visit(URL);
        cy.wait(3000); 
    });

    it('should search for a ticket from DEL to BLR with specific dates', () => {
        /* Select Round Trip */
        cy.get('[data-testid="travel-type-2"]').click();

        /* Select From location */
        selectLocation('[data-testid="search-source-code"]', DELHI, 'Delhi, India');

        /* Select To location */
        selectLocation('[data-testid="search-destination-code"]', BENGALURU, 'BLR - Bengaluru, India');

        /* Select Departure Date */
        selectDate('[data-testid="search-renderDatesText"]', DEPARTURE_DATE, 'June', '25');

        /* Click outside to close the date picker if needed */
        cy.get('body').click(); 
        cy.wait(1000); 

        /* Select Return Date */
        selectDate('.r-1gvftzk', RETURN_DATE, 'July', '02');
        cy.wait(5000);

        /* Click Search Flights button */
        cy.get('[data-testid="search-submit-btn"]').click();

        /* Check redirect URL */
        cy.url().should('include', '/search');
        cy.url().should('include', `from=${DELHI}`);
        cy.url().should('include', `to=${BENGALURU}`);
        cy.url().should('include', 'tripType=2');
        cy.url().should('include', `departure=${DEPARTURE_DATE}`);
        cy.url().should('include', `return=${RETURN_DATE}`);

        cy.get('[data-testid="searchPage-listResults-listContent-SpiceSaver"] > .r-1awozwy').click();
        cy.wait(5000); 
    });

    function selectLocation(selector, code, optionText) {
        cy.get(selector).click();
        cy.get('[data-testid="auto-cmp-txt"]').clear().type(code);
        cy.contains(optionText).click();
    }

    function selectDate(selector, date, monthText, day) {
        cy.get(selector).eq(0).scrollIntoView().click(); 
    
        cy.contains(`[data-testid="undefined-month-${monthText}-2024"]`, day)
        .scrollIntoView()
          .should('be.visible') 
          .click({ force: true }); 
        cy.wait(500); 
    }
});

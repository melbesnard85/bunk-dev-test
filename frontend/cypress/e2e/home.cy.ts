describe('Home page', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('visits the page', () => {
  })

  it('has the correct title', () => {
    cy.title().should('equal', 'Holiday Expenses Calculator');
  });

  it('draw table', () => {
    cy.get('table').contains('th', 'Name');
    cy.get('table').contains('th', 'Expense');
  })

  it('settle up button click', () => {
    cy.get('button').contains('Settle Up').click()
  });

  it('display payout modal when click settle up button', () => {
    cy.get('button').contains('Settle Up').click()
    cy.get('app-payout-dialog h1').contains('Calculated Payouts')
    cy.get('app-payout-dialog h1').contains('Calculated Payouts')
  });

  it('reload home page', () => {
  });
  
})

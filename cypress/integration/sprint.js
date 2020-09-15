describe('sprint test', () => {
    it ('visits the form page', () => {
        cy.visit('http://localhost:3004/pizza');
    });
    it('can text  be added to name', () => {
        cy
        .get('input[name="name"]')
        .type("Mark Rogowsky")
        .should("have.value", "Mark Rogowsky")
       
    });
    it('can text  be added to instructions', () => {
        cy
        .get('#instructions')
        .type("add a taco")
        .should("have.value", "add a taco")
       
    });
    it('tries to pick an item from dropdown', () => {
        cy
        .get('#size')
        .select('12-inch')
        .should("have.value", "12-inch")
    })
    it('onions can be selected', () => {
        cy
        .get('#onions')
        .check()
        .should("be.checked");
    });
    it('pepperoni can be selected', () => {
        cy
        .get('#pepperoni')
        .check()
        .should("be.checked");
    });
    it('sausage can be selected', () => {
        cy
        .get('#sausage')
        .check()
        .should("be.checked");
    });
    it('salami can be selected', () => {
        cy
        .get('#salami')
        .check()
        .should("be.checked");
    });
    it('can be submitted', () => {
        cy
        .get('form')
        .submit();
    });


});
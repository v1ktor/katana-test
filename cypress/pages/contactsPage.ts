class ContactsPage {
    private readonly filter: string = "[aria-colindex='3'] > .ag-floating-filter-full-body"
    private readonly foundRows: string = "div.ag-row:visible"
    private readonly link: string = "a[data-testid='cellName']"

    public findByName(name: string): void {
        cy.get(this.filter).should("be.visible")
        cy.get(this.filter).clear().type(`${name}{enter}`)
        cy.intercept("https://customers.katanamrp.com/api/customers?filter=**").as("customersFilter")
        cy.wait("@customersFilter").then(() => {
            cy.get(this.foundRows).should("have.length", 1)
            cy.get(this.link).click()
        })
    }
}

export const contactsPage = new ContactsPage()
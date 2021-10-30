class Contacts {
    private readonly filter: string = "input.ag-floating-filter-input:visible"
    private readonly foundRows: string = "div.ag-row:visible"
    private readonly link: string = "a[data-testid='cellName']"

    public findByName(name: string): void {
        cy.get(this.filter).eq(0).type(`${name}{enter}`)
        cy.get(this.foundRows).should("have.length", 1)
        cy.get(this.link).click()
    }
}

export const contacts = new Contacts()
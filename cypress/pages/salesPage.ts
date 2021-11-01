export class SalesPage {
    private readonly filter: string = "input.ag-floating-filter-input:visible"
    private readonly foundRows: string = "div.ag-row:visible"
    private readonly link: string = "div[col-id='orderNo'] > div > a"

    public findByOrder(name: string): void {
        cy.get(this.filter).eq(0).clear().type(`${name}{enter}`)
        cy.intercept("https://sales.katanamrp.com/api/salesOrderOpenLists?filter=**").as("salesFilter")
        cy.wait("@salesFilter").then(interception => {
            cy.get(this.foundRows).should("have.length", 2)
            cy.get(this.link).contains(name).click()
        })

    }
}

export const salesPage = new SalesPage()
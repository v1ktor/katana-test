export class SalesPage {
    private readonly filter: string = "[aria-colindex='3'] > .ag-floating-filter-full-body > .ag-react-container > .ag-input-wrapper > .ag-floating-filter-input"
    private readonly foundRows: string = "div.ag-row:visible"
    private readonly link: string = "div[col-id='orderNo'] > div > a"

    public findByOrder(name: string): void {
        cy.get(this.filter).should("be.visible")
        cy.get(this.filter).clear().type(`${name}{enter}`)
        cy.intercept("https://sales.katanamrp.com/api/salesOrderOpenLists?filter=**").as("salesFilter")
        cy.wait("@salesFilter").then(() => {
            cy.get(this.foundRows).should("have.length", 2)
            cy.get(this.link).contains(name).click()
        })
    }

    public verifyOrderCannotBeFound(name: string): void {
        cy.get(this.filter).should("be.visible")
        cy.get(this.filter).clear().type(`${name}{enter}`)
        cy.intercept("https://sales.katanamrp.com/api/salesOrderOpenLists?filter=**").as("salesFilter")
        cy.wait("@salesFilter").then(() => {
            cy.get(this.foundRows).should("have.length", 1)
        })
    }
}

export const salesPage = new SalesPage()
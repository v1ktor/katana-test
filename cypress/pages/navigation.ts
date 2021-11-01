import {Pages} from "./pages";

class Navigation {
    private readonly buttonGlobalAdd: string = "#globalAdd"
    private readonly buttonAddCustomer: string = "#add-customer"
    private readonly buttonContacts: string = "#contactsTab"
    private readonly buttonAddSalesOrder: string = "#add-sales"
    private readonly buttonSalesOrders: string = "#salesLink"

    public buttonGlobalAddShouldBeVisible(): void {
        cy.get(this.buttonGlobalAdd).should("be.visible")
    }

    public navigateTo(page: Pages) {
        switch (page) {
            case Pages.NEW_CUSTOMER:
                cy.get(this.buttonGlobalAdd).click()
                cy.get(this.buttonAddCustomer).click()
                break
            case Pages.ALL_CONTACTS:
                cy.get(this.buttonContacts).click()
                break
            case Pages.NEW_SALES_ORDER: {
                cy.get(this.buttonGlobalAdd).click()
                cy.get(this.buttonAddSalesOrder).click()
                break
            }
            case Pages.SALES: {
                cy.get(this.buttonSalesOrders).click()
                break
            }
        }
    }
}

export const navigation = new Navigation()
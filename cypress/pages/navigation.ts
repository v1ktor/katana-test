import {Pages} from "./pages";

class Navigation {
    private readonly buttonGlobalAdd: string = "#globalAdd"
    private readonly buttonCustomer: string = "#add-customer"
    private readonly buttonContacts: string = "#contactsTab"

    public buttonGlobalAddShouldBeVisible(): void {
        cy.get(this.buttonGlobalAdd).should("be.visible")
    }

    public navigateTo(page: Pages) {
        switch (page) {
            case Pages.NEW_CUSTOMER:
                cy.get(this.buttonGlobalAdd).click()
                cy.get(this.buttonCustomer).click()
                break
            case Pages.ALL_CONTACTS:
                cy.get(this.buttonContacts).click()
                break
        }
    }
}

export const navigation = new Navigation()
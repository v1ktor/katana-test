import {ICustomer} from "../fixtures/ICustomer";
import {IItem} from "../fixtures/IItem";
import {ISalesOrder} from "../fixtures/ISalesOrder";
import {IAddress} from "../fixtures/IAddress";

export class SalesOrderPage {
    private readonly inputField: string = "input.MuiInputBase-input"
    private readonly inputItem: string = "div[col-id='item']"
    private readonly inputSelectItem: string = "div.MuiGrid-zeroMinWidth"
    private readonly inputAdditionalInfo: string = "div[data-placeholder='Type comment here']"
    private readonly salesOrderHeader: string  = "span[data-testid='header-name-salesOrder']"

    private readonly inputAddress: string = "div[data-testid='address-field-location']"
    private readonly inputFirstName: string = "input[name='firstName']"
    private readonly inputLastName: string = "input[name='lastName']"
    private readonly inputCity: string = "input[name='city']"

    private readonly buttonSubmit: string = "#submitButton"
    private readonly buttonDelete: string = "button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedSecondary"

    private readonly buttonMenu: string = "button[data-testid='buttonSalesOrderCardMenu']"
    private readonly menuItems: string = "span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body2.MuiTypography-displayBlock"

    private readonly isSaved: string = "#app > div > div.sc-eCApnc.iylGhi > div > div > div > div > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-align-items-xs-center > div:nth-child(2) > div > div.saved.katana-label.print-hide"
    private readonly notSaved: string = "#app > div > div.sc-eCApnc.iylGhi > div > div > div > div > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-align-items-xs-center > div:nth-child(2) > div > div.notSaved.katana-label.print-hide"

    private readonly tmplAllChangesSaved: string = "All changes saved"
    private readonly tmplNotSaved: string = "Not saved"

    public setCustomer(customer: ICustomer): void {
        cy.get(this.inputField).eq(0).type(customer.lastName)
        cy.contains(`${customer.firstName} ${customer.lastName}`).click()
        cy.get(this.inputField).eq(0).should("have.value", `${customer.firstName} ${customer.lastName}`)
    }

    public setOrderNo(orderNo: string): void {
        cy.get(this.inputField).eq(1).clear()
            .type(orderNo)
            .should("have.value", orderNo)
    }

    public clearOrderNo(): void {
        cy.get(this.inputField).eq(1).clear()
    }

    public setItem(item: IItem): void {
        cy.get(this.inputItem).eq(1).click().type(item.nameShort)
        cy.contains(item.nameFull).click()
        cy.get(this.inputSelectItem).should("have.text", item.nameFull)
    }

    public setAdditionalInfo(additionalInfo: string): void {
        cy.get(this.inputAdditionalInfo).click()
            .type(additionalInfo)
            .should("have.text", additionalInfo)
    }

    public verifyAllChangesAreSaved(): void {
        cy.get(this.isSaved).should("have.text", this.tmplAllChangesSaved)
    }

    public verifyAllChangesAreNotSaved(): void {
        cy.get(this.notSaved).should("have.text", this.tmplNotSaved)
    }

    public verifyHeader(orderNo: string, firstName: string, lastName: string): void {
        cy.get(this.salesOrderHeader).should("have.text", `${orderNo} ${firstName} ${lastName}`)
    }

    public verifySalesOrder(salesOrder: ISalesOrder, customer: ICustomer): void {
        // TODO: verify all the information
        this.verifyHeader(salesOrder.orderNo, customer.firstName, customer.lastName)
    }

    public clickOnAddress(): void {
        cy.get(this.inputAddress).click()
    }

    public setFirstName(firstName: string): void {
        cy.get(this.inputFirstName).clear().type(firstName).should("have.value", firstName)
    }

    public setLastName(lastName: string): void {
        cy.get(this.inputLastName).clear().type(lastName).should("have.value", lastName)
    }

    public setCity(city: string): void {
        cy.get(this.inputCity).clear().type(city).should("have.value", city)
    }

    public clickOnSubmit(): void {
        cy.get(this.buttonSubmit).click()
    }

    public verifyAddress(address: IAddress): void {
        cy.get(this.inputAddress)
            .should("have.text", `${address.line1}, ${address.line2}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}`)
    }

    public deleteSalesOrder(): void {
        cy.get(this.buttonMenu).click()
        cy.get(this.menuItems).eq(0).click()
        cy.get(this.buttonDelete).eq(1).click()
    }
}

export const salesOrderPage = new SalesOrderPage()
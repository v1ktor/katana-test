import {ICustomer} from "../fixtures/ICustomer";
import {IItem} from "../fixtures/IItem";
import {ISalesOrder} from "../fixtures/ISalesOrder";

export class SalesOrderPage {
    private readonly fieldInput: string = "input.MuiInputBase-input"
    private readonly itemInput: string = "div[col-id='item']"
    private readonly selectedItemInput: string = "div.MuiGrid-zeroMinWidth"
    private readonly additionalInfoInput: string = "div[data-placeholder='Type comment here']"
    private readonly salesOrderHeader: string  = "span[data-testid='header-name-salesOrder']"

    private readonly isSaved: string = "#app > div > div.sc-eCApnc.iylGhi > div > div > div > div > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-align-items-xs-center > div:nth-child(2) > div > div.saved.katana-label.print-hide"

    private readonly tmplAllChangesSaved: string = "All changes saved"

    public setCustomer(customer: ICustomer): void {
        cy.get(this.fieldInput).eq(0).type(customer.lastName)
        cy.contains(`${customer.firstName} ${customer.lastName}`).click()
        cy.get(this.fieldInput).eq(0).should("have.value", `${customer.firstName} ${customer.lastName}`)
    }

    public setOrderNo(orderNo: string): void {
        cy.get(this.fieldInput).eq(1).clear()
            .type(orderNo)
            .should("have.value", orderNo)
    }

    public setItem(item: IItem): void {
        cy.get(this.itemInput).eq(1).click().type(item.nameShort)
        cy.contains(item.nameFull).click()
        cy.get(this.selectedItemInput).should("have.text", item.nameFull)
    }

    public setAdditionalInfo(additionalInfo: string): void {
        cy.get(this.additionalInfoInput).click()
            .type(additionalInfo)
            .should("have.text", additionalInfo)
    }

    public verifyAllChangesAreSaved(): void {
        cy.get(this.isSaved).should("have.text", this.tmplAllChangesSaved)
    }

    public verifyHeader(orderNo: string, firstName: string, lastName: string): void {
        cy.get(this.salesOrderHeader).should("have.text", `${orderNo} ${firstName} ${lastName}`)
    }

    public verifySalesOrder(salesOrder: ISalesOrder, customer: ICustomer): void {
        // TODO: verify all the information
        this.verifyHeader(salesOrder.orderNo, customer.firstName, customer.lastName)
    }
}

export const salesOrderPage = new SalesOrderPage()
import {ICustomer} from "../fixtures/ICustomer";
import {BillingAddress} from "./billingAddress";
import {IAddress} from "../fixtures/IAddress";

class Customer {
    private readonly billingAddress = new BillingAddress()

    private readonly fieldFirstName: string = "input[name='firstName']"
    private readonly fieldLastName: string = "input[name='lastName']"
    private readonly fieldCompanyName: string = "input[name='company']"
    private readonly fieldDisplayName: string = "input[name='name']"
    private readonly fieldEmail: string = "input[name='email']"
    private readonly fieldPhone: string = "input[name='phone']"
    private readonly fieldComment: string = "input[name='comment']"
    private readonly fieldBillingAddress: string = "input[name='defaultBillingAddress']"
    private readonly fieldDefaultShippingAddress: string = "input[name='defaultShippingAddress']"

    private readonly billingAddressContactInformation: string = "div[data-testid='textContactInformation']"
    private readonly billingAddressInformation: string = "div[data-testid='textAddressInformation']"
    private readonly billingAddressPhone: string = "div[data-testid='textPhoneInformation']"

    private readonly title: string = "span[data-testid='header-name-customer']"

    private readonly isSaved: string = ".MuiGrid-justify-content-xs-center > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiGrid-root"

    private readonly tmplAllChangesSaved: string = "All changes saved"

    public setFirstName(firstName: string): void {
        cy.get(this.fieldFirstName)
            .type(firstName)
            .should("have.value", firstName)
    }

    public setLastName(lastName: string): void {
        cy.get(this.fieldLastName)
            .type(lastName)
            .should("have.value", lastName)
    }

    public setCompanyName(companyName: string): void {
        cy.get(this.fieldCompanyName)
            .type(companyName)
            .should("have.value", companyName)
    }

    public setDisplayName(displayName: string): void {
        cy.get(this.fieldDisplayName)
            .clear()
            .type(`${this.fieldFirstName} ${this.fieldLastName}`)
    }

    public verifyDisplayName(displayName: string): void {
        cy.get(this.fieldDisplayName).click().should("have.value", displayName)
    }

    public setEmail(email: string): void {
        cy.get(this.fieldEmail)
            .type(email)
            .should("have.value", email)
    }

    public setPhone(phone: string): void {
        cy.get(this.fieldPhone)
            .type(phone)
            .should("have.value", phone)
    }

    public setComment(comment: string): void {
        cy.get(this.fieldComment)
            .type(comment)
            .should("have.value", comment)
    }

    public clickOnBillingAddress(): void {
        cy.get(this.fieldBillingAddress).click()
    }

    public verifyAllChangesAreSaved(field: string): void {
        cy.get(field).click()
        cy.get(this.isSaved).should("have.text", this.tmplAllChangesSaved)
    }

    public verifyBillingAddressIsSaved(billingAddress: IAddress): void {
        cy.get(this.isSaved).should("have.text", this.tmplAllChangesSaved)
        cy.get(this.billingAddressContactInformation)
            .should(
                "have.text",
                `${billingAddress.firstName} ${billingAddress.lastName}, ${billingAddress.company}`
            )
        cy.get(this.billingAddressInformation)
            .should(
                "have.text",
                `${billingAddress.line1}, ${billingAddress.line2}, ${billingAddress.city}, ${billingAddress.state}, ${billingAddress.zip}, ${billingAddress.country}`
            )
        cy.get(this.billingAddressPhone)
            .should("have.text", billingAddress.phone)
    }

    public fillCustomerData(customer: ICustomer) {
        this.setFirstName(customer.firstName)
        this.setLastName(customer.lastName)
        this.verifyDisplayName(`${customer.firstName} ${customer.lastName}`)
        this.verifyAllChangesAreSaved(this.fieldCompanyName)

        this.setCompanyName(customer.company)
        this.verifyAllChangesAreSaved(this.fieldEmail)

        this.setEmail(customer.email)
        this.verifyAllChangesAreSaved(this.fieldPhone)

        this.setPhone(customer.phone)
        this.verifyAllChangesAreSaved(this.fieldComment)

        this.setComment(customer.comment)
        this.verifyAllChangesAreSaved(this.fieldCompanyName)

        this.clickOnBillingAddress()
        this.billingAddress.fillBillingAddress(customer.addresses[0])
        this.verifyBillingAddressIsSaved(customer.addresses[0])
    }

    public verifyTitle(title: string): void {
        cy.get(this.title).should("have.text", title)
    }

    public verifyFirstName(firstName: string): void {
        cy.get(this.fieldFirstName).should("have.value", firstName)
    }

    public verifyLastName(lastName: string): void {
        cy.get(this.fieldLastName).should("have.value", lastName)
    }

    public verifyCompanyName(companyName: string): void {
        cy.get(this.fieldCompanyName).should("have.value", companyName)
    }

    public verifyEmail(email: string): void {
        cy.get(this.fieldEmail).should("have.value", email)
    }

    public verifyPhone(phone: string): void {
        cy.get(this.fieldPhone).should("have.value", phone)
    }

    public verifyComment(comment: string): void {
        cy.get(this.fieldComment).should("have.value", comment)
    }

    public verifyDefaultShippingAddress(): void {
        cy.get(this.fieldDefaultShippingAddress).should(
            "have.attr",
            "placeholder",
            "Same as billing address"
        )
    }

    public verifyCustomerDataIsAdded(customer: ICustomer) {
        this.verifyTitle(`${customer.firstName} ${customer.lastName}`)
        this.verifyFirstName(customer.firstName)
        this.verifyLastName(customer.lastName)
        this.verifyCompanyName(customer.company)
        this.verifyDisplayName(`${customer.firstName} ${customer.lastName}`)
        this.verifyEmail(customer.email)
        this.verifyPhone(customer.phone)
        this.verifyComment(customer.comment)
        this.verifyBillingAddressIsSaved(customer.addresses[0])
        this.verifyDefaultShippingAddress()
    }

}

export const customer = new Customer()
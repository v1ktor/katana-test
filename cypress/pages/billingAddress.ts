import {IAddress} from "../fixtures/IAddress";

export class BillingAddress {
    private readonly fieldFirstName: string = "input[name='firstName']"
    private readonly fieldLastName: string = "input[name='lastName']"
    private readonly fieldCompany: string = "input[name='company']"
    private readonly fieldPhone: string = "input[name='phone']"
    private readonly fieldAddressLine1: string = "input[name='line1']"
    private readonly fieldAddressLine2: string = "input[name='line2']"
    private readonly fieldCity: string = "input[name='city']"
    private readonly fieldRegion: string = "input[name='state']"
    private readonly fieldZip: string = "input[name='zip']"
    private readonly fieldCountry: string = "input[name='country']"
    private readonly buttonSubmit: string = "#submitButton"

    public setFirstName(firstName: string): void {
        cy.get(this.fieldFirstName)
            .eq(1)
            .type(firstName)
    }

    public setLastName(lastName: string): void {
        cy.get(this.fieldLastName)
            .eq(1)
            .type(lastName)
    }

    public setCompany(company: string): void {
        cy.get(this.fieldCompany)
            .eq(1)
            .type(company)
    }

    public setPhone(phone: string): void {
        cy.get(this.fieldPhone)
            .eq(1)
            .type(phone)
    }

    public setAddressLine1(address: string): void {
        cy.get(this.fieldAddressLine1).type(address)
    }

    public setAddressLine2(address: string): void {
        cy.get(this.fieldAddressLine2).type(address)
    }

    public setCity(city: string): void {
        cy.get(this.fieldCity).type(city)
    }

    public setRegion(region: string): void {
        cy.get(this.fieldRegion).type(region)
    }

    public setZip(zip: string): void {
        cy.get(this.fieldZip).type(zip)
    }

    public setCountry(country: string): void {
        cy.get(this.fieldCountry).type(country)
    }

    public clickSubmit(): void {
        cy.get(this.buttonSubmit).click()
    }

    public fillBillingAddress(billingAddress: IAddress): void {
        this.setFirstName(billingAddress.first_name)
        this.setLastName(billingAddress.last_name)
        this.setCompany(billingAddress.company)
        this.setPhone(billingAddress.phone)
        this.setAddressLine1(billingAddress.line_1)
        this.setAddressLine2(billingAddress.line_2)
        this.setCity(billingAddress.city)
        this.setRegion(billingAddress.state)
        this.setZip(billingAddress.zip)
        this.setCountry(billingAddress.country)
        this.clickSubmit()
    }
}

export const billingAddress = new BillingAddress()
import {ICustomer} from "../fixtures/ICustomer";
import {IAddress} from "../fixtures/IAddress";

class Api {
    public authToken: string | string []

    public addCustomer(customer: ICustomer, toFailOnStatusCode: boolean = true): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
            method: "POST",
            url: Cypress.env("urlApiCustomers"),
            failOnStatusCode: toFailOnStatusCode,
            headers: {
                Accept: "application/json",
                Authorization: this.authToken
            },
            body: customer
        })
    }

    public addCustomerAddress(address: IAddress, toFailOnStatusCode: boolean = true): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
            method: "POST",
            url: Cypress.env("urlApiCustomerAddresses"),
            failOnStatusCode: toFailOnStatusCode,
            headers: {
                Accept: "application/json",
                Authorization: this.authToken
            },
            body: address
        })
    }

    public updateCustomer(customer: ICustomer, toFailOnStatusCode: boolean = true): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
            method: "PATCH",
            url: Cypress.env("urlApiCustomers") + `/${customer.id}`,
            failOnStatusCode: toFailOnStatusCode,
            headers: {
                Accept: "application/json",
                Authorization: this.authToken
            },
            body: customer
        })
    }
}

export const api = new Api()
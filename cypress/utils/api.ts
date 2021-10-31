import {ICustomer} from "../fixtures/ICustomer";
import {IAddress} from "../fixtures/IAddress";

class Api {
    public authToken: string | string []

    public addCustomer(customer: ICustomer): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
            method: "POST",
            url: Cypress.env("urlApiCustomers"),
            headers: {
                Accept: "application/json",
                Authorization: this.authToken
            },
            body: customer
        })
    }

    public addCustomerAddress(address: IAddress): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
            method: "POST",
            url: Cypress.env("urlApiCustomerAddresses"),
            headers: {
                Accept: "application/json",
                Authorization: this.authToken
            },
            body: address
        })
    }

    public updateCustomer(customer: ICustomer): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
            method: "PATCH",
            url: Cypress.env("urlApiCustomers") + `/${customer.id}`,
            headers: {
                Accept: "application/json",
                Authorization: this.authToken
            },
            body: customer
        })
    }
}

export const api = new Api()
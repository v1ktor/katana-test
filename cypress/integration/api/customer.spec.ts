import {login} from "../../pages/login";
import {defaultCustomer} from "../../fixtures/ICustomer";

describe("customer can be added", function () {
    it("should add customer", function () {
        cy.visit("/login")
        login.loginAs()
        cy.intercept("GET", "https://users.katanamrp.com/api/katanaUsers/userinfo?qbConnectDialogOpen=false").as("userInfo")
        cy.wait("@userInfo").then(interception => {
            cy.request({
                method: "POST",
                url: Cypress.env("urlApiCustomers"),
                headers: {
                    Accept: "application/json",
                    Authorization: interception.request.headers.authorization
                },
                body: defaultCustomer
            }).should(response => {
                cy.log(JSON.stringify(response.body))
            })
            console.log(defaultCustomer.last_name)
        })
    })
})
import {login} from "../../pages/login";
import {katana} from "../../pages/katana";
import {Pages} from "../../pages/pages";
import {customer} from "../../pages/customer";
import {customerUi} from "../../fixtures/ICustomer";
import {contacts} from "../../pages/contacts";

describe("customer can be added", function () {
    it('should login', function () {
        cy.visit("/login")
        login.loginAs()
        katana.buttonGlobalAddShouldBeVisible()
    });
    it('should add new customer', function () {
        katana.navigateTo(Pages.NEW_CUSTOMER)
        customer.fillCustomerData(customerUi)
    });
    it('should verify that new customer is added', function () {
        katana.navigateTo(Pages.ALL_CONTACTS)
        contacts.findByName(customerUi.lastName)
        customer.verifyCustomerDataIsAdded(customerUi)
    });
})
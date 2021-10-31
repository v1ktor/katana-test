import {login} from "../../pages/login";
import {katana} from "../../pages/katana";
import {Pages} from "../../pages/pages";
import {customer} from "../../pages/customer";
import {defaultCustomer} from "../../fixtures/ICustomer";
import {contacts} from "../../pages/contacts";

describe("customer can be added", function () {
    it('should login', function () {
        cy.visit("/login")
        login.loginAs()
        katana.buttonGlobalAddShouldBeVisible()
    });
    it('should add new customer', function () {
        katana.navigateTo(Pages.NEW_CUSTOMER)
        customer.fillCustomerData(defaultCustomer)
    });
    it('should verify that new customer is added', function () {
        katana.navigateTo(Pages.ALL_CONTACTS)
        contacts.findByName(defaultCustomer.last_name)
        customer.verifyCustomerDataIsAdded(defaultCustomer)
    });
})
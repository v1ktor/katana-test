import {loginPage} from "../../pages/loginPage";
import {navigation} from "../../pages/navigation";
import {Pages} from "../../pages/pages";
import {customerPage} from "../../pages/customerPage";
import {contactsPage} from "../../pages/contactsPage";
import {v4 as uuidv4} from "uuid";
import {IAddress} from "../../fixtures/IAddress";
import {AddressEntityType} from "../../fixtures/addressEntityType";
import {ICustomer} from "../../fixtures/ICustomer";

let firstName: string = "Viktor"
let lastName: string = uuidv4()

let testAddress: IAddress = {
    entityType: AddressEntityType.billing,
    firstName: "Viktor",
    lastName: "Kalinin",
    company: "Umbrella",
    phone: "+372 123 456 789",
    line1: "Toompea 1 - 1",
    line2: "Toompea 1 - 2",
    city: "Tallinn",
    state: "Harjumaa",
    zip: "12345",
    country: "Estonia"
}

let testCustomer: ICustomer = {
    firstName: firstName,
    lastName: lastName,
    name: `${firstName} ${lastName}`,
    company: "Umbrella",
    email: "mirelir689@d3bb.com",
    phone: "+372 000 111 222 333",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    currency: "EUR",
}

describe("customer can be added", function () {
    it('should add new customer and verify', function () {
        let lastName: string = uuidv4()
        let customer = Object.assign({}, testCustomer)
        let address = Object.assign({}, testAddress)
        customer.lastName = lastName
        customer.name = `${firstName} ${lastName}`
        customer.addresses = [address]

        cy.visit("/login")
        loginPage.loginAs()
        navigation.buttonGlobalAddShouldBeVisible()

        navigation.navigateTo(Pages.NEW_CUSTOMER)
        customerPage.fillCustomerData(customer)

        navigation.navigateTo(Pages.ALL_CONTACTS)
        contactsPage.findByName(customer.lastName)
        customerPage.verifyCustomerDataIsAdded(customer)
    });
})
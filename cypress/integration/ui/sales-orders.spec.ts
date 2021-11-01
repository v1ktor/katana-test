import {v4 as uuidv4} from "uuid";
import {IAddress} from "../../fixtures/IAddress";
import {AddressEntityType} from "../../fixtures/addressEntityType";
import {ICustomer} from "../../fixtures/ICustomer";
import {loginPage} from "../../pages/loginPage";
import {api} from "../../utils/api";
import {navigation} from "../../pages/navigation";
import {Pages} from "../../pages/pages";
import {ISalesOrder} from "../../fixtures/ISalesOrder";
import {salesOrderPage} from "../../pages/salesOrderPage";
import {IItem} from "../../fixtures/IItem";
import {salesPage} from "../../pages/salesPage";

let firstName: string = "Viktor"
let lastName: string = uuidv4()
let orderNo: string = uuidv4()

let testAddress: IAddress = {
    entityType: AddressEntityType.BILLING,
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

let testItem: IItem = {
    nameShort: "Dining table",
    nameFull: "[DT-BR] Dining table [DEMO] / brown"
}

let testSalesOrder: ISalesOrder = {
    customer: testCustomer,
    orderNo: orderNo,
    item: testItem,
    additionalInfo: "lorem ipsum"
}

beforeEach(() => {
    cy.visit("/login")
    loginPage.loginAs()
    cy.intercept("GET", "https://users.katanamrp.com/api/katanaUsers/userinfo?qbConnectDialogOpen=false").as("userInfo")
    cy.wait("@userInfo").then(interception => {
        api.authToken = interception.request.headers.authorization
        let lastName: string = uuidv4()
        let expectedCustomer = Object.assign({}, testCustomer)
        let expectedAddress = Object.assign({}, testAddress)
        expectedCustomer.lastName = lastName
        expectedCustomer.name = `${firstName} ${lastName}`

        api.addCustomer(expectedCustomer).then(response => {
            expectedAddress.customerId = response.body.id
            expectedCustomer.id = response.body.id

            api.addCustomerAddress(expectedAddress).then(response => {
                expectedCustomer.defaultShippingId = response.body.id
                expectedCustomer.defaultBillingId = response.body.id

                api.updateCustomer(expectedCustomer).then(() => {
                    cy.wrap(expectedCustomer).as("addedCustomer")
                })
            })
        })
    })
})

describe("sales order can be added", function () {
    it("should add new sales order and verify", function () {
        cy.get("@addedCustomer").then(addedCustomer => {
            let customer = addedCustomer as ICustomer
            let salesOrder = Object.assign({}, testSalesOrder)
            salesOrder.orderNo = uuidv4()

            navigation.navigateTo(Pages.NEW_SALES_ORDER)
            salesOrderPage.setCustomer(customer)
            salesOrderPage.setOrderNo(salesOrder.orderNo)
            salesOrderPage.setItem(salesOrder.item)
            salesOrderPage.setAdditionalInfo(salesOrder.additionalInfo)
            salesOrderPage.verifyAllChangesAreSaved()

            navigation.navigateTo(Pages.SALES)
            salesPage.findByOrder(salesOrder.orderNo)
            salesOrderPage.verifySalesOrder(salesOrder, customer)
        })
    })

    it("should change address of the sales order", function () {
        cy.get("@addedCustomer").then(addedCustomer => {
            let customer = addedCustomer as ICustomer
            let address = Object.assign({}, testAddress)
            address.firstName = "Toivo"
            address.lastName = "Jürgenson"
            address.city = "Tartu"
            let salesOrder = Object.assign({}, testSalesOrder)
            salesOrder.orderNo = uuidv4()

            navigation.navigateTo(Pages.NEW_SALES_ORDER)
            salesOrderPage.setCustomer(customer)
            salesOrderPage.setOrderNo(salesOrder.orderNo)
            salesOrderPage.setItem(salesOrder.item)
            salesOrderPage.setAdditionalInfo(salesOrder.additionalInfo)
            salesOrderPage.clickOnAddress()
            salesOrderPage.setFirstName(address.firstName)
            salesOrderPage.setLastName(address.lastName)
            salesOrderPage.setCity(address.city)
            salesOrderPage.clickOnSubmit()
            salesOrderPage.verifyAllChangesAreSaved()

            salesOrderPage.verifyAddress(address)
        })
    })

    it("should not save sales order without customer", function () {
        navigation.navigateTo(Pages.NEW_SALES_ORDER)
        salesOrderPage.verifyAllChangesAreNotSaved()
    });

    it("should not save sales order without order no", function () {
        cy.get("@addedCustomer").then(addedCustomer => {
            let customer = addedCustomer as ICustomer

            navigation.navigateTo(Pages.NEW_SALES_ORDER)
            salesOrderPage.setCustomer(customer)
            salesOrderPage.clearOrderNo()

            salesOrderPage.verifyAllChangesAreNotSaved()
        })
    })

    it("should delete saved sales order", function () {
            cy.get("@addedCustomer").then(addedCustomer => {
                let customer = addedCustomer as ICustomer
                let salesOrder = Object.assign({}, testSalesOrder)
                salesOrder.orderNo = uuidv4()

                navigation.navigateTo(Pages.NEW_SALES_ORDER)
                salesOrderPage.setCustomer(customer)
                salesOrderPage.setOrderNo(salesOrder.orderNo)
                salesOrderPage.setItem(salesOrder.item)
                salesOrderPage.setAdditionalInfo(salesOrder.additionalInfo)
                salesOrderPage.verifyAllChangesAreSaved()
                salesOrderPage.deleteSalesOrder()

                salesPage.verifyOrderCannotBeFound(salesOrder.orderNo)
            })
    });
});
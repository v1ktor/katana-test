import {loginPage} from "../../pages/loginPage";
import {ICustomer} from "../../fixtures/ICustomer";
import {api} from "../../utils/api";
import {IAddress} from "../../fixtures/IAddress";
import {AddressEntityType} from "../../fixtures/addressEntityType";
import {v4 as uuidv4} from "uuid";
import {helper} from "../../utils/helper";

let firstName: string = "Viktor"
let lastName: string = uuidv4()

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

beforeEach(() => {
    cy.visit("/login")
    loginPage.loginAs()
    cy.intercept("GET", "https://users.katanamrp.com/api/katanaUsers/userinfo?qbConnectDialogOpen=false").as("userInfo")
})

describe("adding a customer", function () {
    it("should add customer with address and verify", function () {
        cy.wait("@userInfo").then(interception => {
            api.authToken = interception.request.headers.authorization

            let lastName: string = uuidv4()
            let expectedCustomer = Object.assign({}, testCustomer)
            expectedCustomer.lastName = lastName
            expectedCustomer.name = `${firstName} ${lastName}`

            api.addCustomer(expectedCustomer)
                .then(response => {
                    let actualCustomer = response.body as ICustomer
                    let expectedAddress = Object.assign({}, testAddress)
                    expectedAddress.customerId = actualCustomer.id

                    api.addCustomerAddress(expectedAddress)
                        .then(response => {
                            let actualAddress = response.body as IAddress

                            // TODO: implement recursive assertion of two objects with an ability to specify ignored fields
                            expect(actualAddress.entityType).to.be.eq(expectedAddress.entityType)
                            expect(actualAddress.firstName).to.be.eq(expectedAddress.firstName)
                            expect(actualAddress.lastName).to.be.eq(expectedAddress.lastName)
                            expect(actualAddress.company).to.be.eq(expectedAddress.company)
                            expect(actualAddress.phone).to.be.eq(expectedAddress.phone)
                            expect(actualAddress.line1).to.be.eq(expectedAddress.line1)
                            expect(actualAddress.line2).to.be.eq(expectedAddress.line2)
                            expect(actualAddress.city).to.be.eq(expectedAddress.city)
                            expect(actualAddress.state).to.be.eq(expectedAddress.state)
                            expect(actualAddress.zip).to.be.eq(expectedAddress.zip)
                            expect(actualAddress.country).to.be.eq(expectedAddress.country)
                            expect(actualAddress.customerId).to.be.eq(actualCustomer.id)
                            expect(actualAddress.id).not.to.be.null
                            expect(actualAddress.createdAt).not.to.be.null
                            expect(actualAddress.updatedAt).not.to.be.null
                            expect(actualAddress.factoryId).not.to.be.null

                            actualCustomer.defaultShippingId = actualAddress.id
                            actualCustomer.defaultBillingId = actualAddress.id
                            api.updateCustomer(actualCustomer)
                                .then(response => {
                                    actualCustomer = response.body as ICustomer

                                    expect(actualCustomer.firstName).to.be.eq(expectedCustomer.firstName)
                                    expect(actualCustomer.lastName).to.be.eq(expectedCustomer.lastName)
                                    expect(actualCustomer.company).to.be.eq(expectedCustomer.company)
                                    expect(actualCustomer.name).to.be.eq(expectedCustomer.name)
                                    expect(actualCustomer.email).to.be.eq(expectedCustomer.email)
                                    expect(actualCustomer.phone).to.be.eq(expectedCustomer.phone)
                                    expect(actualCustomer.comment).to.be.eq(expectedCustomer.comment)
                                    expect(actualCustomer.currency).to.be.eq(expectedCustomer.currency)
                                    expect(actualCustomer.defaultBillingId).to.be.eq(actualAddress.id)
                                    expect(actualCustomer.defaultShippingId).to.be.eq(actualAddress.id)
                                    expect(actualCustomer.deletedAt).to.be.null
                                    expect(actualCustomer.createdAt).not.to.be.null
                                    expect(actualCustomer.updatedAt).not.to.be.null
                                    expect(actualCustomer.factoryId).not.to.be.null
                                })
                        })
                })
        })
    })

    it('should not add customer without display name', function () {
        cy.wait("@userInfo").then(interception => {
            api.authToken = interception.request.headers.authorization

            let lastName: string = uuidv4()
            let expectedCustomer = Object.assign({}, testCustomer)
            expectedCustomer.lastName = lastName
            expectedCustomer.name = null

            api.addCustomer(expectedCustomer, false).then(response => {
                expect(response.status).to.be.eq(422)
            })
        })
    });

    it('should not add customer without authToken', function () {
        cy.wait("@userInfo").then(() => {
            api.authToken = null

            let lastName: string = uuidv4()
            let expectedCustomer = Object.assign({}, testCustomer)
            expectedCustomer.lastName = lastName
            expectedCustomer.name = `${firstName} ${lastName}`

            api.addCustomer(expectedCustomer, false).then(response => {
                expect(response.status).to.be.eq(401)
            })
        })
    });
})

describe("add customer with various values for the firstname", function () {
    [
        "null",
        "0",
        "!@#$%^&*()_+/\\<><strong>test</strong>",
        "",
        helper.generateRandomString(100)
    ].forEach((firstNameValue) => {
        it("should add customer with firstname value: " + firstNameValue, function () {
            cy.wait("@userInfo").then(interception => {
                api.authToken = interception.request.headers.authorization

                let lastName: string = uuidv4()
                let expectedCustomer = Object.assign({}, testCustomer)
                expectedCustomer.firstName = firstNameValue
                expectedCustomer.lastName = lastName
                expectedCustomer.name = `${firstName} ${lastName}`

                api.addCustomer(expectedCustomer).then(response => {
                    let actualCustomer = response.body as ICustomer

                    expect(actualCustomer.firstName).to.be.eq(expectedCustomer.firstName)
                    expect(actualCustomer.lastName).to.be.eq(expectedCustomer.lastName)
                    expect(actualCustomer.company).to.be.eq(expectedCustomer.company)
                    expect(actualCustomer.name).to.be.eq(expectedCustomer.name)
                    expect(actualCustomer.email).to.be.eq(expectedCustomer.email)
                    expect(actualCustomer.phone).to.be.eq(expectedCustomer.phone)
                    expect(actualCustomer.comment).to.be.eq(expectedCustomer.comment)
                    expect(actualCustomer.currency).to.be.eq(expectedCustomer.currency)
                    expect(actualCustomer.defaultBillingId).to.be.null
                    expect(actualCustomer.defaultShippingId).to.be.null
                    expect(actualCustomer.deletedAt).to.be.null
                    expect(actualCustomer.createdAt).not.to.be.null
                    expect(actualCustomer.updatedAt).not.to.be.null
                    expect(actualCustomer.factoryId).not.to.be.null
                })
            })
        });
    })
});
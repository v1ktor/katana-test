import {defaultBillingAddress, IBillingAddress} from "./IBillingAddress";
import {v4 as uuidv4} from 'uuid';

export interface ICustomer {
    name?: string, // display name
    firstName: string,
    lastName: string,
    companyName: string,
    displayName?: string,
    email: string,
    phone: string,
    comment: string,
    billingAddress: IBillingAddress
}

let firstName: string = "Viktor"
let lastName: string = uuidv4()

export const defaultCustomer: ICustomer = {
    name: `${firstName} ${lastName}`,
    firstName: firstName,
    lastName: lastName,
    companyName: "Umbrella",
    email: "mirelir689@d3bb.com",
    phone: "+372 000 111 222 333",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    billingAddress: defaultBillingAddress
}
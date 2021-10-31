import {defaultBillingAddress, IAddress} from "./IAddress";
import {v4 as uuidv4} from 'uuid';
import dateTimeISO = CypressCommandLine.dateTimeISO;

export interface ICustomer {
    id?: bigint,
    firstName?: string,
    lastName?: string,
    company?: string,
    name?: string, // display name
    email?: string,
    phone?: string,
    comment?: string,
    currency?: string,
    defaultBillingId?: bigint,
    defaultShippingId?: bigint,
    deletedAt?: dateTimeISO,
    createdAt?: dateTimeISO,
    updatedAt?: dateTimeISO,
    factoryId?: bigint
    addresses?: IAddress[]
}

let firstName: string = "Viktor"
let lastName: string = uuidv4()

export const customerUi: ICustomer = {
    firstName: firstName,
    lastName: lastName,
    name: `${firstName} ${lastName}`,
    company: "Umbrella",
    email: "mirelir689@d3bb.com",
    phone: "+372 000 111 222 333",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    currency: "EUR",
    addresses: [defaultBillingAddress]
}
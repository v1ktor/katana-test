import {IBillingAddress, defaultBillingAddress} from "./IBillingAddress";
import { v4 as uuidv4 } from 'uuid';

export interface ICustomer {
    firstName: string,
    lastName: string,
    companyName: string,
    displayName?: string,
    email: string,
    phone: string,
    comment: string,
    billingAddress: IBillingAddress
}

export const defaultCustomer: ICustomer = {
    firstName: "Viktor",
    lastName: uuidv4(),
    companyName: "Umbrella",
    email: "mirelir689@d3bb.com",
    phone: "+372 000 111 222 333",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    billingAddress: defaultBillingAddress
}
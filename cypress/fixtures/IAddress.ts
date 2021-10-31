import dateTimeISO = CypressCommandLine.dateTimeISO;
import {AddressEntityType} from "./addressEntityType";

export interface IAddress {
    entityType?: AddressEntityType,
    firstName?: string,
    lastName?: string,
    company?: string,
    phone?: string,
    line1?: string,
    line2?: string,
    city?: string,
    state?: string,
    zip?: string,
    country?: string,
    id?: bigint,
    customerId?: bigint,
    createdAt?: dateTimeISO,
    updatedAt?: dateTimeISO,
    factoryId?: bigint
}

export const defaultBillingAddress: IAddress = {
    entityType: AddressEntityType.billing,
    firstName: "Viktor",
    lastName: "Kalinin",
    company: "Umbrella",
    phone: "+372 000 000 000",
    line1: "Toompea 1 - 1",
    line2: "Toompea 2 - 1",
    city: "Tallinn",
    state: "Harjumaa",
    zip: "12345",
    country: "Estonia"
}
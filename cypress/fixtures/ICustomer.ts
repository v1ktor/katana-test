import {IAddress} from "./IAddress";
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
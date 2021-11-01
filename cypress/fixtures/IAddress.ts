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
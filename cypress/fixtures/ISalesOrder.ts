import {ICustomer} from "./ICustomer";
import {IAddress} from "./IAddress";
import {IItem} from "./IItem";

export interface ISalesOrder {
    customer?: ICustomer,
    orderNo?: string,
    billTo?: IAddress,
    deliveryDeadline?: string,
    createdDate?: string
    item?: IItem,
    additionalInfo?: string
}
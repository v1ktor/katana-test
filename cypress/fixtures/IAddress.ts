export interface IAddress {
    entity_type: string,
    default: boolean,
    first_name: string,
    last_name: string,
    company: string,
    phone: string,
    line_1: string,
    line_2: string,
    city: string,
    state: string,
    zip: string,
    country: string
}

export const defaultBillingAddress: IAddress = {
    entity_type: "billing",
    default: false,
    first_name: "Viktor",
    last_name: "Kalinin",
    company: "Umbrella",
    phone: "+372 000 000 000",
    line_1: "Toompea 1 - 1",
    line_2: "Toompea 2 - 1",
    city: "Tallinn",
    state: "Harjumaa",
    zip: "12345",
    country: "Estonia"
}
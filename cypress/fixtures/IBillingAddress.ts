export interface IBillingAddress {
    firstName: string,
    lastName: string,
    company: string,
    phone: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    region: string,
    zip: string,
    country: string
}

export const defaultBillingAddress: IBillingAddress = {
    firstName: "Viktor",
    lastName: "Kalinin",
    company: "Umbrella",
    phone: "+372 000 000 000",
    addressLine1: "Toompea 1 - 1",
    addressLine2: "Toompea 2 - 1",
    city: "Tallinn",
    region: "Harjumaa",
    zip: "12345",
    country: "Estonia"
}
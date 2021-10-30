class Login {
    private readonly fieldEmail: string = "#1-email"
    private readonly fieldPassword: string = "input[name='password']"
    private readonly buttonSubmit: string = "button[name='submit']"

    /**
     * By default will use username and password defined in the cypress.json
     * @param username
     * @param password
     */
    public loginAs(username: string = Cypress.env('username'), password: string = Cypress.env("password")): void {
        cy.get(this.fieldEmail).type(username)
        cy.get(this.fieldPassword).type(password)
        cy.get(this.buttonSubmit).click()
    }
}

export const login = new Login()
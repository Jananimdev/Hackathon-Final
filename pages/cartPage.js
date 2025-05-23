exports.cartPage = class cartPage{
    constructor(page){
        this.page = page;
        this.emailerr;
        this.pinerr;
    }
    
    async addToCart(){
        try {
            // await this.page.click("//button[@id='add-to-cart-button']");
            await this.page.getByRole('button', { name: 'Add to Cart' }).click();
        } catch (error) {
            console.log(error);
        }
    }

    async goToCart(){
        try {
            await this.page.click("#cart-badge")
        } catch (error) {
            console.log(error)
        }
    }
    async checkOut(){
        try {
            await this.page.click("(//button[@id='checkout-link'])[1]")
        } catch (error) {
            console.log(error)
        }
    }
    
    
    async enterEmail(){
        try {
                await this.page.getByPlaceholder("Enter Email").fill("email@17");
                
            } catch (error) {
                console.log(error);
            }
        }
        async enterPincode(){
        try {
            await this.page.locator("//input[@id='order_ship_address_attributes_zipcode']").fill("987");

        } catch (error) {
                console.log(error);
            }
        }
        async validateEmail(){
        try {
             this.emailerr = await this.page.textContent('//label[@for="order_email" and @class = "error"]');
                
                
            } catch (error) {
                console.log(error);
            }
        }
        async validatePinCode(){
            try {
                this.pinerr = await this.page.textContent('//label[@for="order_ship_address_attributes_zipcode"and @class="error"]');
                
            } catch (error) {
                console.log(error);
            }
        }
        
}
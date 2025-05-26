import { expect } from "playwright/test";
exports.productSearch = class productSearch{
    constructor(page){
        this.page = page;
        this.newPage;
        this.url='https://www.urbanladder.com/';
        this.productSelection;


    }

    async loadURL() {
        try {
            await this.page.goto(this.url);

        } catch (error) {
            console.log(error);
        }
        
    }

    async searchProduct(product){
        try {
            await this.page.getByPlaceholder("Search").pressSequentially(product,{delay:200});
            await this.page.keyboard.press('Enter');
        } catch (error) {
            console.log(error);
        }
    }

    async selectProductType(product){
        try {
            this.productSelection = await this.page.locator(`h4:has-text("${product}")`);
            await this.productSelection.waitFor();
            await this.productSelection.scrollIntoViewIfNeeded();
            await this.productSelection.click();
            await expect(this.page.url()).toContain("bookshelf")
            
        } catch (error) {
            console.log(error)
        }
    }
    async selectProduct(product){
        try {
            await this.page.locator(".productlist.withdivider li").nth(1).click();
            const pagePromise = await this.page.waitForEvent("popup");
            this.newPage = pagePromise;

            
        } catch (error) {
            console.log(error)
        }
    }
    
    async selectStorageType(type){
        try {
            await this.page.hover("//li[@data-group='storage type']");
            await this.page.click(`//ul[@data-filter-name="storage_type"]/li//label[normalize-space(text())="${type}"]`);
            
        } catch (error) {
            console.log(error)
        }
    }

    async includeOutOfStock(){
        try {
            if(await this.page.locator("//input[@id='filters_availability_In_Stock_Only']").isChecked()){
                await this.page.locator("//input[@id='filters_availability_In_Stock_Only']").uncheck();
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    async excludeOutOfStock(){
        try {
            if(!(await this.page.locator("//input[@id='filters_availability_In_Stock_Only']").isChecked())){
                await this.page.locator("//input[@id='filters_availability_In_Stock_Only']").check();
            }
            await expect(this.page.locator("//input[@id='filters_availability_In_Stock_Only']").toBeChecked())
        } catch (error) {
            console.log(error);
        }
    }

    async sortyBy(value){
        try {
            await this.page.locator("//div[@class='item' and @data-group = 'sorting']").hover();
            await this.page.locator(`//ul[@class='sortoptions']//li[text()="${value}"]`).click();
        } catch (error) {
            console.log(error);
        }
    }

    async setPrice(){
        try {
            await this.page.evaluate(() =>
                document.querySelector("#filters_price_max").setAttribute("value", "15000")
              );
        } catch (error) {
            console.log(error);
        }
    }

    async popupHandle(){
        try {
            await this.page.waitForSelector("#authentication_popup");
            await this.page.click("//a[normalize-space()='Close']");
        } catch (error) {
            console.log(error);
        }
    }
}
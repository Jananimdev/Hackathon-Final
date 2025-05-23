exports.getPorductDetails = class getPorductDetails{
    constructor(page){
        this.page = page;
        this.products = [];

    }

    async getDetails(num) {
        try {
            const productList = await this.page.locator(".productlist.withdivider li");
            for (let i = 0; i < 3; i++) {
                const title = await productList.nth(i)
                .locator(".product-info-block .product-title .name")
                .textContent();
                const price = await productList.nth(i)
                .locator(".price-number span")
                .textContent();

                this.products.push({ Name: title, Price: price });
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    
}
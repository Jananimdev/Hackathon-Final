exports.navBarMenu = class navBarMenu{
    constructor(page){
        this.page = page;
        this.menuItems;

    }

    async getValueOfMenu(value){
        try {
            await this.page.locator(`//div[@id='topnav_wrapper']//li//span[normalize-space(text())='${value}']`).hover();
            this.menuItems = await this.page.locator(`(//div[@id='topnav_wrapper']//li//span[normalize-space(text())='${value}'])/following-sibling::div//ul//li`).evaluateAll(items => 
                items.map(item => {
                    const mainItem = item.querySelector('.taxontype a') ? item.querySelector('.taxontype a').textContent.trim() : item.textContent.trim();
                    const subItems = Array.from(item.querySelectorAll('ul.taxonslist li.subnav_item')).map(subItem => subItem.textContent.trim());
                    return { mainItem, subItems };
                }).filter(item => item.subItems.length > 0) 
            );            
        } catch (error) {
            console.log(error);
        }
    }

}
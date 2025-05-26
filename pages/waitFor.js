exports.waitFor = class waitFor{
    constructor(page){
        this.page = page;
    
    }

    async waitingTime(){
        try {
            await this.page.waitForTimeout(2000);
        } catch (error) {
            console.log(error)
        }
    }

    async waitingLoad(){
        try {
            await this.page.waitForLoadState("load");
        } catch (error) {
            console.log(error);
        }
    }
    
    async waitingURL(url){
        try {
            await this.page.waitForURL(url);
        } catch (error) {
            console.log(error);
        }
    }
    
    
}
import {test,expect} from '@playwright/test';
import { productSearch } from '../pages/porductSearch';
import { waitFor } from '../pages/waitFor';
import { navBarMenu } from '../pages/navBarMenu';
import inputData from '../data/input.json' assert { type : 'json' };
import { getPorductDetails } from '../pages/getPorductDetails';
import { cartPage } from '../pages/cartPage';
import {writingOutput} from '../pages/writingOutput';



test('bookShelves',async ({page}) => {
    //object creation
    const book = new productSearch(page);
    const wait = new waitFor(page);
    const navMenu = new navBarMenu(page);
    const getDetails = new getPorductDetails(page);
    const xl = new writingOutput(page);
    
    await book.loadURL();
    await wait.waitingURL(book.url);
    await book.selectProductType(inputData.productName);
    await book.popupHandle();
    await book.includeOutOfStock();
    await wait.waitingTime();
    await book.setPrice(inputData.price);
    await book.selectStorageType(inputData.type);
    await book.sortyBy(inputData.sortyByValue);
    await navMenu.getValueOfMenu(inputData.menuName);
    await getDetails.getDetails(inputData.noOfProdcuts);
    await wait.waitingLoad();
    await book.selectProduct();
    const cart = new cartPage(book.newPage);
    await wait.waitingLoad();

    await cart.addToCart();
    await cart.checkOut();
    
    await cart.enterEmail();
    await cart.enterPincode();
    await book.newPage.screenshot({path:"data/errorMsg.png"})
    await cart.validateEmail();
    await cart.validatePinCode();
    

    const result = {
        menuItems: navMenu.menuItems,
        products: getDetails.products,
        emailErrors: cart.emailerr,
        pinErrors: cart.pinerr
    };
    xl.writeJson(result);

    const menuItems = result.menuItems.map(item => ({
        mainItem: item.mainItem,
        subItems: item.subItems.join(', ')
    }));
    await xl.createAppend(menuItems,inputData.menuName);
    const products = result.products.map(product => ({
        product_Name: product.Name,
        Product_Price: product.Price
    }));
    await xl.createAppend(products,inputData.productName);
    
    const errors = [
        {
            EmailErrors: result.emailErrors,
            PincodeErrors: result.pinErrors
        }
    ];
    await xl.createAppend(errors,"Validaton");
    await xl.writeExcel();
    
});
# Test info

- Name: bookShelves
- Location: C:\Users\2397922\OneDrive - Cognizant\Documents\HACKATHON\tests\urbanLader.spec.js:12:5

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Windows\system32\config\systemprofile\AppData\Local\ms-playwright\chromium-1169\chrome-win\chrome.exe
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import {test,expect} from '@playwright/test';
   2 | import { productSearch } from '../pages/porductSearch';
   3 | import { waitFor } from '../pages/waitFor';
   4 | import { navBarMenu } from '../pages/navBarMenu';
   5 | import inputData from '../data/input.json' assert { type : 'json' };
   6 | import { getPorductDetails } from '../pages/getPorductDetails';
   7 | import { cartPage } from '../pages/cartPage';
   8 | import {writingOutput} from '../pages/writingOutput';
   9 |
  10 |
  11 |
> 12 | test('bookShelves',async ({page}) => {
     |     ^ Error: browserType.launch: Executable doesn't exist at C:\Windows\system32\config\systemprofile\AppData\Local\ms-playwright\chromium-1169\chrome-win\chrome.exe
  13 |     //object creation
  14 |     const book = new productSearch(page);
  15 |     const wait = new waitFor(page);
  16 |     const navMenu = new navBarMenu(page);
  17 |     const getDetails = new getPorductDetails(page);
  18 |     const xl = new writingOutput(page);
  19 |     
  20 |     await book.loadURL();
  21 |     await book.selectProductType(inputData.productName);
  22 |     await book.popupHandle();
  23 |     await book.includeOutOfStock();
  24 |     await wait.waitingTime();
  25 |     await book.setPrice(inputData.price);
  26 |     await book.selectStorageType(inputData.type);
  27 |     await book.sortyBy(inputData.sortyByValue);
  28 |     await navMenu.getValueOfMenu(inputData.menuName);
  29 |     
  30 |     await getDetails.getDetails(inputData.noOfProdcuts);
  31 |     await wait.waitingTime();
  32 |     await book.selectProduct();
  33 |     const cart = new cartPage(book.newPage);
  34 |     
  35 |     await wait.waitingTime();
  36 |     await cart.addToCart();
  37 |     await cart.checkOut();
  38 |     
  39 |     await cart.enterEmail();
  40 |     await cart.enterPincode();
  41 |     await cart.validateEmail();
  42 |     await cart.validatePinCode();
  43 |     
  44 |
  45 |     const result = {
  46 |         menuItems: navMenu.menuItems,
  47 |         products: getDetails.products,
  48 |         emailErrors: cart.emailerr,
  49 |         pinErrors: cart.pinerr
  50 |     };
  51 |     xl.writeJson(result);
  52 |
  53 |     const menuItems = result.menuItems.map(item => ({
  54 |         mainItem: item.mainItem,
  55 |         subItems: item.subItems.join(', ')
  56 |     }));
  57 |     await xl.createAppend(menuItems,inputData.menuName);
  58 |     const products = result.products.map(product => ({
  59 |         product_Name: product.Name,
  60 |         Product_Price: product.Price
  61 |     }));
  62 |     await xl.createAppend(products,inputData.productName);
  63 |     
  64 |     const errors = [
  65 |         {
  66 |             EmailErrors: result.emailErrors,
  67 |             PincodeErrors: result.pinErrors
  68 |         }
  69 |     ];
  70 |     await xl.createAppend(errors,"Validaton");
  71 |     await xl.writeExcel();
  72 |     
  73 | });
```
# Test info

- Name: main >> raja
- Location: C:\Users\2398035\OneDrive - Cognizant\Desktop\HACKATHON\tests\urbanLader.spec.js:35:7

# Error details

```
Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
If you would like to reuse a single page between tests, create context manually with browser.newContext(). See https://aka.ms/playwright/reuse-page for details.
If you would like to configure your page before each test, do that in beforeEach hook instead.
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
  10 | test.describe('main', () => {
  11 |   let book, wait, navMenu, getDetails, xl, cart;
  12 |
  13 |   test.beforeAll(async ({ page }) => {
  14 |     book = new productSearch(page);
  15 |     wait = new waitFor(page);
  16 |     navMenu = new navBarMenu(page);
  17 |     getDetails = new getProductDetails(page);
  18 |     xl = new writingOutput(page);
  19 |   });
  20 |
  21 |   test('bookShelves', async ({ page }) => {
  22 |     await book.loadURL();
  23 |     await wait.waitingURL(book.url);
  24 |     await book.selectProductType(inputData.productName);
  25 |     await book.popupHandle();
  26 |     await book.includeOutOfStock();
  27 |     await wait.waitingTime();
  28 |     await book.setPrice(inputData.price);
  29 |     await book.selectStorageType(inputData.type);
  30 |     await book.sortBy(inputData.sortByValue);
  31 |     await getDetails.getDetails(inputData.noOfProducts);
  32 |     await wait.waitingLoad();
  33 |   });
  34 |
> 35 |   test('raja', async ({ page }) => {
     |       ^ Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
  36 |     await book.loadURL();
  37 |     await navMenu.getValueOfMenu(inputData.menuName);
  38 |   });
  39 |
  40 |   test('janani', async ({ page }) => {
  41 |     await book.loadURL();
  42 |     await book.searchProduct('birthday');
  43 |     await book.selectProduct();
  44 |     cart = new cartPage(book.newPage);
  45 |     await wait.waitingLoad();
  46 |
  47 |     await cart.addToCart();
  48 |     await cart.checkOut();
  49 |     
  50 |     await cart.enterEmail();
  51 |     await cart.enterPincode();
  52 |     await cart.validateEmail();
  53 |     await cart.validatePinCode();
  54 |   });
  55 |
  56 |   test.afterAll(async () => {
  57 |     const result = {
  58 |       menuItems: navMenu.menuItems,
  59 |       products: getDetails.products,
  60 |       emailErrors: cart.emailerr,
  61 |       pinErrors: cart.pinerr
  62 |     };
  63 |     xl.writeJson(result);
  64 |
  65 |     const menuItems = result.menuItems.map(item => ({
  66 |       mainItem: item.mainItem,
  67 |       subItems: item.subItems.join(', ')
  68 |     }));
  69 |     await xl.createAppend(menuItems, inputData.menuName);
  70 |     const products = result.products.map(product => ({
  71 |       product_Name: product.Name,
  72 |       Product_Price: product.Price
  73 |     }));
  74 |     await xl.createAppend(products, inputData.productName);
  75 |
  76 |     const errors = [
  77 |       {
  78 |         EmailErrors: result.emailErrors,
  79 |         PincodeErrors: result.pinErrors
  80 |       }
  81 |     ];
  82 |     await xl.createAppend(errors, 'Validation');
  83 |     await xl.writeExcel();
  84 |   });
  85 | });
  86 |
```
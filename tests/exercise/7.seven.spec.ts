import { test, expect } from '@playwright/test';

test.describe('Razer.com shopping cart', () => {

/**
  **Criteria:** As a https://www.razer.com/ online store customer I would like to add an Exclusive product to my 
  shopping cart and change the quantity of the item in my cart and verify that the price is updated accordingly.

  note:  an EXCLUSIVE item has an orange tag on the product image as seen in the image attached.
*/

  test('is able to update quantity of exclusive item', async ({ page }) => {
    await page.goto("https://www.razer.com/store");

    /*
    * get the exclusives section. there is multiples (the parent and it's children sections) in this case 
    * we want the parent section
    */
    const exclusivesSection = page.locator('#exclusives', { hasText: "RAZER EXCLUSIVES"}).first();

    const firstItem = exclusivesSection.locator('li', { hasText: "EXCLUSIVE" }).first();
    const itemSku = await firstItem.getAttribute('data-sku');

    const itemBuyBtn = firstItem.locator('a', { hasText: "Buy"});
    await itemBuyBtn.scrollIntoViewIfNeeded();
    await itemBuyBtn.click();

    // in product details
    // wait for add to cart selector to load
    const addToCartBtn = await page.waitForSelector(`#mm-add-to-cart_${itemSku}`);
    const productName = await page.locator('h1[class="product-name"]').textContent();
    await addToCartBtn.scrollIntoViewIfNeeded();
    await addToCartBtn.click();

    // in checkout page
    const productCartItem = page.locator('div', { has: page.locator('span', { hasText: productName!! })});
    const removeItemBtn = productCartItem.getByLabel('Remove item from cart');
    const addItemBtn = productCartItem.getByLabel('Increase quantity of item');
    const reduceItemBtn = productCartItem.getByLabel('Reduce quantity of item');
    const itemQuantityElement = productCartItem.locator('div[class="cart-quantity"]');
    let itemQuantity = await itemQuantityElement.textContent();
    const priceElement = productCartItem.getByLabel('Product price');
    const originalPrice = await priceElement.textContent();


    //assert some conditions on initial cart state
    await expect(removeItemBtn).toBeVisible();
    await expect(addItemBtn).toBeVisible();
    await expect(reduceItemBtn).not.toBeVisible();
    expect(itemQuantity).toContain('1')

    //update item quantity and assert updates
    await addItemBtn.click();
    itemQuantity = await itemQuantityElement.textContent();

    //forced to use waitForTimeout as price is not updated immediatly. is there a better way here?
    await page.waitForTimeout(2000)
    const quantityUpdatedPrice = await priceElement.textContent();

    await reduceItemBtn.waitFor({state: "visible"})
    await expect(removeItemBtn).not.toBeVisible();
    expect(itemQuantity).toContain('2')
    expect(originalPrice).not.toEqual(quantityUpdatedPrice)

  });
});

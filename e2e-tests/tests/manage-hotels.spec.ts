import { test, expect } from '@playwright/test';
import path from 'path';




const UI_URL= "http://localhost:5173/";




test.beforeEach(async({page})=>{
    await page.goto(UI_URL);

    // get the sign in button
    await page.getByRole("link", {name: "Sign In"}).click();
  
    await expect(page.getByRole("heading",{name: "Sign In"} )).toBeVisible();
  
    // fill out the form
  
    await page.locator("[name=email]").fill("test3@gmail.com");
    await page.locator("[name=password]").fill("123456");
  
    await page.getByRole("button", {name:"Login"}).click();
  
    await expect(page.getByText("Sign In Successful!")).toBeVisible();
   
  
});



test("should allow user to add a hotel", async({page})=>{
    await page.goto(`${UI_URL}add-hotel`);


    await page.locator("[name=name]").fill("Test Hotel");
    await page.locator("[name=city]").fill("Test City");
    await page.locator("[name=country]").fill("Test Country");
    await page.locator("[name=description]").fill("this is the description for test");
    await page.locator("[name=pricePerNight]").fill("100");

    await page.selectOption('select[name="starRating"]', "3");

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wi-Fi").check();
    await page.getByLabel("Spa").check();

    await  page.locator("[name='adultCount']").fill("2");
    await  page.locator("[name='childCount']").fill("4");

    await page.setInputFiles('[name="imageFiles"]' , [
        path.join(__dirname, "files", "img1.jpeg"),
        path.join(__dirname, "files", "img2.png"),
    ]); 

    await page.getByRole("button", {name: "Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();

});

    
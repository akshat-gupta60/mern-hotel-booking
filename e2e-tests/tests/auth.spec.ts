import { test, expect } from '@playwright/test';


const UI_URL= "http://localhost:5173/";


test('should allow the user to sign in', async ({ page }) => {
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


test('should allow the user to register', async ({ page }) => {

  const testEmail= `test${Math.floor(Math.random()*1000)}@gmail.com`
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", {name: "Sign In"}).click();

  await page.getByRole("link", {name: "Sign In"}).click();
  await page.getByRole("link", {name: "Create an account here"}).click();
  await expect(page.getByRole("heading", {name: "Create an Account"})).toBeVisible();


  await page.locator("[name=firstName]").fill("Test6");
  await page.locator("[name=lastName]").fill("Test6");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  await page.getByRole("button", {name:"Create Account"}).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("link", {name:"My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name:"Sign Out"})).toBeVisible();



  


  

});



 
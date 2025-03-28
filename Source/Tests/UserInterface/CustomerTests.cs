﻿// Generated by Selenium IDE
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Interactions;
using SeleniumExtras.WaitHelpers;
using NUnit.Framework;
using UserInterface;
[TestFixture]
public class CustomersFunctionalityTest
{
    private IWebDriver driver;
    private WebDriverWait wait;
    public IDictionary<string, object> vars { get; private set; }
    private IJavaScriptExecutor js;
    [SetUp]
    public void SetUp()
    {
        driver = new ChromeDriver();
        js = (IJavaScriptExecutor)driver;
        vars = new Dictionary<string, object>();
        driver.Manage().Window.Maximize();
        wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
        PerformLogin();
    }
    [TearDown]
    protected void TearDown()
    {
        driver.Quit();
    }

    //handle login prior to tests running
    private void PerformLogin()
    {
        // Navigate to the login page
        driver.Navigate().GoToUrl(Settings.BaseURL + "/index.cshtml?name=PQViewCustomers");

        // Input username
        driver.FindElement(By.Id("username")).SendKeys(Settings.adminUsername);

        // Input password
        driver.FindElement(By.Id("password")).SendKeys(Settings.adminPassword);

        // Click login button
        driver.FindElement(By.Id("login")).Click();

        // Optional: Verify login success
        var metersPageLoad = driver.FindElements(By.LinkText("Customers"));
        var foundCustomers = driver.FindElements(By.XPath("//p"));
    }

    [Test]
    public void customersaSorting()
    {
        // Name filter via title
        IWebElement nameSort = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/thead/tr/th[1]")));
        nameSort.Click();

        // Arrow present
        wait.Until(ExpectedConditions.ElementExists(By.XPath("//th[1]/div")));
        var arrowPresent = driver.FindElements(By.XPath("//th[1]/div"));
        Assert.That(arrowPresent.Count > 0);

        //name filter via arrow
        IWebElement nameArrowSort = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//th[1]/div")));
        nameArrowSort.Click();

        // Customer key filter
        IWebElement customerKeyFilter = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//th[2]/div")));
        customerKeyFilter.Click();

        // Arrow moved with new filter
        wait.Until(ExpectedConditions.ElementExists(By.XPath("//th[2]/div")));
        var customerArrow = driver.FindElements(By.XPath("//th[2]/div"));
        Assert.That(customerArrow.Count > 0);

        // Customer key filter back
        IWebElement customerKeyFilterBack = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//th[2]/div[2]")));
        customerKeyFilterBack.Click();

        // Phone filter
        IWebElement phoneFilter = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//th[3]/div")));
        phoneFilter.Click();

        // Arrow moved with new filter
        wait.Until(ExpectedConditions.ElementExists(By.XPath("//th[3]/div")));
        var phoneArrow = driver.FindElements(By.XPath("//th[3]/div"));
        Assert.That(phoneArrow.Count > 0);

        // Phone filter back
        IWebElement phoneFilterBack = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//th[3]/div")));
        phoneFilterBack.Click();

        // Description filter
        IWebElement descFilter = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//th[4]/div")));
        descFilter.Click();

        // Arrow moved with new filter
        wait.Until(ExpectedConditions.ElementExists(By.XPath("//th[4]/div")));
        var descArrow = driver.FindElements(By.XPath("//th[4]/div"));
        Assert.That(descArrow.Count > 0);

        // Description filter back
        IWebElement descFilterBack = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//th[4]/div")));
        descFilterBack.Click();

        // LSCVS filter
        IWebElement lcvsFilter = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//th[5]/div")));
        lcvsFilter.Click();

        // Arrow moved with new filter
        wait.Until(ExpectedConditions.ElementExists(By.XPath("//th[5]/div")));
        var lcvsArrow = driver.FindElements(By.XPath("//th[5]/div"));
        Assert.That(lcvsArrow.Count > 0);

        // Filter by LSCVS
        IWebElement lcvsFilterBack = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//th[5]/div")));
        lcvsFilterBack.Click();
    }
    [Test]
    public void customersbInfoPresent()
    {

        // Search and Actions Navbar
        wait.Until(ExpectedConditions.ElementExists(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav")));
        var searchAndActions = driver.FindElements(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav"));
        Assert.That(searchAndActions.Count > 0);

        // Searchbar
        wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[1]/fieldset/form/div/div[1]/div/input")));
        var searchbar = driver.FindElements(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[1]/fieldset/form/div/div[1]/div/input"));
        Assert.That(searchbar.Count > 0);

        // Filter button
        wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[1]/fieldset/form/div/div[2]/button")));
        var filterBtn = driver.FindElements(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[1]/fieldset/form/div/div[2]/button"));
        Assert.That(filterBtn.Count > 0);
        
        // Add customer btn
        wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[2]/fieldset/div[1]/button")));
        var customerBtn = driver.FindElements(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[2]/fieldset/div[1]/button"));
        Assert.That(customerBtn.Count > 0);

        // External db btn
        wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[2]/fieldset/div[2]/button")));
        var externalDbBtn = driver.FindElements(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[2]/fieldset/div[2]/button"));
        Assert.That(externalDbBtn.Count > 0);

        // Found (n) customers
        wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[1]/fieldset/form/div/div[1]/p")));
        var customers = driver.FindElements(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[1]/fieldset/form/div/div[1]/p"));
        Assert.That(customers.Count > 0);

        // Customer key 
        wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/thead/tr/th[2]/div")));
        var customerKey = driver.FindElements(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/thead/tr/th[2]/div"));
        Assert.That(customerKey.Count > 0);

        // Phone filter
        wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/thead/tr/th[3]/div")));
        var phoneFilter = driver.FindElements(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/thead/tr/th[3]/div"));
        Assert.That(phoneFilter.Count > 0);

    }
    [Test]
    public void customerscAddCustomerWarnings()
    {

        // Add Customer
        IWebElement addCustomerButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[2]/fieldset/div[1]/button")));
        addCustomerButton.Click();

        // Key warning
        IWebElement keyWarning = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[1]/div")));
        Assert.That(keyWarning.Text, Is.EqualTo("A unique Key of less than 25 characters is required."));

        // Invalid key (25+ characters)
        IWebElement keyInputField = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[1]/input")));
        keyInputField.SendKeys("Lorem ipsum dolor sit amesohufosanfsofsneofoesnf");

        // Key warning
        IWebElement keyWarningAgain = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[1]/div")));
        Assert.That(keyWarningAgain.Text, Is.EqualTo("A unique Key of less than 25 characters is required."));

        // Invalid Name (100+ characters)
        IWebElement nameInputField = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[2]/input")));
        nameInputField.SendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean ma");

        // Name warning (no initial warning since it is not a required field)
        IWebElement nameWarning = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[2]/div")));
        Assert.That(nameWarning.Text, Is.EqualTo("Name must be less than 100 characters."));

        // Invalid number (20+ characters)
        IWebElement numberInputField = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[3]/input")));
        numberInputField.SendKeys("1234567891012161884664");

        // Phone warning (no initial warning since it is not a required field)
        IWebElement phoneWarning = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[3]/div")));
        Assert.That(phoneWarning.Text, Is.EqualTo("Phone must be less than 20 characters."));

        // Save warning
        IWebElement saveButton = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button")));
        Actions builder = new Actions(driver);
        builder.MoveToElement(saveButton).Perform();
    }
    [Test]
    public void customersdAddValidCustomer()
    {
        // Add customer
        IWebElement addCustomerBtn = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/nav/div/ul/li[2]/fieldset/div[1]/button")));
        addCustomerBtn.Click();

        // Key
        IWebElement keyInputField = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[1]/input")));
        keyInputField.SendKeys("Daniel\'s customer key");

        // Name
        IWebElement nameInputField = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[2]/input")));
        nameInputField.SendKeys("Daniel");

        // Phone
        IWebElement numberInputField = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[3]/input")));
        numberInputField.SendKeys("4232342234");

        // PQI Company
        IWebElement companyDropdown = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[4]/select")));
        companyDropdown.FindElement(By.XPath("//option[. = 'Company011']")).Click();

        // PQI Address
        IWebElement addressDropdown = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[5]/select")));
        addressDropdown.FindElement(By.XPath("//option[. = 'None']")).Click();

        // PQI Facility
        IWebElement facilityDropdown = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[6]/select")));
        facilityDropdown.FindElement(By.XPath("//option[. = 'Facility011']")).Click();

        // Description
        IWebElement descField = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[7]/textarea")));
        descField.SendKeys("Star Labs Research");

        // Select LSCVS
        IWebElement selectLCVS = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[8]/input")));
        selectLCVS.Click();

        // Save Customer
        IWebElement save = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button")));
        save.Click();
    }
    [Test]
    public void customerseAddinginformation()
    {
        // Select Customer
        IWebElement selectCustomer = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/tbody/tr[4]/td[1]")));
        selectCustomer.Click();

        // Confirm correct customer loaded
        IWebElement customerHeader = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/div[1]/h2")));
        Assert.That(customerHeader.Text, Is.EqualTo("Daniel"));

        // Change key
        IWebElement changeKey = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[2]/div[1]/div[1]/input")));
        changeKey.SendKeys("1");

        // Clear Changes
        IWebElement clear = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[3]/div[2]/button")));
        clear.Click();

        // Change name
        IWebElement changeName = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[2]/div[1]/div[2]/input")));
        changeName.SendKeys("1");

        // Update customer info
        IWebElement update = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[3]/div[1]/button")));
        update.Click();
    }
    [Test]
    public void customersEditDeletenote()
    {
        // Select Customer
        IWebElement selectCustomer = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/tbody/tr[4]/td[1]")));
        selectCustomer.Click();

        // Confirm correct customer loaded
        IWebElement customerHeader = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/div[1]/h2")));
        Assert.That(customerHeader.Text, Is.EqualTo("Daniel1"));

        // Navigate to notes tab
        IWebElement notesTab = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/ul/li[2]/a")));
        notesTab.Click();

        // Adding note
        IWebElement noteTextarea = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[2]/div[2]/div/div/textarea")));
        noteTextarea.SendKeys("The flash's secret base is in Star Labs");

        // Add note
        IWebElement addNoteButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[3]/div[1]/button")));
        addNoteButton.Click();

        // Edit note
        IWebElement editNoteButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[2]/div[1]/table/tbody/tr/td[4]/button[1]/span")));
        editNoteButton.Click();

        // Cancel edit 
        IWebElement cancelEditButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button[2]")));
        cancelEditButton.Click();

        // Edit again
        IWebElement editNoteButtonAgain = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[2]/div[1]/table/tbody/tr/td[4]/button[1]/span")));
        editNoteButtonAgain.Click();

        // Add text to note
        IWebElement noteTextareaAgain = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div/textarea")));
        noteTextareaAgain.SendKeys("?");

        // Save note
        IWebElement saveNoteButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button[1]")));
        saveNoteButton.Click();

        // Delete note
        IWebElement deleteNoteButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[2]/div[1]/table/tbody/tr/td[4]/button[2]/span")));
        deleteNoteButton.Click();
    }
    [Test]
    public void customersfAdditionalFields()
    {
        // Select Customer
        IWebElement selectCustomer = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/tbody/tr[4]/td[1]")));
        selectCustomer.Click();

        // Confirm correct customer loaded
        IWebElement customerHeader = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/div[1]/h2")));
        Assert.That(customerHeader.Text, Is.EqualTo("Daniel1"));

        // Additional fields tab
        IWebElement additionalFieldsTab = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/ul/li[3]/a")));
        additionalFieldsTab.Click();

        // Add value
        IWebElement addValueInput = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[2]/table/tbody/tr/td[6]/div/input")));
        addValueInput.SendKeys("2");

        // Reset
        IWebElement resetButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[3]/div[2]/button")));
        resetButton.Click();

        // Add value
        IWebElement addValueInputAgain = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//input")));
        addValueInputAgain.SendKeys("22");

        // Update
        IWebElement updateButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[3]/div[1]/button")));
        updateButton.Click();
    }
    [Test]
    public void customersgAssignedmeters()
    {
        // Select Customer
        IWebElement selectCustomer = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/tbody/tr[4]/td[1]")));
        selectCustomer.Click();

        // Confirm correct customer loaded
        IWebElement customerHeader = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/div[1]/h2")));
        Assert.That(customerHeader.Text, Is.EqualTo("Daniel1"));

        // Navigate to Assigned Meters
        IWebElement assignedMetersTab = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/ul/li[4]/a")));
        assignedMetersTab.Click();

        // Add Meters
        IWebElement addMetersButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[3]/div/button")));
        addMetersButton.Click();

        // Add Current List to Selection
        IWebElement addCurrentListSelection = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[11]/div[1]/div/div/div[2]/div[1]/div/div/nav/div/ul/li[2]/fieldset/form/div[1]/div")));
        addCurrentListSelection.Click();

        // Remove button
        IWebElement removeButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[11]/div[1]/div/div/div[2]/div[1]/div/div/nav/div/ul/li[2]/fieldset/form/div[2]/div")));
        removeButton.Click();

        // Add meter from list
        IWebElement addMeterFromList = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[11]/div[1]/div/div/div[2]/div[2]/div[1]/table/tbody/tr[1]/td[1]")));
        addMeterFromList.Click();

        // Save
        IWebElement saveButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[11]/div[1]/div/div/div[3]/button[1]")));
        saveButton.Click();
    }
    [Test]
    public void customershAssignedAssets()
    {
        // Select Customer
        IWebElement selectCustomer = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/tbody/tr[4]/td[1]")));
        selectCustomer.Click();

        // Confirm correct customer loaded
        IWebElement customerHeader = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/div[1]/h2")));
        Assert.That(customerHeader.Text, Is.EqualTo("Daniel1"));

        // Navigate to assigned assets
        IWebElement assignedAssetsTab = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/ul/li[5]/a")));
        assignedAssetsTab.Click();

        // Delete asset
        IWebElement deleteAssetButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[2]/div/table/tbody/tr[1]/td[4]/button")));
        deleteAssetButton.Click();

        // Confirm asset deletion
        IWebElement deleteAsset = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[7]/div[1]/div/div/div[3]/button[1]")));
        deleteAsset.Click();

        // Add asset button
        IWebElement addAssetButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[3]/div/div[3]/div/button")));
        addAssetButton.Click();

        // Add Current List to Selection button
        IWebElement addCurrentListSelectionButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[11]/div[1]/div/div/div[2]/div[1]/div/div/nav/div/ul/li[2]/fieldset/form/div[1]/div")));
        addCurrentListSelectionButton.Click();

        // Remove All button
        IWebElement removeAllButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[11]/div[1]/div/div/div[2]/div[1]/div/div/nav/div/ul/li[2]/fieldset/form/div[2]/div")));
        removeAllButton.Click();

        // Add asset from table
        IWebElement addAssetFromTable = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[11]/div[1]/div/div/div[2]/div[2]/div[1]/table/tbody/tr[1]/td[1]")));
        addAssetFromTable.Click();

        // Save button
        IWebElement saveButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[11]/div[1]/div/div/div[3]/button[1]")));
        saveButton.Click();
    }
    [Test]
    public void customersiDeleteCustomer()
    {
        // Select Customer
        IWebElement selectCustomer = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/table/tbody/tr[4]/td[1]")));
        selectCustomer.Click();

        // Confirm correct customer loaded
        IWebElement customerHeader = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/div[1]/h2")));
        Assert.That(customerHeader.Text, Is.EqualTo("Daniel1"));

        // Delete Customer
        IWebElement deleteCustomerButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/div[2]/button")));
        deleteCustomerButton.Click();

        // Cancel button
        IWebElement cancelButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[5]/div[1]/div/div/div[3]/button[2]")));
        cancelButton.Click();

        // Delete Customer again
        IWebElement deleteCustomerButtonAgain = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[1]/div[2]/button")));
        deleteCustomerButtonAgain.Click();

        // Confirm delete button
        IWebElement confirmDeleteButton = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[5]/div[1]/div/div/div[3]/button[1]")));
        confirmDeleteButton.Click();
    }
}

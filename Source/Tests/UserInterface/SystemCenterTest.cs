// Generated by Selenium IDE
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
[TestFixture]
public class SystemCenterTest
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
        driver.Navigate().GoToUrl("https://systemcenter.demo.gridprotectionalliance.org/index.cshtml?name=Settings&System=SystemCenter");

        // Input username
        driver.FindElement(By.Id("username")).SendKeys("Admin");

        // Input password
        driver.FindElement(By.Id("password")).SendKeys("7h1515457r0ngP455w0rd");

        // Click login button
        driver.FindElement(By.Id("login")).Click();

        // Optional: Verify login success
        var correctPage = driver.FindElements(By.LinkText("System Center"));
        var foundPElement = driver.FindElements(By.XPath("//p"));
    }

    [Test]
    public void systemCenteraInfoPresent()
    {
        // Wait for and assert that the table with data is displayed
        IWebElement tableWithData = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div[2]")));
        Assert.That(tableWithData.Displayed);

        // Wait for and assert that the toolbar is displayed
        IWebElement toolbar = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/nav")));
        Assert.That(toolbar.Displayed);

        // Wait for and assert that the search bar is displayed
        IWebElement searchBar = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/nav/div/ul/li/fieldset/form/div/div/div/input")));
        Assert.That(searchBar.Displayed);

        // Wait for and assert that the "Found n settings" text is displayed
        IWebElement foundSettingsText = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/nav/div/ul/li/fieldset/form/div/div/p")));
        Assert.That(foundSettingsText.Displayed);

        // Wait for and assert that the "Add filter" button is displayed
        IWebElement addFilterButton = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/nav/div/ul/li/fieldset/form/div/div[2]/button")));
        Assert.That(addFilterButton.Displayed);

        // Wait for and assert that the "Add Setting" button is displayed
        IWebElement addSettingButton = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/nav/div/ul/li[2]/fieldset/form/button")));
        Assert.That(addSettingButton.Displayed);
    }
    [Test]
    public void systemCenterbAddSetting()
    {
        // Wait for and click the "Add Setting" button
        IWebElement addSettingButton = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/nav/div/ul/li[2]/fieldset/form/button")));
        addSettingButton.Click();

        // Wait for and assert that the name warning is displayed
        IWebElement nameWarning = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[1]/div")));
        Assert.That(nameWarning.Text, Is.EqualTo("A unique Setting Name is required."));

        // Wait for and enter the setting name
        IWebElement nameField = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[2]/div/div/div/input")));
        nameField.SendKeys("ATestSetting");

        // Wait for and assert that the name warning is gone
        IWebElement nameWarningGone = wait.Until(ExpectedConditions.ElementExists(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div/div/div[1]/div")));
        Assert.That(nameWarningGone.Text, Is.Not.EqualTo("A unique Setting Name is required."));

        // Wait for and click the "Save" button
        IWebElement saveButton = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button")));
        saveButton.Click();
    }
    [Test]
    public void systemCentercEditSetting()
    {
        // Wait for and click the first item in the table (test setting)
        IWebElement firstItemInTable = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div[2]/table/tbody/tr/td")));
        firstItemInTable.Click();

        // Wait for and confirm that the correct setting is loaded
        IWebElement settingHeader = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//h4[contains(text(), 'Edit ATestSetting')]")));
        Assert.That(settingHeader.Text, Is.EqualTo("Edit ATestSetting"));

        // Wait for and add the current value
        IWebElement textArea = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//textarea")));
        textArea.SendKeys("1");

        // Wait for and click the "Save" button
        IWebElement saveButton = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button[1]")));
        saveButton.Click();
    }
    [Test]
    public void systemCenterDeleteSetting()
    {
        // Wait for and click the first item in the table (test setting)
        IWebElement firstItemInTable = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div[2]/table/tbody/tr/td")));
        firstItemInTable.Click();

        // Wait for and confirm that the correct setting is loaded
        IWebElement settingHeader = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//h4[contains(text(), 'Edit ATestSetting')]")));
        Assert.That(settingHeader.Text, Is.EqualTo("Edit ATestSetting"));

        // Wait for and click the "Delete" button
        IWebElement deleteButton = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button[2]")));
        deleteButton.Click();

        // Wait for and confirm the deletion by clicking the confirm button
        IWebElement confirmDeleteButton = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[10]/div[1]/div/div/div[3]/button[1]")));
        confirmDeleteButton.Click();
    }
    [Test]
    public void systemCenterEditSystemCenterVal()
    {
        // Wait for and assert that the "Device Health Report" link is present
        IWebElement deviceHealthReportLink = wait.Until(ExpectedConditions.ElementIsVisible(By.LinkText("Device Health Report")));
        Assert.That(driver.FindElements(By.LinkText("Device Health Report")).Count > 0);

        // Wait for and click into "SystemCenter.ShowDeviceHealthReport"
        IWebElement systemCenterReport = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div[2]/table/tbody/tr[20]/td")));
        systemCenterReport.Click();

        // Wait for and change the value to 0
        IWebElement textArea = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//textarea")));
        textArea.Clear();  // Clear the current value (which is 1)
        textArea.SendKeys("0");  // Enter the new value, which is 0

        // Wait for and click the "Save" button
        IWebElement saveButton = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button[1]")));
        saveButton.Click();

        // Wait for and assert that the "Device Health Report" link is not present
        wait.Until(ExpectedConditions.InvisibilityOfElementLocated(By.LinkText("Device Health Report")));
        Assert.That(driver.FindElements(By.LinkText("Device Health Report")).Count == 0);

        // Wait for and click into "SystemCenter.ShowDeviceHealthReport"
        systemCenterReport = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div[2]/table/tbody/tr[20]/td")));
        systemCenterReport.Click();

        // Wait for and change the value back to 1
        textArea = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//textarea")));
        textArea.Clear();  // Clear the current value (which is 0)
        textArea.SendKeys("1");  // Enter the new value, which is 1

        // Wait for and click the "Save" button
        saveButton = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button[1]")));
        saveButton.Click();

        // Wait for and assert that the "Device Health Report" link is present again
        deviceHealthReportLink = wait.Until(ExpectedConditions.ElementIsVisible(By.LinkText("Device Health Report")));
        Assert.That(driver.FindElements(By.LinkText("Device Health Report")).Count > 0);
    }
}
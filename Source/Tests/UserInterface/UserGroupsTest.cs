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
using System.Xml.Linq;
using UserInterface;
[TestFixture]
public class UserGroupsTest {
  private IWebDriver driver;
    private WebDriverWait wait;
    public IDictionary<string, object> vars {get; private set;}
  private IJavaScriptExecutor js;
  [SetUp]
  public void SetUp() {
    driver = new ChromeDriver();
    js = (IJavaScriptExecutor)driver;
    vars = new Dictionary<string, object>();
        driver.Manage().Window.Maximize();
        wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
        PerformLogin();
    }
  [TearDown]
  protected void TearDown() {
    driver.Quit();
  }

    //handle login prior to tests running
    private void PerformLogin()
    {
        // Navigate to the login page
        driver.Navigate().GoToUrl(Settings.BaseURL + "/index.cshtml?name=Groups");

        // Input username
        driver.FindElement(By.Id("username")).SendKeys(Settings.adminUsername);

        // Input password
        driver.FindElement(By.Id("password")).SendKeys(Settings.adminPassword);

        // Click login button
        driver.FindElement(By.Id("login")).Click();

        // Optional: Verify login success
        var correctPage = driver.FindElements(By.LinkText("User Groups"));
        var foundPElement = driver.FindElements(By.XPath("//p"));
    }

    [Test]
  public void userGroupsaInfoPresent() {
        // Wait for and assert that the table with data is displayed
        IWebElement tableWithData = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div[2]/div/table/tbody")));
        Assert.That(tableWithData.Displayed);

        // Wait for and assert that the toolbar is displayed
        IWebElement toolbar = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/div/nav")));
        Assert.That(toolbar.Displayed);

        // Wait for and assert that the Add Filter button is displayed
        IWebElement addFilterBtn = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/div/nav/div/ul/li/fieldset/form/div/div[2]/button")));
        Assert.That(addFilterBtn.Displayed);

        // Wait for and assert that the Add Group button is displayed
        IWebElement addGroupBtn = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/div/nav/div/ul/li[2]/fieldset/form/button")));
        Assert.That(addGroupBtn.Displayed);

        // Wait for and assert that the search bar is displayed
        IWebElement searchBar = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/div/nav/div/ul/li/fieldset/form/div/div/div/input")));
        Assert.That(searchBar.Displayed);

        // Wait for and assert that the "Found n groups" element is displayed
        IWebElement foundNGroups = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/div/nav/div/ul/li/fieldset/form/div/div/p")));
        Assert.That(foundNGroups.Displayed);
    }
  [Test]
  public void userGroupsbAddGroup() {
        // Wait for and click the Add Group button
        IWebElement addGroupBtn = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[@id='window']/div/div/div/div/div/div/nav/div/ul/li[2]/fieldset/form/button")));
        addGroupBtn.Click();

        // Wait for the Name input field to be visible and enter the name
        IWebElement nameInput = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[2]/form/div/div/div/input")));
        nameInput.SendKeys("A Test Group");

        // Wait for the Description textarea to be visible and enter the description
        IWebElement descriptionTextarea = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//textarea")));
        descriptionTextarea.SendKeys("Test");

        // Wait for the Save button to be clickable and click it
        IWebElement saveBtn = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button")));
        saveBtn.Click();
    }
  [Test]
  public void userGroupscEditGroup() {
        // Wait for and click into the test group
        IWebElement testGroupRow = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[@id='window']/div/div/div/div/div[2]/div/table/tbody/tr[3]/td")));
        testGroupRow.Click();

        // Wait for the name input field to be visible and edit the name
        IWebElement nameInput = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div[3]/div[2]/form/div/div/div/input")));
        nameInput.SendKeys("1");

        // Wait for the Update button to be clickable and click it
        IWebElement updateBtn = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[@id='window']/div/div/div/div/div[3]/div[3]/div/button")));
        updateBtn.Click();

        // Wait for the Users section link to be clickable and navigate to it
        IWebElement usersSectionLink = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[@id='window']/div/div/div/div/div[2]/ul/li[2]/a")));
        usersSectionLink.Click();

        // Wait for the Add Users button to be clickable and click it
        IWebElement addUsersBtn = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[@id='window']/div/div/div/div/div[3]/div[3]/div/button")));
        addUsersBtn.Click();

        // Wait for the Add Current list option to be clickable and click it
        IWebElement addCurrentListOption = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[6]/div[1]/div/div/div[2]/div[1]/div/div/nav/div/ul/li[2]/fieldset/form/div[1]/div")));
        addCurrentListOption.Click();

        // Wait for the Save button to be clickable and click it
        IWebElement saveBtn = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[6]/div[1]/div/div/div[3]/button[1]")));
        saveBtn.Click();

        // Wait for the Roles section link to be clickable and navigate to it
        IWebElement rolesSectionLink = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[@id='window']/div/div/div/div/div[2]/ul/li[3]/a")));
        rolesSectionLink.Click();

        // Wait for the Admin role checkbox to be clickable and select it
        IWebElement adminRoleCheckbox = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[@id='window']/div/div/div/div/div[3]/div[2]/div/div/fieldset/form/ul/li[6]/label/input")));
        adminRoleCheckbox.Click();

        // Wait for the Update button to be clickable and click it
        IWebElement updateRoleBtn = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[@id='window']/div/div/div/div/div[3]/div[3]/div/button")));
        updateRoleBtn.Click();
    }
  [Test]
  public void userGroupsDeleteGroup() {
        // Wait for and click into the test group
        IWebElement testGroupRow = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[@id='window']/div/div/div/div/div[2]/div/table/tbody/tr[3]/td")));
        testGroupRow.Click();

        // Wait for the correct group name to load and confirm
        IWebElement groupNameHeader = wait.Until(ExpectedConditions.ElementIsVisible(By.XPath("//div[@id='window']/div/div/div/div/div/div/h2")));
        Assert.That(groupNameHeader.Text, Is.EqualTo("A Test Group1 (Database)"));

        // Wait for the Delete button to be clickable and click it
        IWebElement deleteBtn = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[@id='window']/div/div/div/div/div/div[2]/button")));
        deleteBtn.Click();

        // Wait for the Confirm Delete button to be clickable and click it
        IWebElement confirmDeleteBtn = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("//div[3]/button")));
        confirmDeleteBtn.Click();
    }
  [Test]
  public void userGroupsSorting() {
        // Name sort
        IWebElement nameSort = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/div/table/thead/tr/th[1]")));
        nameSort.Click();

        // Arrow present
        wait.Until(ExpectedConditions.ElementExists(By.XPath("//th[1]/div")));
        var nameArrow = driver.FindElements(By.XPath("//th[1]/div"));
        Assert.That(nameArrow.Count > 0);

        // Name sort again
        IWebElement nameSortAgain = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/div/table/thead/tr/th[1]")));
        nameSortAgain.Click();

        // Description
        IWebElement desc = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/div/table/thead/tr/th[2]")));
        desc.Click();

        // Arrow present
        wait.Until(ExpectedConditions.ElementExists(By.XPath("//th[2]/div")));
        var keyArrow = driver.FindElements(By.XPath("//th[2]/div"));
        Assert.That(keyArrow.Count > 0);

        // Desc again
        IWebElement descAgain = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/div/table/thead/tr/th[2]")));
        descAgain.Click();

        // Added On
        IWebElement addedOn = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/div/table/thead/tr/th[3]")));
        addedOn.Click();

        // Arrow present
        wait.Until(ExpectedConditions.ElementExists(By.XPath("//th[3]/div")));
        var typeArrow = driver.FindElements(By.XPath("//th[3]/div"));
        Assert.That(typeArrow.Count > 0);

        // Added On again
        IWebElement addedOnAgain = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/div/table/thead/tr/th[3]")));
        addedOnAgain.Click();

        // Created By
        IWebElement created = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/div/table/thead/tr/th[3]")));
        created.Click();

        // Arrow present
        wait.Until(ExpectedConditions.ElementExists(By.XPath("//th[3]/div")));
        var createdArrow = driver.FindElements(By.XPath("//th[3]/div"));
        Assert.That(typeArrow.Count > 0);

        // Created By again
        IWebElement createdBy = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/div/table/thead/tr/th[3]")));
        createdBy.Click();

        // Type
        IWebElement type = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/div/table/thead/tr/th[3]")));
        type.Click();

        // Arrow present
        wait.Until(ExpectedConditions.ElementExists(By.XPath("//th[3]/div")));
        var typeArror = driver.FindElements(By.XPath("//th[3]/div"));
        Assert.That(typeArrow.Count > 0);

        // Created By again
        IWebElement typeAgain = wait.Until(ExpectedConditions.ElementToBeClickable(By.XPath("/html/body/div[1]/div/div/div/div/div[2]/div/table/thead/tr/th[3]")));
        typeAgain.Click();
    }
}

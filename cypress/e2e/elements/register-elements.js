export const REGISTER_ELEMENTS = {
  signInButton: '//a[contains(.,"Sign in")]',
  emailAddressField: '//input[@id="email_create"]',
  createAnAccountButton: '//button[@id="SubmitCreate"]',
  personal: {
    personalMrTitleRadio: '//input[@id="id_gender1"]',
    personalMrsTitleRadio: '//label[contains(.,"Mrs.")]',
    firstNameField: '//input[@id="customer_firstname"]',
    lastNameField: '//input[@id="customer_lastname"]',
    emailField: '//input[@id="email"]',
    passwordField: '//input[@id="passwd"]',
    dayOfBirthField: '//select[@id="days"]',
    monthOfBirthField: '//select[@id="months"]',
    yearOfBirthField: '//select[@id="years"]'
  },
  address: {
    fistNameField: '//input[@id="firstname"]',
    lastNameField: '//input[@id="lastname"]',
    companyField: '//input[@id="company"]',
    addressField: '//p[4]/input[@class="form-control"]',
    addressDetailsField:
      '//p[@class="form-group is_customer_param"]/input[@class="form-control"]',
    cityField: '//input[@id="city"]',
    stateField: '//select[@id="id_state"]',
    zipCode: '//input[@id="postcode"]',
    countryField: '//select[@id="id_country"]',
    additionalInformationTextArea: '//textarea[@id="other"]',
    homePhoneField: '//input[@id="phone"]',
    mobilePhoneField: '//input[@id="phone_mobile"]',
    addressAliasField: '//input[@id="alias"]'
  },
  registerCompleteButton: '//button[@id="submitAccount"]'
}

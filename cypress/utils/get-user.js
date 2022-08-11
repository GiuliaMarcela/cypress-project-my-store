import { faker } from '@faker-js/faker'

const createRandomUser = () => {
  const day = faker.datatype.number({ min: 1, max: 31, precision: 1 })
  const month = faker.datatype.number({ min: 1, max: 12, precision: 1 })
  const year = faker.datatype.number({ min: 1940, max: 2004, precision: 1 })

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    dayOfBirth: day,
    monthOfBirth: month,
    yearOfBirth: year,
    company: faker.company.name(),
    address: faker.address.streetAddress(),
    addressLine2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode('#####'),
    phoneNumber: faker.phone.number('###-###-####'),
    addressAlias: faker.address.cityName(),
    additionalInformation: faker.hacker.phrase()
  }
}

export const randomUser = createRandomUser()

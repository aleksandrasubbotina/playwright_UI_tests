import { faker } from '@faker-js/faker';
import { Address } from '../pages/CheckoutPage';

/**
 * Generates a realistic random address for checkout tests
 */
export function generateRandomAddress(): Address {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode(),
  };
}

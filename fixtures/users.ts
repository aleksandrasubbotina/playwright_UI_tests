import dotenv from 'dotenv';
dotenv.config({ quiet: true });

export const users = {
  validUser: {
    username: process.env.VALID_USER!,
    password: process.env.VALID_PASSWORD!,
  },
  invalidUser: {
    username: 'fake_user',
    password: 'wrong_password',
  },
};

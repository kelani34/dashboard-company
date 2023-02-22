/* eslint-disable */
//The linter has an issue with the email-validator.
import { validate } from "email-validator";
import passwordValidator from "password-validator";

//Validate emails
export { validate as emailValidator };

//Password validation
const passwordValidation = new passwordValidator();
//Current business rules says each password must be at least 8 chars
//If there are any new business rules, add them here.
//See this for examples  https://www.npmjs.com/package/password-validator
passwordValidation.is().min(8); //Must have a password that is a min 8 chars long
export { passwordValidation as passwordEightCharactersValidator };

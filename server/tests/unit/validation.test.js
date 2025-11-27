const { isValidEmail } = require('../../src/utils/validation');

test('isValidEmail returns true for valid emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
});

test('isValidEmail returns false for invalid emails', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
});
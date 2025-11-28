const User = require('../../src/models/User');

describe('User Model Unit Tests', () => {
  it('should match password correctly', async () => {
    // Create a dummy user instance (no DB connection needed for this method)
    const user = new User({ 
      username: 'test', 
      email: 'test@test.com', 
      password: 'mySecretPassword' 
    });

    // Since our simple implementation just compares strings:
    const isMatch = await user.matchPassword('mySecretPassword');
    const isNotMatch = await user.matchPassword('wrongPassword');

    expect(isMatch).toBe(true);
    expect(isNotMatch).toBe(false);
  });
});
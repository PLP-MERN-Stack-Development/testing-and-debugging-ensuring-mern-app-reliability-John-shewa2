const { registerUser, loginUser } = require('../../src/controllers/authController');
const User = require('../../src/models/User');
const { generateToken } = require('../../src/utils/auth');

// Mock dependencies
jest.mock('../../src/models/User');
jest.mock('../../src/utils/auth');

describe('Auth Controller Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      req.body = { username: 'test', email: 'test@example.com', password: '123' };
      // Mock User.findOne to return null (user doesn't exist)
      User.findOne.mockResolvedValue(null);
      // Mock User.create to return new user
      User.create.mockResolvedValue({ _id: '123', username: 'test', email: 'test@example.com' });
      // Mock token generation
      generateToken.mockReturnValue('fake-token');

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        token: 'fake-token'
      }));
    });

    it('should return 400 if user already exists', async () => {
      req.body = { email: 'existing@example.com' };
      User.findOne.mockResolvedValue({ email: 'existing@example.com' });

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });
  });

  describe('loginUser', () => {
    it('should login successfully with correct credentials', async () => {
      req.body = { email: 'test@example.com', password: 'password' };
      const mockUser = {
        _id: '123',
        email: 'test@example.com',
        matchPassword: jest.fn().mockResolvedValue(true) // Mock the model method
      };
      
      User.findOne.mockResolvedValue(mockUser);
      generateToken.mockReturnValue('fake-token');

      await loginUser(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        token: 'fake-token'
      }));
    });

    it('should fail with invalid credentials', async () => {
      req.body = { email: 'test@example.com', password: 'wrong' };
      const mockUser = {
        matchPassword: jest.fn().mockResolvedValue(false)
      };
      
      User.findOne.mockResolvedValue(mockUser);

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
});
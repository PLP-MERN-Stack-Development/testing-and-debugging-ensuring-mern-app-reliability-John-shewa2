const logger = require('../../src/middleware/logger');

describe('Logger Middleware', () => {
    it('should log the request and call next()', () => {
        // mock the dependencies
        const req = { method: 'GET', url: '/test' };
        const res = {};
        const next = jest.fn();
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        // execute the function
        logger(req, res, next);

        // Assert the results
        expect(consoleSpy).toHaveBeenCalledWith('GET /test');
        expect(next).toHaveBeenCalled();
        consoleSpy.mockRestore(); 
    }); 
});
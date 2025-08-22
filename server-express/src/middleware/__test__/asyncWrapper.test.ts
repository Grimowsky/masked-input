import httpMocks from 'node-mocks-http';
import { asyncWrapper } from '../asyncWrapper';

describe('asyncWrapper tests', () => {
    it('should call next with error if promise rejects', async () => {
        const EXPECTED_ERROR = new Error('test error');
        const fn = async (): Promise<void> => {
            throw EXPECTED_ERROR;
        };

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await asyncWrapper(fn)(req, res, next);

        expect(next).toHaveBeenCalledWith(EXPECTED_ERROR);
    });
});

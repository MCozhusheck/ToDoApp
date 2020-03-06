const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const userService = require('../services/user');
const userModel = require('../models/User');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('user ', () => {
    it('can be created correctly', async () => {
        expect(async () => await userService.create(userComplete))
            .not
            .toThrow();
    })
})

const userComplete = {
    name: 'Maciej',
    email: 'jest@jest.com',
    password: 'jestjest',
    tokens: [],
    todos: []
}
const request = require('supertest');
const express = require('express');

// Import the server setup
const app = require('../src/server');

describe('GET /health', () => {
    it('should return status ok', async () => {
        const res = await request('http://localhost:3000').get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'ok');
    });
});

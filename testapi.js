//import library:
var should = require('chai').should(),
Expect = require('chai').expect,
Supertest = require('supertest');

//Constants and Data:

const request = require('supertest')
const {expect} = require('chai')
const baseUrl = 'https://kasir-api.belajarqa.com'
const testData = {
    "name": "Thetamax93 Store",
    "email": "dani.adityatama+001@gmail.com",
    "password": "bukanpassword"
}

//Test Cases:
//Authorization - Registration (Create):
describe ('Authorization - Registration (Positive)', function(){
    const response = request(baseUrl)
    .post ('/registration')
    .send (testData)
    it('response status equal to 201', async () => {
        expect((await response).status).to.equal(201) 
    })
    it('status is showing success', async () => {
        expect((await response).body.status).to.equal("success")
    })
    it('data is equal to registered name and email', async () => {
        expect((await response).body.data.name).to.equal(testData.name)
        expect((await response).body.data.email).to.equal(testData.email)
    })     
})

describe ('Authorization - Registration no password inputted (Negative)', function(){
    const response = request(baseUrl)
    .post ('/registration')
    .send ({
            "name": "Thetamax93 Store",
            "email": "dani.adityatama+001@gmail.com",
            "password": ""
        })
    it('response status equal to 400', async () => {
        expect((await response).status).to.equal(400) 
    })
    it('status is showing fail', async () => {
        expect((await response).body.status).to.equal("fail")
    })     
})

//Authorization - Refresh Token (Update):
//Data:
const testLogin = {
    "email": "dani.adityatama+001@gmail.com",
    "password": "bukanpassword"
}
//Obtain Token:
describe ('Login User', function (){
    const response = request(baseUrl)
    .post('/authentications')
    .send(testLogin)
    it('showing the refresh token', async () => {
        console.log('refresh token: ' + (await response).body.data.refreshToken)
    })
    const refToken = (console.log)
   
    //Test Cases:
    describe ('Authorization - Refresh Token (Positive)', function() {
        const response = request(baseUrl)
        .put ('/authentications')
        .send ({ 
            "refreshToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzMDVhNTZmLTA0NDQtNDE0Yi1iNDNlLTkzMTA2YzRlNDM5MSIsImNvbXBhbnlJZCI6IjEyYTQ3ZDAyLWU5MmMtNDQ4OC1iYzFmLWZmMTM4MWRjYTY3MCIsImlhdCI6MTY3NTk1MDcyM30.Zlt6nUhsmj0dzMlHf_pOGtIq1EUlOqk8kFcOYwKgoow"
        })
        it('response status equal to 200', async () => {
            expect((await response).status).to.equal(200) 
        })
        it('status is showing success', async () => {
            expect((await response).body.status).to.equal("success")
        })
        it('showing the new access token', async () => {
            console.log('access token: ' + (await response).body.data.accessToken)
        })
    })    
    describe ('Authorization - Refresh Token (Negative)', function() {
        const response = request(baseUrl)
        .put ('/authentications')
        .send ({ 
            "refreshToken" : "mbak sri"
    })
        it('response status equal to 400', async () => {
            expect((await response).status).to.equal(400) 
        })
        it('status is showing fail', async () => {
            expect((await response).body.status).to.equal("fail")
        })
    })            
})

//Users - Get User Detail (Get)
const userId = '0305a56f-0444-414b-b43e-93106c4e4391'
const accToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzMDVhNTZmLTA0NDQtNDE0Yi1iNDNlLTkzMTA2YzRlNDM5MSIsImNvbXBhbnlJZCI6IjEyYTQ3ZDAyLWU5MmMtNDQ4OC1iYzFmLWZmMTM4MWRjYTY3MCIsImlhdCI6MTY3NTk0OTI5MX0.kgbundWCSR4XacaTAcGNGu6P9jeH4DBz1Wcb0bwrELk'

//Test Cases:
describe ('Users - Get User Detail (Positive)', function(){
    const response = request(baseUrl)
    .get ('/users/' + (userId))
    .set({ 
        "Authorization": `Bearer ${accToken}` 
    })
    it('response status equal to 200', async () => {
        expect((await response).status).to.equal(200) 
    })
    it('status is showing success', async () => {
        expect((await response).body.status).to.equal("success")
    })
    it('data is equal to registered name and email', async () => {
        expect((await response).body.data.user.name).to.equal(testData.name)
        expect((await response).body.data.user.email).to.equal(testData.email)
    })     
})

describe ('Users - Get User Detail (Negative)', function(){
    const response = request(baseUrl)
    .get ('/users/123456')
    it('response status equal to 401', async () => {
        expect((await response).status).to.equal(401) 
    })
    it('status is showing error "Unauthorized"', async () => {
        expect((await response).body.error).to.equal("Unauthorized")
    })
})

//Authorization - LogOut (Delete):

describe ('Authorization - Logout (Positive)', function() {
    const response = request(baseUrl)
    .del ('/authentications')
    .send ({ 
        "refreshToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzMDVhNTZmLTA0NDQtNDE0Yi1iNDNlLTkzMTA2YzRlNDM5MSIsImNvbXBhbnlJZCI6IjEyYTQ3ZDAyLWU5MmMtNDQ4OC1iYzFmLWZmMTM4MWRjYTY3MCIsImlhdCI6MTY3NTk1MDcyM30.Zlt6nUhsmj0dzMlHf_pOGtIq1EUlOqk8kFcOYwKgoow"
    })
    it('response status equal to 200', async () => {
        expect((await response).status).to.equal(200) 
    })
    it('status is showing success', async () => {
        expect((await response).body.status).to.equal("success")
    })
})    
describe ('Authorization - Logout (Negative)', function() {
    const response = request(baseUrl)
    .put ('/authentications')
    .send ({ 
        "refreshToken" : "mbak sri"
    })
    it('response status equal to 400', async () => {
        expect((await response).status).to.equal(400) 
    })
    it('status is showing fail', async () => {
        expect((await response).body.status).to.equal("fail")
    })
})            
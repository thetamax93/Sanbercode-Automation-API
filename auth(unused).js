const request = require('supertest')
const {expect} = require('chai')
const baseUrl = 'https://kasir-api.belajarqa.com'
const testData = {
    "name": "Thetamax93 Store",
    "email": "dani.adityatama+001@gmail.com",
    "password": "bukanpassword"
}
//UNUSED SCRIPTS
const testLogin = {
    "email": "dani.adityatama+001@gmail.com",
    "password": "bukanpassword"
}
//Obtain Token:

//Test Cases:



describe ('Authorization - Refresh Token (Positive)', function() {
    before('Login User', async () => {
        const response = await chai.request(baseUrl)
        .post('/authentications')
        .send(testLogin)
        token = response.body.data.refreshToken; 
       })
    const response = request(baseUrl)
    .put ('/authentications')
    .send (token)
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


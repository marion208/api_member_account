const request = require("supertest");
const app = require('./../app');

let id_new_member = {};
let id_data_new_member = {};
let token = {};

describe('Adding a new member', () => {
    it('with right informations, should return status 201', async () => {
        const new_member = {
            email_address: 'newmember@newmember.fr',
            password: 'pswd'
        };
        await request(app).post('/api/member/new_account')
            .send(new_member)
            .then((response) => {
                expect(response.status).toBe(201);
                expect(response.body.id_member).toBeGreaterThanOrEqual(1);
                expect(response.body.id_data_member).toBeGreaterThanOrEqual(1);
                expect(response.body.token).not.toBe('');
                expect(response.body.token).not.toBeUndefined();
                id_new_member = response.body.id_member;
                id_data_new_member = response.body.id_data_member;
                token = response.body.token;
            })
    });
    it('with a mail already registered, should return status 400', async () => {
        const new_member = {
            email_address: 'newmember@newmember.fr',
            password: 'pswd'
        };
        await request(app).post('/api/member/new_account')
            .send(new_member)
            .then((response) => {
                expect(response.status).toBe(400);
            })
    });
    it('with empty information, should return status 400', async () => {
        const new_member = {
            email_address: '',
            password: ''
        };
        await request(app).post('/api/member/new_account')
            .send(new_member)
            .then((response) => {
                expect(response.status).toBe(400);
            })
    });
});

describe('Logging', () => {
    it('when wrong password, should return status 401', async () => {
        const member = {
            email_address: 'newmember@newmember.fr',
            password: 'pwd'
        };
        await request(app).post('/api/member/login')
            .send(member)
            .then((response) => {
                expect(response.status).toBe(401);
            })
    });
    it('when right informations, should return status 200', async () => {
        const member = {
            email_address: 'newmember@newmember.fr',
            password: 'pswd'
        };
        await request(app).post('/api/member/login')
            .send(member)
            .then((response) => {
                expect(response.status).toBe(200);
            })
    });
});

describe('Getting the information of the member', () => {
    it('when no authorization, should return status 400', async () => {
        await request(app).get('/api/data_member/' + id_data_new_member)
            .then((response) => {
                expect(response.status).toBe(401);
            })
    });
    it('with right informations, should return status 201', async () => {
        await request(app).get('/api/data_member/' + id_data_new_member)
            .set("Authorization", 'Basic ' + token)
            .then((response) => {
                expect(response.status).toBe(200);
            })
    });
});

describe('Updating the information of the member', () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const currentDate = yyyy + '-' + mm + '-' + dd;
    const updated_member = {
        surname: 'new surname',
        firstname: 'new firstname',
        address_line_1: 'new address line 1',
        address_line_2: 'new address line 2',
        postal_code: 'new postal code',
        city: 'new city',
        updatedAt: currentDate
    };
    it('when no authorization, should return status 400', async () => {
        await request(app).post('/api/data_member/' + id_data_new_member)
            .send(updated_member)
            .then((response) => {
                expect(response.status).toBe(401);
            })
    });
    it('with right informations, should return status 201', async () => {
        await request(app).post('/api/data_member/' + id_data_new_member)
            .send(updated_member)
            .set("Authorization", 'Basic ' + token)
            .then((response) => {
                expect(response.status).toBe(201);
            })
    });
    it('should return new informations updated', async () => {
        await request(app).get('/api/data_member/' + id_data_new_member)
            .set("Authorization", 'Basic ' + token)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.surname).toBe('new surname');
                expect(response.body.firstname).toBe('new firstname');
                expect(response.body.address_line_1).toBe('new address line 1');
                expect(response.body.address_line_2).toBe('new address line 2');
                expect(response.body.postal_code).toBe('new postal code');
                expect(response.body.city).toBe('new city');
                expect(response.body.updatedAt).toBe(currentDate);
            })
    });
});

describe('Deleting a member', () => {
    it('when no authorization, should return status 400', async () => {
        await request(app).delete('/api/member/' + id_new_member)
            .then((response) => {
                expect(response.status).toBe(401);
            })
    });
    it('with right informations, should return status 201', async () => {
        await request(app).delete('/api/member/' + id_new_member)
            .set("Authorization", 'Basic ' + token)
            .then((response) => {
                expect(response.status).toBe(200);
            })
    });
});

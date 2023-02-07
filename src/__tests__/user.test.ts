import supertest from 'supertest';
import {app} from '../app';
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from 'mongoose';

let id:String;

describe('user',()=>{

    beforeAll(async()=>{
        const mongoServer = await MongoMemoryServer.create()

        await mongoose.connect('mongodb+srv://user:user@cluster0.1e7wu.mongodb.net/ineuron?retryWrites=true&w=majority')
    });

    afterAll(async()=>{
        await mongoose.disconnect()
        await mongoose.connection.close()
    });

    //READ ROUTE TEST
    describe('get user route',()=>{
        it('should return a 404',async ()=>{
            await supertest(app).get('/Read').expect(200)
        })

    //READ ROUTE WITH INVALID ENDPOINT
    it('should return a 404',async ()=>{
        await supertest(app).get('/Reading').expect(404)
    })
    });

    //POST ROUTE TEST
    describe('POST/user',()=>{
        it('should save new user to db ', async()=>{
            //DATA YOU WANT TO SAVE IN DB
            const res = await supertest(app)
            .post('/Add')
            .send({
                name:"interview",
                age:10
            })
            id = res.body._id;
            expect(res.statusCode).toEqual(200)
        });
        //IT SHOULD NOT SAVE THE SAME USER NAME TWICE
        it('should NOT save the user that already exists ', async()=>{
            const res = await supertest(app)
            .post('/Add')
            .send({
                name:"interview",
                age:10
            })
            expect(res.statusCode).toEqual(500)
        });

    });

    //Update Route
    describe('PUT/user',()=>{
        it('should UPDATE user in db ', async()=>{
            //DATA YOU WANT TO UPDATE FROM DB
            const res = await supertest(app)
            .put(`/Update/${id}`)
            .send({
                name:"ineuron",
                age:55
            })
            expect(res.statusCode).toBe(200)
        });
        // SHOULD NOT UPDATE DATA WITH INVALID ID
        it('should NOT UPDATE SAME user data ', async()=>{
            const res = await supertest(app)
            .put(`/Update/${"637f0229b097aee61f9793"}`)
            .send({
                name:"ineuron",
                age:55
            })
            expect(res.statusCode).toBe(500)
        });

    });

    //DELETE ALL USER
    describe('DELETE/user',()=>{
        it('should DELETE user from db ', async()=>{
            //DATA YOU WANT TO DELETE FROM DB
            const res = await supertest(app)
            .delete(`/Delete/${id}`)
            expect(res.statusCode).toBe(200)
        });
    });
     // SHOULD NOT DELETE DATA WITH INVALID ID
    it('should NOT DELETE user with INVALID id ', async()=>{
        const res = await supertest(app)
        .delete(`/Delete/637f0229b097aee61f9793`)
        expect(res.statusCode).toBe(500)
    });


})
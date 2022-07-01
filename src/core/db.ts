/* const { MongoClient, ServerApiVersion } = require('mongodb'); */
import { Collection, MongoClient, ObjectId } from 'mongodb';
const dotenv = require('dotenv');
dotenv.config();

const uri: string = process.env.DB_URI ?? '';
console.log(uri);


class DB {
    client: MongoClient;
    usersCol: Collection;

    constructor() {
        this.client = new MongoClient(uri);
        console.log('Connected to DB');
        this.usersCol = this.client.db('exalt').collection('users');
    }

    async userExists(userId: string): Promise<boolean> {
        const user = await this.usersCol.findOne({_id: new ObjectId(userId)});
        return user == null;
    }

    async addUser(userId: string): Promise<boolean> {
        let added = false;
        await this.usersCol.insertOne({
            _id: userId as any,
            weapons: []
        })
        .then(() => { added = true })
        .catch(() => { added = false});
        
        return added;
    }
}

module.exports = new DB();
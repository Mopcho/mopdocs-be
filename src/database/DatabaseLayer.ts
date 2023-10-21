import { Service } from "typedi";
import { PrismaAdapter } from "./services/PrismaAdapter";

@Service()
export class DatabaseLayer {
    constructor(private readonly database: PrismaAdapter) { }

    createUser() {
        return this.database.createUser();
    }

    findUser() {
        return this.database.findUser();
    }
}
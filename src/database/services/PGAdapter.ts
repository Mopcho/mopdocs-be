import { Service } from "typedi";

@Service()
export class PGAdapter {
    // This is just a mock
    private readonly pg = {
        rawQuery(string) {
            return 'some data';
        }
    }

    constructor() { }

    async findUser(searchData?: string) {
        return this.pg.rawQuery(searchData);
    }
}
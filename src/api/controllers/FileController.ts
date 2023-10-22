import { Service } from "typedi";
import { FileService } from "../services/FileService";

@Service()
export class FileController {
    constructor(private fileService: FileService) { }

    public getAll() {
        return this.fileService.find();
    }
}
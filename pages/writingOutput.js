import * as XLSX from 'xlsx';
import fs from 'fs';
exports.writingOutput = class writingOutput {
    constructor(page) {
        this.page = page;
        this.workbook = XLSX.utils.book_new();

    }

    async createAppend(jsonsheet, sheetName) {
        try {

            this.sheet = XLSX.utils.json_to_sheet(jsonsheet);
            XLSX.utils.book_append_sheet(this.workbook, this.sheet, sheetName);

        } catch (error) {
            console.log(error);
        }
    }
    async writeExcel() {
        try {
            XLSX.writeFile(this.workbook, 'data/output.xlsx');
        } catch (error) {
            console.log(error);
        }
    }

    async writeJson(file) {
        try {
            fs.writeFileSync('data/output.json', JSON.stringify(file, null, 2));
        } catch (error) {
            console.log(error)
        }
    }
}
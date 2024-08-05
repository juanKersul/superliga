import { parse } from "@fast-csv/parse";
import { Readable } from "stream";
import * as iconv from "iconv-lite";

export class CSVService {
  async parseCSVStream(stream: Readable, inputEncoding: string = 'ISO-8859-1'): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const rows: any[] = [];

      const convertedStream = stream.pipe(iconv.decodeStream(inputEncoding));

      convertedStream
        .pipe(parse({ headers: ['nombre', 'edad', 'equipo', 'estadoCivil', 'nivelDeEstudios'], delimiter: ';' }))
        .on("data", (row) => {
          rows.push(row);
        })
        .on("end", () => {
          resolve(rows);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}

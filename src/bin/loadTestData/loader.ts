// import { Connection } from "typeorm";
// import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// import { IDbConnector, Connector } from "../../components/db-connector";
// import { Config, ConfigType } from "../../components/config";
// import { jsonDataParser, authorSaver, journalSaver } from "./utils";
// import { JournalParam } from "./types";

// class Loader {
//     protected connection: Connection;
//     private dbConnector: IDbConnector = Connector.getInstance();

//     public async init(): Promise<void> {
//         this.connection = await this.dbConnector.getConnection(<PostgresConnectionOptions>(
//             Config.getInstance().getConfig(ConfigType.Db)
//         ));
//     }

//     public async close(): Promise<void> {
//         await this.dbConnector.closeConnection();
//         process.exit();
//     }

//     public async load(): Promise<void> {
//         await this.init();

//         const parsedData: JournalParam[] = await jsonDataParser('journalData.json');

//         const promises: any = [];
//         parsedData.forEach(item => {
//             promises.push(journalSaver(item))
//         });

//         await Promise.all(promises);

//         await this.close();
//     }

// }

// (async function() {
//     const loader = new Loader();

//     await loader.load()
// })();

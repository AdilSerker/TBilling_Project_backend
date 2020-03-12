import { Client } from 'elasticsearch';
import { ElasticsearchConfig, Config, ConfigType } from '../config';
import { IndexType } from './types';
import * as _ from 'lodash';

const elasticsearchConfig = <ElasticsearchConfig>Config.getInstance().getConfig(ConfigType.ElasticSearch);

export class Elasticsearch {
    public static getInstance() {
        if (!this.instance) {
			this.instance = new Elasticsearch();
		}

		return this.instance;
    }

    private static instance: Elasticsearch;
    private client: Client;

    public constructor() {
        this.client = new Client(elasticsearchConfig);
    }

    public async ping() {
        try {
            await this.client.ping({
                requestTimeout: 1000
            });
            console.info('Elasticsearch is connected');
        } catch (error) {
            console.trace('Elasticsearch cluster is down!');
            console.error(error);
        }
    }

    public async getIndices() {
        return this.client.indices.get({
            index: '_all'
        });
    }

    public async verify() {
        return this.client.cat.indices({
            format: 'json',
            v: true
        });
    }

    public async indexData<T extends { id: string }>(index: string, type: string, data: T[] | T): Promise<any> {
        const arrayData = _.isArray(data) ? data : [data];
        const bulkBody: IndexType[] = arrayData.map(({ id }) => {
            return {
                index: {
                    _index: index,
                    _type: type,
                    _id: id
                }
            }
        });

        return this.client.bulk({ body: bulkBody });
    }

    public async deleteAllIndices() {
        await this.client.indices.delete({
            index: '_all'
        });
    }

}

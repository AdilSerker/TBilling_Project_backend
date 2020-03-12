import { createParamDecorator } from 'routing-controllers';
import { Elasticsearch } from '../elastic/elastic';

/*tslint:disable:function-name*/
export function GetElastic() {
    return createParamDecorator({
        value: action => {
            return Elasticsearch.getInstance();
        }
    });
}
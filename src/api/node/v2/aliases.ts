import v1Aliases from '../v1/aliases';
import * as schemas from './aliases.x';


export default {

    getAddress(alias) {
        return v1Aliases.byAlias(alias).then((data) => {
            return schemas.aliasAddressSchema.parse(data);
        });
    }

};

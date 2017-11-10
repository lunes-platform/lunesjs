import Asset from '../../../classes/Asset';
import Money from '../../../classes/Money';


function toObject(array, key) {
    return array.reduce((object, elem) => {
        object[elem[key]] = elem;
        return object;
    }, {});
}


export default {

    balanceListByAssets(balances, assets) {

        const hashMap = toObject(balances, 'id');

        return Promise.all(assets.map((asset) => {
            if (hashMap[asset]) {
                return hashMap[asset];
            } else {
                return Asset.get(asset).then((a) => {
                    return Money.fromCoins('0', a).then((amount) => {
                        return {
                            id: a.id,
                            name: a.name,
                            precision: a.precision,
                            amount: amount
                        };
                    });
                });
            }
        }));

    }

};

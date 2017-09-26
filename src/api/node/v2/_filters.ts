export default {

    assets(assets) {
        return (item) => assets.indexOf(item.id) !== -1;
    }

};

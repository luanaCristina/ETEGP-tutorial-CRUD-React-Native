import AsyncStorage from "@react-native-async-storage/async-storage"

class Database {
    async saveItem(listItem, id) {
        listItem.id = id ? id : new Date().getTime()
        const savedItems = await this.getAllItem();

        if (id) {
            const index = await savedItems.findIndex(item => item.id === id);
            savedItems[index] = listItem;
        }
        else
            savedItems.push(listItem);

        return AsyncStorage.setItem('items', JSON.stringify(savedItems));
    }

    getAllItem() {
        return AsyncStorage.getItem('items').then(response => {
            if (response)
                return Promise.resolve(JSON.parse(response));
            return Promise.resolve([]);
        })
    }

    async getById(id) {
        const savedItems = await this.getAllItem();
        return savedItems.find(item => item.id === id);
    }

    async deleteById(id) {
        let savedItems = await this.getAllItem();
        const index = await savedItems.findIndex(item => item.id === id);
        savedItems.splice(index, 1);
        return AsyncStorage.setItem('items', JSON.stringify(savedItems));
    }
}

export default new Database()
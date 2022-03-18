import AsyncStorage from "@react-native-async-storage/async-storage"

class Database {
    async saveItem(listItem) {
        listItem.id = new Date().getTime();
        let savedItems = [];
        const response = await AsyncStorage.getItem('items');

        if (response) savedItems = JSON.parse(response);
        savedItems.push(listItem);

        console.log(savedItems)

        return AsyncStorage.setItem('items', JSON.stringify(savedItems));
    }
}

export default new Database()
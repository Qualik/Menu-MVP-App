
const { log, clear, dir } = console;

/*************************************************************
 * PROGRAMMING - THE CLASS THAT CREATES THE DATA RECORDS
 **************************************************************/

class MenuItem {
    // Function to make IDs
    static uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
            c
        ) {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    // Schema: name (string), price (number), stock (number), description (string), tags ([string])
    constructor(data) {
        // here the data is passed grouped as an object, rather than indivually in order
        const { name, price, stock = 0, description = "", tags = [] } = data;
        // log(arguments);

        

        this._id = MenuItem.uuidv4();
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.tags = tags;
    }

    validate() {
        //validating the data from the object
        console.log("Validate Data");
    }

}

/*************************************************************
 * PROGRAMMING - THE CLASS THAT CREATES APPS THAT CAN CONTROL SETS OF THOSE RECORDS
 **************************************************************/

class Menu {
    #items = []; // Now a private field, so can't tamper with it from outside this class
    constructor(itemsDataArray = []) {
        if (!Array.isArray(itemsDataArray)) {
            throw new Error(
                `Items must be an array. Received ${itemsDataArray} (${typeof itemsDataArray})`
            );
        }

        for (const itemData of itemsDataArray) {
            this.#items.push(new MenuItem(itemData));
        }
    }

    // GET a item record's INDEX (by id)
    getItemIndex(id) {
        if (typeof id === "undefined") {
            throw new Error(`An id must be provided to getItemIndex`);
        }
        if (typeof id !== "string") {
            throw new Error(
                `The id provided to getItemIndex must be a string. Received ${id}(${typeof id})`
            );
        }
        const index = this.#items.findIndex((item) => {
            return item._id === id;
        });

        if (!~index) {
            log(`Item with _id of ${id} not found`);
        }
        return index;
    }

    // GET a item record
    getItem(id) {
        const index = this.getItemIndex(id);
        if (!~index) {
            // ~ turns -1 into 0. It's just a short-cut. Is a bitwise operator
            return null; // so null is returned if the record is not found
        }
        const targetItem = this.#items[index];
        return { ...targetItem }; // return a copy, so it can't be affected outside
    }

    // GET ALL items
    getAllItems() {
        return this.#items.slice(); // return a copy, so it can't be affected outside
    }

    // CREATE a item
    addItem(itemData) {
        // Check if data provided
        if (!itemData) {
            throw new Error(`No data provided to addItem: received ${itemData}`);
        }

        // Create a new item
        const newItem = new MenuItem(itemData);

        // push it into our internal array
        this.#items.push(newItem);

        // Return the finished product for reference
        return { ...newItem };
    }

    // UPDATE an item
    updateItem(id, updates = {}) {
        // Check id is correct
        if (!id) {
            throw new Error(
                "An id of the item you want to change must be provided to updateItem"
            );
        }
        if (typeof id !== "string") {
            throw new Error(`id must be a string. Received ${id}(${typeof id})`);
        }

        // Get old item
        const targetItemIndex = this.getItemIndex(id);
        const targetItem = this.#items[targetItemIndex];

        // Notify if not found (This should not happen, hence the error rather than just returning...)
        if (!targetItem) {
            throw new Error(`Item not found`);
        }

        // Create a new Item to validate
        const updatedItem = new MenuItem({ ...targetItem, ...updates });

        // Remove the old and insert the new
        // qw could do this.#items[targetIndex] = updatedItem and it would be faster, BUT for practice...
        this.#items.splice(targetItemIndex, 1, updatedItem);
        return { ...updatedItem }; // before returning the new item
    }

    // DELETE an item
    removeItem(id) {
        if (!id) {
            throw new Error(`No id provided to removeItem: received ${id}`);
        }
        const index = this.getItemIndex(id);
        if (!~index) {
            return null; // throw err
        }
        return this.#items.splice(index, 1);
    }
}

// Run time

// You can create objects alone
const firstItem = new MenuItem({});

console.log("firstItem", firstItem);

// Or you can create a menu with objects in it
const rawData = [
    {
        name: "thing",
        price: 200
    },
    {
        name: "thing2",
        price: 550
    }
];

const firstMenu = new Menu(rawData);

// CREATE
const added = firstMenu.addItem({ name: "noodles", price: 350, stock: 4 });

// READ
console.log(firstMenu.getAllItems());

// UPDATE
firstMenu.updateItem(added._id, { name: "noodles2", price: 400 });

// DELETE
firstMenu.removeItem(added._id);

console.log(firstMenu.getAllItems());
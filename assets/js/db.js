const usersDB = () => {
    return new Promise(function(resolve, reject) {
        let UserDB = indexedDB.open("users", 1);
        UserDB.onsuccess = function() {
            console.log('Database Ready');
            resolve(UserDB.result);
        };

        UserDB.onerror = function() {
            console.log('There was an error');
        };

        UserDB.onupgradeneeded = function(e) {
            let db = e.target.result;
    
            let objectStore = db.createObjectStore('users', { keyPath: 'userEmail' });
    
            objectStore.createIndex('users', ['userEmail', 'password'], { unique: true });
    
            console.log('Database ready and fields created!');
        };        
        
    });
}
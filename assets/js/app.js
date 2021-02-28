let DBUser;

document.addEventListener('DOMContentLoaded', () => {   
    usersDB()
        .then(response => DBUser = response)
        .catch(error => console.error(error));
    
    function clear() {
        confirm.style.display = "none";
        reg.style.display = 'none';
    }

    function unclear() {
        confirm.style.display = "block";
        password.style.display = "block";
        sign.style.display = "none";
        reg.style.display = 'block';
        header_text.textContent = "Already have an account?";
        register.textContent = "Sign in";     
        forgot.style.display = "none";   
    }

    function addUser() {
        dataUser = {
            userEmail: String(email_input.value),
            password: String(password_input.value)
        }

        const transactionUser = DBUser.transaction(["users"], "readwrite").objectStore("users");
        transactionUser.transaction.oncomplete = function (e) {
            let objectStore = DBUser.transaction("users", "readwrite").objectStore("users");
            objectStore.add(dataUser);
            // form.reset();
            console.log(`Added user`);
        };

        localStorage.setItem("userEmail", email_input.value);
    }

    function checkUser(data) {        
        let emailUser = data.userEmail;
        let objectStore = DBUser.transaction('users').objectStore('users');
        return new Promise(function(resolve, reject) {
            let request = objectStore.get(emailUser);            
            request.onsuccess = function() {
                resolve(request.result);
            }
            request.onerror = function() {
                reject(Error("Couldn't find in database"));
            }
        });

    }

    clear();
    register.addEventListener('click', registration);
    function registration() {
        unclear();          
    }

    sign.addEventListener('click', signin) 
    function signin() {   
        data = {
            userEmail: String(email_input.value),
            password: String(password_input.value)
        }     
        checkUser(data)
            .then(result => {
                if (data.password === result.password) {
                    localStorage.setItem("userEmail", result.userEmail);
                    console.log("Successfully found user");

                } else{
                    console.log("Incorrect input");
                }       
            })
            .catch(error => console.error(error));
    }
});
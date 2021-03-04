let DBUser;

document.addEventListener('DOMContentLoaded', () => {   
    // Open working database
    usersDB()
        .then(response => DBUser = response)
        .catch(error => console.error(error));

    // Login UI
    function clear() {
        invisible(confirm, reg, header_login, forg);
        visible(sign, email, password, header_register, forgot)
        email_input.value = "";
        password_input.value = "";
    }

    // Add user on the users database and localStorage
    function addUser() {
        dataUser = {
            userEmail: String(email_input.value),
            password: String(password_input.value)
        }

        const transactionUser = DBUser.transaction(["users"], "readwrite").objectStore("users");
        transactionUser.transaction.oncomplete = function (e) {
            let objectStore = DBUser.transaction("users", "readwrite").objectStore("users");
            objectStore.add(dataUser);
            console.log(`Added user`);
            login()
        };

        localStorage.setItem("userEmail", email_input.value);
        email_input.value = "";
        password_input.value = "";
    }

    // Verify user information before login
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

    // Display login on document load
    clear();

    // Display login UI when login link clicked
    login.addEventListener('click', logingin);
    function logingin() {
        clear();
    }

    // Display sign up UI when signup link clicked
    register.addEventListener('click', registration);
    function registration() {
        visible(confirm, password, reg, header_login);
        invisible(sign, forgot, header_register, forg);          
    }

    // Verification of user information on login
    sign.addEventListener('click', signin) 
    async function signin() {   
        data = {
            userEmail: String(email_input.value),
            password: String(password_input.value)
        }     
        checkUser(data)
            .then(result => {
                if(!result) {
                    return alert(`Invalid input: Please sign in again`);
                }

                if (data.password === result.password && data.userEmail === result.userEmail) {
                    localStorage.setItem("userEmail", result.userEmail);
                    console.log("Successfully found user");
                    location.href = ("././home.html");
                    email_input.value = "";
                    password_input.value = "";
                } 
                else{
                    alert("Invalid input: Please sign in again");
                    email_input.value = "";
                    password_input.value = "";
                }   
            })
            .catch(error => console.error(error));
    }

    // Display forgot password UI when forgot your password link clicked
    forgot.addEventListener('click', forgotPassword);
    function forgotPassword() {
        visible(email, header_login, forg);
        invisible(confirm, reg, sign, header_register, password, forgot);   
    }

    // Verification and signing up of user
    reg.addEventListener('click', registerin);
    function registerin() {
        if (!email_input.value || !password_input.value || !confirm_input.value) {
            alert("Please sign up again");
        } else if (!(email_input.value).includes("@") || !(email_input.value).includes(".com")) {
            alert("Please provide the correct email address");
        } else if (password_input.value !== confirm_input.value) {
            alert("Invalid input: Please sign up again");
        } else {
            addUser();    
            location.href = ("././home.html");        
        }  
        registration();    
    }
    

});
const Auth = require('./auth')
const Account = require('./account')

module.exports = 
    class Service {
        #Account
        #Auth
       
        get Account() {           
            if (!this.#Account) {
                this.#Account = new Account()
            }
            return this.#Account
        }
    
        get Auth() {           
            if (!this.#Auth) {
                this.#Auth = new Auth()
            }
            return this.#Auth
        }
        
        
    
    }


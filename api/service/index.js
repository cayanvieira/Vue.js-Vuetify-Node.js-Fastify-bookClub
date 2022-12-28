const Auth = require('./auth')

module.exports = 
    class Service {
        #Auth
    
        get Auth(){           
            if (!this.#Auth) {
                this.#Auth = new Auth()
            }
            return this.#Auth
        }
    
    }


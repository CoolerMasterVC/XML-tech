class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async get(url, callback=null) {
        try {
            const response = await fetch(url);
                        
            const data = await response.json();
            
            if (callback !== null) {callback(data, response.status);}
            
            return data;
            
        } catch (error) {
            console.error('Ошибка GET запроса:', error);
            
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async post(url, data, callback=null) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            let responseData = null
            try {
                responseData = await response.json(); 
            }
            catch (e){
                responseData = null
            }

            if (callback) {
                callback(responseData, response.status);
            }

            return responseData;

        } catch (error) {
            console.error('Ошибка POST запроса:', error);
            
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async patch(url, data, callback=null)
    {
        try {
            const response = await fetch (url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
            let responseData = null
            try {
                responseData = await response.json(); 
            }
            catch (e){
                responseData = null
            }
            if (callback !== null) {callback(responseData, response.status)}
            return data;
        } catch (error)
        {
            console.error('Ошибка PATCH запроса:', error);
        }
    }


    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async delete(url, callback=null) {
        try {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        let data = null
        try { // тут try потому что может быть пустой ответ
            data = await response.json(); 
        }
        catch (e){
            data = null
        }
        

        if(callback !== null) 
        {
            callback(data, response.status)
        }

        return data
        } catch (error)
        {
            console.error('Ошибка DELETE запроса:', error);
        }


    }


}

export const ajax = new Ajax();
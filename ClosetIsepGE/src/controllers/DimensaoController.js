const axios = require("axios");

const url = 'http://closetisep.herokuapp.com/';

exports.getById = function (id) {
    return new Promise(function (fulfill, reject) {
        axios.get(url + 'api/dimensao/'+ id)
            .then(function (response) {
                if (response.status == 200) {
                    fulfill(response.data);
                } else {
                    reject('Not Found');
                }
            })
            .catch(function (error) {
                reject('Not Found');
            });
    });
}
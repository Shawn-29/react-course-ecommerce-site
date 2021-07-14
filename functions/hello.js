/* test this function at localhost:
8888/.netlify/functions/hello
*/

const items = [
    {id: 1, name: 'john'},
    {id: 2, name: 'pete'},
]

exports.handler = async (event, context) => {
    return {
        statusCode: 200, /* successful response */
        body: 'Hello World!'
    }
};
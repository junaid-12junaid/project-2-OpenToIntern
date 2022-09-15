const stringChecking = function (data) {
    if (typeof data !== 'string') {
        return false;
    } else if (typeof data === 'string' && data.trim().length === 0) {
        return false;
    } else {
        return true;
    }
}


//============== Validation in College Controller==============//

const isValidAbbrv = /^[.a-zA-Z\s,-]+$/
const isValidName = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/
const isValidLogoLink = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/


//============== Validation in Intern Controller==============//

const isvalidEmail = /^\s*[a-zA-Z0-9]+([\.\-\_\+][a-zA-Z0-9]+)*@[a-zA-Z]+([\.\-\_][a-zA-Z]+)*(\.[a-zA-Z]{2,3})+\s*$/
const isvalidMobile = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/


module.exports = { stringChecking, isValidAbbrv, isValidName, isValidLogoLink, isvalidEmail, isvalidMobile }
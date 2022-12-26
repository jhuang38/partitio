const usernameValidator = (input = '') => {
    if (input.length <= 0) return {error: true, message: 'Username cannot be empty.'}

    if (input.length > 20) return {error: true, message: 'Username cannot exceed 20 characters.'}

    return {error: false, message: ''}
}

const isValidEmail = (email='') => {
    // some regex expression ft. stackoverflow
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

const emailValidator = (input = '') => {
    if (input.length <= 0) return {error: true, message: 'Email cannot be empty.'}

    if (input.length > 320) return {error: true, message: 'Email cannot exceed 320 characters.'}

    if (!isValidEmail(input)) return {error: true, message: 'Email is invalid.'}

    return {error: false, message: ''}
}

const passwordValidator = (input = '') => {
    if (input.length < 8) return {error: true, message: 'Password cannot be less than 8 characters long.'}
    // CONSIDER ADDING CHARACTER TYPE REQUIREMENTS (e.g. numbers, etc)

    return {error: false, message: ''}
}

const collectionNameValidator = (input = '') => {
    if (input.length <= 0) return {error: true, message: 'Collection name cannot be empty.'}

    if (input.length > 50) return {error: true, message: 'Collection name must be under 50 characters long.'}
    
    return {error: false, message: ''}
}

const collectionDescriptionValidator = (input = '') => {
    if (input.length > 500) return {error: true, message: 'Collection description must be under 500 characters long.'}

    return {error: false, message: ''}
}

const linkNameValidator = (input = '') => {
    if (input.length <= 0) return {error: true, message: 'Link name cannot be empty.'}

    if (input.length > 100) return {error: true, message: 'Link name must be under 100 characters.'}

    return {error: false, message: ''}
}

const linkDescriptionValidator = (input = '') => {
    if (input.length > 500) return {error: true, message: 'Link description must be under 500 characters long.'}

    return {error: false, message: ''}
}

const checkValidUrl = (urlString = '') => {
    // code from freecodecamp
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString)
}


const linkURLValidator = (input = '') => {
    if (input.length <= 0) return {error: true, message: 'Link URL cannot be empty.'}

    if (input.length > 2048) return {error: true, message: 'Link URL cannot exceed 2048 characters in length.'}

    if (!checkValidUrl(input)) return {error: true, message: 'Ensure that the given URL is valid.'}

    return {error: false, message: ''}
}


export {usernameValidator, emailValidator, passwordValidator, collectionNameValidator, collectionDescriptionValidator, linkNameValidator, linkDescriptionValidator, linkURLValidator}
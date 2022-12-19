const collectionNameValidator = (input = '') => {
    if (input.length <= 0) return {error: true, message: 'Collection name cannot be empty.'}

    if (input.length > 50) return {error: true, message: 'Collection name must be under 50 characters long.'}
    
    return {error: false, message: ''}
}

const collectionDescriptionValidator = (input = '') => {
    if (input.length > 500) return {error: true, message: 'Collection description must be under 500 characters long.'}

    return {error: false, message: ''}
}


export {collectionNameValidator, collectionDescriptionValidator}
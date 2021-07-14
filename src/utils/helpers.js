export const formatPrice = (price) => {

    /* get the dollar amount in USD for a price in cents */
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price / 100);
};

export const getShortDesc = (desc) => {
    const charLimit = 150;
    if (desc.length <= charLimit) {
        return desc;
    }
    return desc.substr(0, charLimit) + '...';
};

export const getUniqueValues = (data, type) => {

    /* get unique values from the data */
    const unique = new Set(
        /* item[type] might be an array;
            the flat method flattens an array by a depth of 1 (default) */
        data.map(item => item[type]).flat()
    );

    return ['all', ...unique];
};
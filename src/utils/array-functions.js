// source array, and key of the array´s objects to be used as key of the new object
export const convertArrayToObject = (array, key) =>
    array.reduce((acc, curr) => {
        acc[curr[key]] = curr;
        return acc;
    }, {});

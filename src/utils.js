import { fabric } from 'fabric';

const pad = (str, length) => {
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

export const getRandomColor = () => {
    let getRandomInt = fabric.util.getRandomInt;
    return pad(getRandomInt(0, 255).toString(16), 2) + pad(getRandomInt(0, 255).toString(16), 2) + pad(getRandomInt(0, 255).toString(16), 2)
}

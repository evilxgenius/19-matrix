const numberInput = (label, init, min, max) => {
    do {
        let value = prompt(label, init);

        if (value === null) throw 'Bye!';

        value = +value;

        if (isNaN(+value)) {
            alert('Please enter a number!');
        } else if (!isNaN(min) && value < min) {
            alert(`Please pass a number >= ${min}`)
        } else if (!isNaN(max) && value > max) {
            alert(`Please pass a number <= ${max}`)
        } else {
            return +value;
        }
    } while (true);
};

const createMatrix = (matrixSize, topRightElement) => {
    const matrix = [];

    for (let row = 0; row < matrixSize; row++) {
        matrix[row] = [];

        for (let col = 0; col < matrixSize; col++) {
            matrix[row][col] = Math.floor(Math.random() * 10);
        }
    }

    if (typeof topRightElement === 'number') matrix[0][matrix.length - 1] = topRightElement;

    return matrix;
};

document.addEventListener('DOMContentLoaded', () => {
    try {
        const matrixSize = numberInput('Matrix Size:', 10, 2);
        const topRightElement = numberInput('Top Right Element:', 5);
        const rowForSum = numberInput('Row For Sum:', 5, 1, matrixSize);
        const columnForSum = numberInput('Column For Sum:', 5, 1, matrixSize);
        const matrix = createMatrix(matrixSize, topRightElement);

        let sumOfMainDiagonal = 0;
        let sumOfSecondaryDiagonal = 0;

        let sumOfTopRightHalfMatrixWithoutMain = 0;
        let sumOfTopRightHalfMatrixWithMain = 0;

        let sumOfBottomLeftHalfMatrixWithoutMain = 0;
        let sumOfBottomLeftHalfMatrixWithMain = 0;

        let sumOfLeftTopHalfMatrixWithoutSecondary = 0;
        let sumOfLeftTopHalfMatrixWithSecondary = 0;

        let sumOfRightBottomHalfMatrixWithoutSecondary = 0;

        let sumOfSelectedRow = 0;
        let sumOfSelectedColumn = 0;

        for (let rowCol = 0; rowCol < matrix.length; rowCol++) {
            // Сума головної діагоналі
            sumOfMainDiagonal += matrix[rowCol][rowCol];
            // Сума побочної діагоналі
            sumOfSecondaryDiagonal += matrix[rowCol][matrix.length - 1 - rowCol]
        }

        for (let row = 0; row < matrix.length - 1; row++) {
            for (let col = row + 1; col < matrix.length; col++) {
                // Сума половини матриці без головної діагоналі зверху зправа
                sumOfTopRightHalfMatrixWithoutMain += matrix[row][col];
            }
        }
        // Сума половини матриці з головною діагоналлю зверху зправа
        sumOfTopRightHalfMatrixWithMain = sumOfTopRightHalfMatrixWithoutMain + sumOfMainDiagonal;

        for (let row = 1; row < matrix.length; row++) {
            for (let col = 0; col < row; col++) {
                // Сума половини матриці без головної діагоналі знизу зліва
                sumOfBottomLeftHalfMatrixWithoutMain += matrix[row][col];
            }
        }
        // Сума половини матриці з головною діагоналлю знизу зліва
        sumOfBottomLeftHalfMatrixWithMain = sumOfBottomLeftHalfMatrixWithoutMain + sumOfMainDiagonal;

        for (let row = 0; row < matrix.length - 1; row++) {
            for (let col = 0; col < matrix.length - 1 - row; col++) {
                // Сума половини матриці без побічної діагоналі зверху зліва
                sumOfLeftTopHalfMatrixWithoutSecondary += matrix[row][col];
            }
        }
        // Сума половини матриці з побочною діагоналлю зверху зліва
        sumOfLeftTopHalfMatrixWithSecondary += sumOfLeftTopHalfMatrixWithoutSecondary + sumOfSecondaryDiagonal;

        // Сума половини матриці без побічної діагоналі внизу зправа
        for (let row = 1; row < matrix.length; row++) {
            for (let col = matrix.length - row; col < matrix.length; col++) {
                sumOfRightBottomHalfMatrixWithoutSecondary += matrix[row][col];
            }
        }

        // Сума строки с
        sumOfSelectedRow = matrix[rowForSum - 1].reduce((memo, num) => memo + num, 0);
        // Сумма стовпця k
        sumOfSelectedColumn = matrix[columnForSum - 1].reduce((memo, num) => memo + num, 0);
    } catch(e) {
        alert(e);
    }
});
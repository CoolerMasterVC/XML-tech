
export function countIdentic(arr) {
    const countMap = {};
    arr.forEach(item => {
        countMap[item] = (countMap[item] || 0) + 1;
    });
    return Object.values(countMap).filter(count => count > 1).length;
}

export function calculateAverage(arr) {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
}


export function mergeAndSortArrays(...arrays) {
    const merged = arrays.flat();
    const sorted = merged.sort((a, b) => b - a);
    return sorted.join(' ');
}


export function isPalindrome1(str) {
    const cleanStr = String(str).toLowerCase().replace(/[^а-яa-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

export function isPalindrome2(str) {
    const cleanStr = String(str).toLowerCase().replace(/[^а-яa-z0-9]/g, '');
    const len = cleanStr.length;
    for (let i = 0; i < len / 2; i++) {
        if (cleanStr[i] !== cleanStr[len - 1 - i]) {
            return false;
        }
    }
    return true;
}
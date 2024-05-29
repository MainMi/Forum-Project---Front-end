export function truncateString(str, maxLength = 40) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }

    return str;
}

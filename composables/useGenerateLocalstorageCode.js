const systematicFourCharCode = (title) => {
    const cleanTitle = title.replace(/\s/g, '').toLowerCase();

    const midIndex = Math.floor(cleanTitle.length / 2);
    const penultimateIndex = Math.max(cleanTitle.length - 2, 0);

    const firstChar = cleanTitle.charAt(0).toUpperCase();
    const middleChar = ((cleanTitle.charCodeAt(midIndex) - 'a'.charCodeAt(0) + 1) % 10).toString();
    const penultimateChar = String.fromCharCode((cleanTitle.charCodeAt(penultimateIndex) - 'a'.charCodeAt(0) + 5) % 26 + 'a'.charCodeAt(0)).toUpperCase();
    const lastChar = ((cleanTitle.charCodeAt(cleanTitle.length - 1) - 'a'.charCodeAt(0) + 1) % 10).toString();

    return `${firstChar}${middleChar}${penultimateChar}${lastChar}`;
};

export { systematicFourCharCode }
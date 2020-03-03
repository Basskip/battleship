const shipFactory = (length = 1) => {
    let sections = new Array(length);
    sections.fill(false);

    const hit = (pos) => {
        sections[pos] = true;
    };

    const isSunk = () => {
        return sections.every(sec => sec == true);
    }

    return {
        length,
        hit,
        isSunk,
    }
}

module.exports = shipFactory;
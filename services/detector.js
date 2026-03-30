function normalize(text) {
    return text.toLowerCase();
}

function scoreMatch(message, dictionary) {

    let scores = {};

    for(let key in dictionary) {
        scores[key] = dictionary[key].filter(word => message.includes(word)).length;
    }

    const best = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return scores[best] > 0 ? best : null;

} 

module.exports = {normalize, scoreMatch};

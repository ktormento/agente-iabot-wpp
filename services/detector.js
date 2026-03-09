function normalizeText(text) {

    return text.toLowerCase();

}

function scoreMatch(message, dictionary) {

    let score = {};

    for(let key in dictionary) {

        score[key] = dictionary[key].filter(word => message.includes(word)).length;
    }

    let best = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    return scores[best] > 0 ? best : null;
} 

module.exports = {normalize, scoreMatch};

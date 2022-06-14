const { list } = require('./list');
const fs = require('fs');
const fetch = require('node-fetch');

const generateGameData = async () => {
    console.log(list);

    for (const word of list) {
        const response = await fetch(`https://danielthepope-countdown-v1.p.rapidapi.com/solve/${word}?variance=100`, {
            headers: {
                'X-RapidAPI-Key': '9b90cad4b1msh681beea50aa6613p1f48a6jsnbf16f98b4001',
            },
        });

        if (response.ok) {
            const result = await response.json();
            const list = result
                .map((item) => item.word)
                .filter((item) => item.toLowerCase() !== word && item.length >= 3);

            if (list.length >= 10) {
                fs.readFile('gameData.json', (err, data) => {
                    const json = JSON.parse(data);
                    const results = {
                        word: word,
                        result: list,
                    };

                    console.log('pushing:', results);

                    json.push(results);

                    fs.writeFile('gameData.json', JSON.stringify(json), () => console.log('k'));
                });
            } else {
                console.log('list was not long enough:', list);
            }
        } else {
            console.log('Response not ok');
        }
    }
};

generateGameData();

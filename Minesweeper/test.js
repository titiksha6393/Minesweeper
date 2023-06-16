const hungry = true;
const eat = new Promise(function (resolve, reject) {
    if (hungry) {
        const fastfood = {
            activity: "Cook Food",
            location: "Aligarh"
        };
        resolve(fastfood);
    } else {
        reject(new Error('Not Hungry'));
    }
});

const foodTour = function (fastfood) {
    return new Promise(function (resolve, reject) {
        const response = `I'm going on a food tour at ${fastfood.location}`;

        resolve(response)
    });
}

// console.log(eat);

async function willEat() {
    try {
        let fastfood = await eat;
        let response = await foodTour(fastfood);
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
}

willEat();

// async function getJobAsync() {
//     let response = await fetch(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`);
//     let data = await response.json()
//     return data;
// }
// getJobAsync('jobPositionHere')
//     .then(data => console.log(data));


const getResult = async (request) => {
    let response = await new Promise((resolve, reject) => {
        request((err, res, body) => {
            if (err) return reject(err);
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
    });

    try {
        console.log(response);
    }
    catch (err) {
        console.error(err);
    }
}

getResult();
console.log('This is how to return async JavaScript');
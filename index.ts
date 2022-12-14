const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// twilio must not be a trial number to messages to arbitrary numbers
const twilioNumber = process.env.TWILIO_PHONE;
const client = require('twilio')(accountSid, authToken);

const args = process.argv.slice(2);
const sendTextMessage = args.indexOf('--text') > -1;
const printResults = !sendTextMessage;

// simplified input format - but feel free to create Person objects directly 
// and call `computeSecretSanta` directly instead
let secretSantas = [
    // an array is a couple, couples will not be matched
    ["James:+11234567890", "Lisa:+11234567890"],
    ["Jordan:+11234567890", "Nicole:+11234567890"],
    ["Evan:+11234567890", "Sara:+11234567890"],
    // a string is just a person, no couple/spouse rules apply
    "Luna:+11234567890"
];

const santaAssignments = computeSecretSanta(parsePeople(secretSantas));
processSecretSantaResults(santaAssignments, printResults, sendTextMessage);

// ------------------------- implementation below ----------------------------

// prints secret santa pairings to the screen and/or sends text messages via twilio if you want to keep things secret
function processSecretSantaResults(santaAssignments: Person[], print: boolean, text: boolean) {
    if (text) {
        if (!twilioNumber || !accountSid || !authToken) {
            throw new Error("Must set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE to send text messages.");
        }
    }
    console.log("πππ€Άβπ Welcome to Secret Santa! πβπ€Άππ");
    for (let s of santaAssignments) {
        if (print) {
            console.log(`πππ€Άβπ ${s.name} has ${s.toGift?.name} πππ€Άβπ`);
        }
        if (text && s.phone) {
            client.messages
                .create({
                    body: `ππ€Άβπππβπ€Άπ\n\nWelcome to Secret Santa!\nYou will get a gift for ${s.toGift?.name}!\n\nππ€Άβπππβπ€Άπ`,
                    from: twilioNumber,
                    to: s.phone,
                })
                .then((_: any) => console.log(`β¨π Sent text message to ${s.name} πβ¨`));
        }
    }
}

type Person = {
    name: string;
    phone?: string;
    spouse?: Person;
    toGift?: Person;
};

// convenience function to produce a list of people (including spouses and phone numbers)
// from an array of string arrays.
function parsePeople(people: (string[] | string)[]): Person[] {
    const santas: Person[] = [];
    for (let p of people) {
        if (Array.isArray(p)) {
            const p1 = createPerson(p[0]);
            const p2 = createPerson(p[1]);
            setSpouse(p1, p2);
            santas.push(p1, p2);
        } else {
            santas.push(createPerson(p));
        }
    }
    return santas;
}

// produces a random secret santa pairing from list of people.
// people marked as spouses will not be matched with each other.
// shuffles "people" and "names in the hat", then draws names one by one
// attempting to find a solution. If the solution is invalid, we reshuffle and try again.
function computeSecretSanta(santas: Person[]): Person[] {
    let solution;

    while (!solution) {
        const namesInTheHat = [...santas];
        shuffle(santas);
        shuffle(namesInTheHat);
        const candidate = [];
        for (let s of santas) {
            let match;
            for (let i = 0; i < namesInTheHat.length; i++) {
                if (s.spouse === namesInTheHat[i] || s === namesInTheHat[i]) {
                    continue;
                }
                match = namesInTheHat[i];
                namesInTheHat.splice(i, 1);
                break
            }
            if (!match) {
                // no solution try again
                break;
            }
            candidate.push({ who: s, has: match });
        }
        if (candidate.length === santas.length) {
            solution = candidate;
        }
    }

    for (let s of solution) {
        s.who.toGift = s.has;
    }

    return santas;
}

// convenience fn to create a person object from either "name" or "name:phoneNumber"
function createPerson(input: string): Person {
    let name = input;
    let phone: string | undefined = undefined;
    const split = input.split(":");
    if (split.length > 1) {
        name = split[0];
        phone = split[1];
    }
    return {
        name,
        phone,
    };
}

// sets two people as spouses, spouses are excluded from gifting each other
function setSpouse(p1: Person, p2: Person) {
    p1.spouse = p2;
    p2.spouse = p1;
}

// generic in-place array shuffling
function shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

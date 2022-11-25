let secretSantas = [
    ["jim", "lisa"], // an array is a couple, couples will not be matched
    ["jordan", "nikki"],
    ["evan", "sara"],
    // "foobar" - a string is just a person, no couple/spouse rules apply
];

const printResults = true;
const sendTextMessage = true;

const santaAssignments = computeSecretSanta(secretSantas);
for(let s of santaAssignments) {
    if(printResults) {
        console.log(`${s.name}  has ${s.toGift?.name}`);
    }
    if(sendTextMessage && s.phone) {
        console.log(s.phone);
    }
}

type Person = {
    name: string;
    phone?: string;
    spouse?: Person;
    toGift?: Person;
};

function computeSecretSanta(people: (string[] | string)[]): Person[] {
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


function setSpouse(p1: Person, p2: Person) {
    p1.spouse = p2;
    p2.spouse = p1;
}

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

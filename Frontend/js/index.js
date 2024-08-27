function showPassage(libros) {
    const bibleDiv = document.getElementById("bible");

    // Ordenar el array de objetos basándote en el último número de "reference"
    libros.sort((a, b) => {
        const getLastNumber = (reference) => {
            const match = reference.match(/\d+$/);
            return match ? parseInt(match[0], 10) : 0;
        };

        return getLastNumber(a.reference) - getLastNumber(b.reference);
    });

    // Limpiar el contenido existente en el elemento "bible"
    while (bibleDiv.firstChild) {
        bibleDiv.removeChild(bibleDiv.firstChild);
    }

    // Mostrar los pasajes ordenados
    libros.forEach((libro) => {
        let content = document.createElement("p");
        let stringPassage = libro.cleanText;
        const insertSpace = (string) =>{ return string.replace(/\d{1,3}/g, '$&. '); }
        const fixedPassage = insertSpace(stringPassage);
        content.textContent = fixedPassage;
        bibleDiv.appendChild(content);
    });
}

//https://samueldaviddelacruz.github.io/spanish-bible-api/
//https://ajphchgh0i.execute-api.us-west-2.amazonaws.com/dev/api/books/{bookid}/verses/{}

function searchPassage() {
    const passage = document.getElementById('inputPassage').value.replace(/ /g, '');
    const fullChapter = passage.match(/^(\d?[a-zA-Z]+)(\d+)?$/);
    const matches = passage.match(/^(\d?[a-zA-Z]+)(\d+):(\d+)(?:-(\d+))?$/);
    let bookid, chapter, verse, endVerse;
    if (fullChapter) {
        bookid = fullChapter[1];
        bookid = findBook(bookid);
        chapter = parseInt(fullChapter[2], 10);
        makeRequest(bookid, chapter);
    } else if (matches) {
        bookid = matches[1]
        bookid = findBook(bookid);
        chapter = parseInt(matches[2], 10);
        verse = parseInt(matches[3], 10);
        endVerse = parseInt(matches[4], 10);
        const checkEndVerse = endVerse ? endVerse : "";
        makeRequest(bookid, chapter, verse, checkEndVerse);
        
    } else {
        alert("Entrada invalida");
    }

    //genesis1:1-5

    //chapter:verse-chapter:endVerse
    //genesis1:1-1:2
    //https://ajphchgh0i.execute-api.us-west-2.amazonaws.com/dev/api/books/${bookid}/verses/${chapter}:${verse}-${chapter}:${endVerse}

}

function findBook(bookid) {
    switch (bookid) {
        case 'genesis':
            bookid = 'spa-RVR1960:Gen';
            break;
        case 'exodo':
            bookid = 'spa-RVR1960:Exod';
            break;
        case 'levitico':
            bookid = 'spa-RVR1960:Lev';
            break;
        case 'numeros':
            bookid = 'spa-RVR1960:Num';
            break;
        case 'deuteronomio':
            bookid = 'spa-RVR1960:Deut';
            break;
        case 'josue':
            bookid = 'spa-RVR1960:Josh';
            break;
        case 'jueces':
            bookid = 'spa-RVR1960:Judg';
            break;
        case 'rut':
            bookid = 'spa-RVR1960:Ruth';
            break;
        case '1samuel':
            bookid = 'spa-RVR1960:1Sam';
            break;
        case '2samuel':
            bookid = 'spa-RVR1960:2Sam';
            break;
        case '1reyes':
            bookid = 'spa-RVR1960:1Kgs';
            break;
        case '2reyes':
            bookid = 'spa-RVR1960:2Kgs';
            break;
        case '1cronicas':
            bookid = 'spa-RVR1960:1Chr';
            break;
        case '2cronicas':
            bookid = 'spa-RVR1960:2Chr';
            break;
        case 'esdras':
            bookid = 'spa-RVR1960:Ezra';
            break;
        case 'nehemias':
            bookid = 'spa-RVR1960:Neh';
            break;
        case 'ester':
            bookid = 'spa-RVR1960:Esth';
            break;
        case 'job':
            bookid = 'spa-RVR1960:Job';
            break;
        case 'salmos':
            bookid = 'spa-RVR1960:Ps';
            break;
        case 'proverbios':
            bookid = 'spa-RVR1960:Prov';
            break;
        case 'eclesiastes':
            bookid = 'spa-RVR1960:Eccl';
            break;
        case 'cantares':
            bookid = 'spa-RVR1960:Song';
            break;
        case 'isaias':
            bookid = 'spa-RVR1960:Isa';
            break;
        case 'jeremias':
            bookid = 'spa-RVR1960:Jer';
            break;
        case 'lamentaciones':
            bookid = 'spa-RVR1960:Lam';
            break;
        case 'ezekiel':
            bookid = 'spa-RVR1960:Ezek';
            break;
        case 'daniel':
            bookid = 'spa-RVR1960:Dan';
            break;
        case 'oseas':
            bookid = 'spa-RVR1960:Hos';
            break;
        case 'joel':
            bookid = 'spa-RVR1960:Joel';
            break;
        case 'amos':
            bookid = 'spa-RVR1960:Amos';
            break;
        case 'abdias':
            bookid = 'spa-RVR1960:Obad';
            break;
        case 'jonas':
            bookid = 'spa-RVR1960:Jonah';
            break;
        case 'miqueas':
            bookid = 'spa-RVR1960:Mic';
            break;
        case 'nahum':
            bookid = 'spa-RVR1960:Nah';
            break;
        case 'habacuc':
            bookid = 'spa-RVR1960:Hab';
            break;
        case 'sofonias':
            bookid = 'spa-RVR1960:Zeph';
            break;
        case 'hageo':
            bookid = 'spa-RVR1960:Hag';
            break;
        case 'zacarias':
            bookid = 'spa-RVR1960:Zech';
            break;
        case 'malageas':
            bookid = 'spa-RVR1960:Mal';
            break;
        case 'mateo':
            bookid = 'spa-RVR1960:Matt';
            break;
        case 'marcos':
            bookid = 'spa-RVR1960:Mark';
            break;
        case 'lucas':
            bookid = 'spa-RVR1960:Luke';
            break;
        case 'juan':
            bookid = 'spa-RVR1960:John';
            break;
        case 'hechos':
            bookid = 'spa-RVR1960:Acts';
            break;
        case 'romanos':
            bookid = 'spa-RVR1960:Rom';
            break;
        case '1corintios':
            bookid = 'spa-RVR1960:1Cor';
            break;
        case '2corintios':
            bookid = 'spa-RVR1960:2Cor';
            break;
        case 'galatas':
            bookid = 'spa-RVR1960:Gal';
            break;
        case 'efesios':
            bookid = 'spa-RVR1960:Eph';
            break;
        case 'filipenses':
            bookid = 'spa-RVR1960:Phil';
            break;
        case 'colosenses':
            bookid = 'spa-RVR1960:Col';
            break;
        case '1tesalonicenses':
            bookid = 'spa-RVR1960:1Thess';
            break;
        case '2tesalonicenses':
            bookid = 'spa-RVR1960:2Thess';
            break;
        case '1timoteo':
            bookid = 'spa-RVR1960:1Tim';
            break;
        case '2timoteo':
            bookid = 'spa-RVR1960:2Tim';
            break;
        case 'tito':
            bookid = 'spa-RVR1960:Titus';
            break;
        case 'filemon':
            bookid = 'spa-RVR1960:Phlm';
            break;
        case 'hebreos':
            bookid = 'spa-RVR1960:Heb';
            break;
        case 'santiago':
            bookid = 'spa-RVR1960:Jas';
            break;
        case '1pedro':
            bookid = 'spa-RVR1960:1Pet';
            break;
        case '2pedro':
            bookid = 'spa-RVR1960:2Pet';
            break;
        case '1juan':
            bookid = 'spa-RVR1960:1John';
            break;
        case '2juan':
            bookid = 'spa-RVR1960:2John';
            break;
        case '3juan':
            bookid = 'spa-RVR1960:3John';
            break;
        case 'judas':
            bookid = 'spa-RVR1960:Jude';
            break;
        case 'apocalipsis':
            bookid = 'spa-RVR1960:Rev';
            break;
        default:
            break;
    }
    return bookid;
}




function makeRequest(bookid, chapter, verse = "", endVerse = "") {
    let intervalPart;
    if (endVerse) {
        intervalPart = `:${verse}-${chapter}:${endVerse}`;
    } else if (verse) {
        intervalPart = `:${verse}`;
    }else{
        intervalPart = "";
    }
    fetch(`https://ajphchgh0i.execute-api.us-west-2.amazonaws.com/dev/api/books/${bookid}/verses/${chapter}${intervalPart}`)
        .then(response => response.json())
        .then(data => {
            showPassage(data);
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));

}


let sendBtn = document.getElementById("send")

sendBtn.addEventListener('click', searchPassage);


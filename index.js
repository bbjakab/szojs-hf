// //A tesztadatok kikommentelése
// //feltölti az adatbázist 1-2 rekorddal
// //---------------Tesztadatok---------------
// const EladoModel = require('./models/elado');
// const AjanlatModel = require('./models/ajanlat');

// let eKB = new EladoModel();
// eKB.nev = "Kovács Béla";
// eKB.cim = "Huszár u. 15.";
// eKB.tel = "+36 70 481 4978"
// eKB.save((err)=> {
//     console.log(err);

//     let a1 = new AjanlatModel();
//     a1.nev = "Hajszárító";
//     a1.leiras = "eladó hajszárító samsung";
//     a1.ar = 3599;
//     a1._elado = eKB;
//     a1.save((err)=> {
//         console.log(err);
//     });
//     let a2 = new AjanlatModel();
//     a2.nev = "Nokia 510xs telefon gombos";
//     a2.leiras = "jol mukodik, egyik gomb hianyzik";
//     a2.ar = 10000;
//     a2._elado = eKB;
//     a2.save((err)=> {
//         console.log(err);
//     });
// });
// let eVAE = new EladoModel();
// eVAE.nev = "Varga Antalné Erzsébet";
// eVAE.cim = "Petőfi Sándor u. 9.";
// eVAE.tel = "+36 30 841 3461"
// eVAE.save((err)=> {
//     console.log(err);
// });
// //------------Tesztadatok vége------------

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname));

require('./route/index')(app);

app.use((err, req, res, next)=> {
    res.end("Valami hiba tortent.");
    console.log(err);
});


let PORT = 3000;

const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
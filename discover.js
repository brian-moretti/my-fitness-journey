//! ANGULAR 18 MASTER PROJ

/*
* NGZONE
* SUBJECT
* CAN DEACTIVATE -> Guard che permette il blocco del route dei componenti. Funziona sul componente in cui viene inserito. 
* CORS tra BE/FE -> INSERIMENTO CORS IN BE con params {origin: urlFE, credential: true} per inviare cookie settati in BE. Nel req.cookie({sameSite: 'None'}) per indicare che non è lo stesso url tra be/fe. 'secure' indica che il cookie deve essere trasferito solo su https e quindi indirizzi sicuri
* router.navigate(['url'], {state: {}}) -> gli extras STATE permette di inviare dati tramite il router. Molto utile
* LOGIN BE non eseguire i redirect a ROUTE CRUCIALI come user ect. ma inviare risposta 200 e il redirect eseguirlo nel FE

*/
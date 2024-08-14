//! ANGULAR 18 MASTER PROJ

/*
 * NGZONE
 * SUBJECT
 * CAN DEACTIVATE -> Guard che permette il blocco del route dei componenti. Funziona sul componente in cui viene inserito.
 * CORS tra BE/FE -> INSERIMENTO CORS IN BE con params {origin: urlFE, credential: true} per inviare cookie settati in BE. Nel req.cookie({sameSite: 'None'}) per indicare che non è lo stesso url tra be/fe. 'secure' indica che il cookie deve essere trasferito solo su https e quindi indirizzi sicuri
 * router.navigate(['url'], {state: {}}) -> gli extras STATE permette di inviare dati tramite il router. Molto utile
 * LOGIN BE non eseguire i redirect a ROUTE CRUCIALI come user ect. ma inviare risposta 200 e il redirect eseguirlo nel FE
 * AUTH BE - occhio ai redirect perché nel FE poi non viene mostrato lo status di errore corretto ma viene eseguito un redirect quindi da 401 diventa 302. Non si possono gestire gli errori così
 * inject() usarlo per iniettare classi/servizi e altro all'interno di funzioni non classi con @injectable
 */

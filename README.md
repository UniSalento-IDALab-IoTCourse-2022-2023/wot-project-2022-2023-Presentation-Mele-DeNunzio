# FrontEndIoT

## Applicazione mobile del conducente
Attraverso l’applicazione per smartphone il conducente è in grado di creare delle Box specifiche per il tipo di prodotto che deve trasportare. Egli può specificare dei range di valori all’interno del quale i valori ambientali dovrebbero rimanere.

![](./box1.png)
![](./box2.png)

Nella schermata principale il conducente può selezionare una Box da monitorare, e far partire la corsa quando necessario. Una volta iniziata l’acquisizione, sarà visibile un timer che mostra da quanto è iniziata la nostra corsa. Quando i valori misurati saranno al di fuori dei range specificati nella Box, l’applicazione mostrerà in tempo reale questa informazione al conducente, specificando il tipo di anomalia, il valore della misura, e l’orario a cui si è presentata.

![](./start1.png)
![](./start2.png)
![](./start3.png)
![](./start4.png)

Quando si è arrivati a destinazione è possibile premere il pulsante “Fine Corsa” in modo da terminare l’acquisizione delle informazioni. Una volta fatto questo comparirà un elemento a schermo che, una volta dopo averci cliccato sopra, renderà visibili tutte le anomalie rilevate durante quella corsa.

## Architettura
L’architettura scelta è composta dalle seguenti componenti:

  ●	Nordic Thingy:52: questo è il dispositivo alla base del prototipo che si occupa delle misurazioni dei valori ambientali, e dell’invio di queste tramite BLE al Raspberry Pi. 
  
  ●	Raspberry Pi: Il Raspberry Pi riceve i dati misurati dal Thingy via BLE, e li analizza. Se questo trova delle anomalie dei valori rispetto ai range prestabiliti, invia questa informazione tramite WebSocket al gateway (ovvero lo smartphone del conducente).  
  
  ●	Smartphone del conducente: Il telefono del conducente ha il ruolo di gateway. Sullo smartphone gira un applicazione che permette di avviare una corsa, farla terminare, e ricevere tutte le anomalie riscontrate. Ogni volta che riceve l’informazione di un'anomalia via WebSocket da parte del Raspberry, la notifica al conducente, e la comunica alla dashboard in cloud.
  
  ●	Dashboard: La dashboard mette a disposizione un'interfaccia utente che consente di visualizzare i dati raccolti dal sistema IoT in modo chiaro e comprensibile. Attraverso la dashboard, gli utenti possono monitorare lo stato dei parametri rilevati per visualizzare eventuali anomalie. La dashboard offre funzionalità avanzate come grafici interattivi e filtri per migliorare la comprensione dei dati. 
  
  ●	Cloud: Il cloud rappresenta l'infrastruttura server remota che ospita i servizi di backend necessari per la web application con l’obiettivo di mostrare le dashboard dei percorsi. 

<p align="center">
  <img src="./architecture.png" alt="" style="display: block; margin: 0 auto;" />
</p>
  
Questa architettura permette una comunicazione efficiente tra i diversi componenti del sistema, consentendo una gestione tempestiva delle anomalie rilevate dai sensori. I dati vengono acquisiti, analizzati, inviati al telefono del conducente, e infine archiviati e visualizzati nel cloud attraverso una dashboard intuitiva.

## Collegamenti agli altri componenti
- [WOT - Ionic App](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-ionicApp-Mele)
- [WOT - Front End Dashboard](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-FrontEndAngular-Mele)
- [WOT - Back End Dashboard](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-webapp-backend-DeNunzio)
- [WOT - Back End Raspberry (Nordic)](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-backend-nordic-pi-DeNunzio)
  



Per avviare il progetto andare nella cartella di root e scrivere nel terminale: `ng serve`. Il server è visibile su `http://localhost:4200/`.

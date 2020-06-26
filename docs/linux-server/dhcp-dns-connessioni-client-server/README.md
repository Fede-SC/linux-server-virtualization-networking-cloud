# DNS, DHCP e connessioni client/server

Prima di cominciare partiamo con un po' di comandi utili che possiamo eseguire sulla shell del nostro computer.

```sh
ipconfig #fornisce ip, subnet e gateway della nostra scheda di rete
```
Ma se aggiungo al comando "/all" mi verranno restituiti tanti parametri in più, tra cui la **lease**
```sh
ipconfig/all #fornisce tutti i parametri ottenuti della scheda di rete tra cui la lease
```
La lease la trovo solo nel caso in cui trovo il **DHCP server**.

## DHCP

Se trovo il parametro di DHCP server vuol dire che l'indirizzo ip che ho non è stato assegnato staticamente, ma bensì da un server DHCP.
Sappiamo già che ogni dispositivo, per connettersi a una rete, deve avere un indirizzo IP che lo identifichi. Quando nacquero le prime reti private, questo procedimento era manuale: ogni utente che voleva connettere un computer gli assegnava un 
indirizzo IP. Con il crescere della complessità delle reti, specialmente quelle aziendali, le cose iniziarono a complicarsi e si iniziò a pensare a un 
sistema automatico di assegnazione degli indirizzi IP. Si posero, cioè, le basi di quello che poi divenne il DHCP.

Oggi i server e i router DHCP sono completamente automatizzati e seguono una precisa procedura standardizzata per assegnare gli IP ai dispositivi che si vogliono connettere.

Quindi una volta che ho il DHCP server ho quindi anche il parametro di lease, il quale viene definito in secondi.

Bisogna dire che gli indirizzi IP dinamici non durano per sempre, ma bensì per un preciso numero di giorni (il cosiddetto  "*lease time*") dopo i quali è necessario negoziare un nuovo IP. 
Se lo stesso client di prima richiede nuovamente un indirizzo, di solito ottiene lo stesso già usato in precedenza e lo si può usare per un altro tot 
di giorni.

Un altro parametro che mi fornisce la scheda di rete è il **DNS**.

I DNS fanno parte integrante della scheda di rete, i quali mi permettono di risolvere la conversione dall'indirizzo simbolico (es. www.sito.it) all'indirizzo ip del server di accesso. Vedremo poi come questi funzionano.

## Come funziona una connessione client/server

Ora provare a fare il comando Netstat da PowerShell
```sh
netstat #comando che mi dà come output le connessioni attive del proprio pc nella rete
```
Tale comando può rivelarsi utile anche per vedere i concetti sovra esposti.

Il comando **Netstat** permette anche di specificare quali connessioni corrispondono a una specifica porta

```sh
netstat -n | Select-String -SimpleMatch ":443" #di cui restituirà uno specifico output
```
La 443 si riferisce alla porta destinazione di un server web che parla in https (http è invece la porta 80)
Se non ci sono browser aperti, l'output restituirà 0.

Mettiamo che io sia in client e mi collego a un server web, vedo una tipologia di connessione
tutte TCP (il mondo web lavora infatti su TCP) la quale mi riporta il mio indirizzo ip
e tale indirizzo ip (client) mi riporta a una porta, questo perché per stabilire una connessione non faccio altro che definire una connessione tra una porta sorgente (che varia sempre) e una porta destinazione (porta del server).
La porta sorgente varia sempre perché il sistema dinamicamente associa una porta a una specifica connessione. Se infatti apro 10 schede del browser con 10 siti diversi, avrò 10 porte sorgente che corrispondono a 10 server diversi sulla 443

#### Ma quante porte si possono aprire contemporaneamente?

Le porte vanno dalla 1 alla 65.500, tra cui le prime 24 sono dedicate interamente al sistema operativo, le altre possono essere liberamente utilizzate per l'applicazione.

Quando ho la pagina web attiva naturalemnte significa che ho la connessione stabilita, ma posso avere anche una situazione in cui ho un TIME_WAIT (quando ho aperto una connessione e sto aspettando una risposta dal server), oppure posso avere una situazione CLOSE_WAIT (quando la connessione che si era stabilita è stata chiusa dal server).

Tornando al comando Netstat, questo è utile sia per capire come funzionano le reti, sia per fare problem
solving sulle eventuali problematiche.
Si usa anche nei server, ad esempio per vedere il numero di client collegati.

#### Ping

Altro comando utile per vedere se c'è connettività o meno è il **ping** che punta a un'indirizzo ip di destinazione. Un ping che punta allo stesso indirizzo ip della macchina è definito un "ping in localhost".

```sh
ping <indirizzo ip destinazione> #comando per testare la raggiungibilità di un computer in rete o di un host remoto
ping 93.184.216.34
```
Il ping funziona quando è presente un firewall che filtra il protocollo del ping.

#### Comando ARP

```sh
arp -a #visualizza il contenuto della cache ARP con le diverse corrispondenze tra indirizzi IP e MAC
```

L'**ARP** è il protocollo che viene utilizzato per far comunicare l'ip col MACaddress, cioè in qualche modo per creare una comunicazione verticale tra il livello data-link e il livello di rete.
Se io dò il comando arp sulla mia macchina, esso mi farà vedere quali sono i MACaddress che il mio host (il mio pc) ha identificato nella mia rete.
Infatti ho tutta una serie di indirizzi ip della mia rete locale con il loro MACaddress fisico (che ovviamente variano).
Con il comando arp un certo punto ottengo un fff. Un fff corrisponde a un'associazione tra indirizzi ip e MACaddress, il quale mi dice sostanzialmente che il mio indirizzo della rete di
broadcast (es. 10.1.19.255) corrisponde al broadcast del MACaddress.

In realtà il comando arp permette di fare anche altre cose: io posso cancellare nella mia arp un Indirizzo MAC o addirittura aggiungerlo.
Uno switch si dimenticherà degli ip, ma avrà una tabella di MACaddress.

:::tip
Di solito le reti locali si associano alle classi c (un buon compromesso tra ampiezza e il numero di macchine che possono essere collegate a una dimensione dell'azienda).

Le classi piccole come la "barra 28" sono molto utilizzate per segmentare (subnettare) gli apparati di rete come i router. I router avranno ovviamente
una barra 28 o una barra 30.
:::

Oltre all'ipconfig /all ci sono altri comandi che io posso assegnare.

#### Refresh dell'indirizzo IP

Ci sono delle condizioni in cui il mio pc ha preso l'indirizzo ip dal DHCP, ma non va fino in rete, quindi io in questo caso sono costretto a forzare essenzialmente il rilascio (il rinnovo dell'indirizzo ip dalla mia scheda di rete.
Per fare questa operazione ho due modalità:

1) Dare i comando release e renew, i quali non sono molto importante, ma rilascionp l'indirizzo ip che molto probabilmente sarà quello che già ho ottenuto.

```sh
ipconfig /release /renew #comando di ripristino di rete
```

2) staccare fisicamente il cavo di rete e poi riconnetterlo (metodo più veloce)

3) riavviare il pc (in questo modo, quando il sistema opertivo si inizializza parte il kernel
che fa partire i propri moduli tra cui lo stack della rete TCP/IP e da quel momento
il sistema operativo richiede un indirizzo ip

#### Comandi sul contenuto della Cache DNS del computer

Talvolta si incontrano delle difficoltà nel tentare di visualizzare un sito web, ed il problema potrebbe risiedere proprio nel sistema DNS. Ma ci sono alcuni comandi che possono risolvere questo problema.

```sh
ipconfig /displaydns #comando per visualizzare il contenuto della Cache DNS
```
Dopo aver eseguito quest'ultimo comando, si crea una cache dove io ottengo i path di tutti i miei indirizzi ip che il sistema ha analizzato.

La Cache DNS si può anche svuotare
```sh
ipconfig /flushdns #comando che svuota la Chache DNS
```
Subito dopo verrà ricevuto un messaggio che avvisa che il processo di svuotamento della cache è andato a buon fine.

È particolarmente importante cancellare la cache del proprio sistema client nei casi in cui bisogna fare manutenzione sull'indirizzo ip.

Spiegato semplicemente, l'instaurazione della connessione avviene attraverso lo scambio di tre messaggi:
1) domanda della connessione
2) relativa risposta
3) conferma che la connessione è stata instaurata

Tornando al ping, il tempo medio di risposta dopo aver eseguito tale comando è molto utile per capire quanto la rete è efficiente.
Consiglio di provare a fare un ping su google.it e vedere quanto tempo ci mette a rispondere.
Se ci mettesse meno di due o addirittura di un millisecondo, corrisponde sostanzialmente
a un tempo di rete locale (un tempo di risposta così immediato lo fornisce una rete con connessione molto potente); se ci mettesse, invece, sopra i 20-30 millisecondi vuol dire che la rete è abbastanza scarsa (come l'ADSL).

Se aggiungo al ping il comando -t, esso non si fermerà mai ad elaborare risposte (ping continuo), tant'è che per fermarlo c'è bisogno di premere ctrl + c.

```sh
ping -t <indirizzo ip destinazione> #comando che esegue un ping continuo in un ciclo infinito
ping -t 93.184.216.34
```
Può essere usato nel caso si desiderase verificare continuamente la connessione di rete tra due computer.

Essendo il ping uno strumento da riga di comando progettato per inviare pacchetti di dati verso un indirizzo IP e misurare il tempo intercorso tra l’invio e la risposta del dispositivo sondato, io ho la possibilità di decidere la dimensione del buffer dei dati da inviare.

```sh
ping -l <byte da inviare> <indirizzo ip destinazione> #comando per modificare la dimensione del buffer dei dati da inviare
ping -l 5000 93.184.216.34 #invio 5000 byte
```
Ho anche la possibilità di definire il tempo di attesa massimo

```sh
ping -w <millisecondi> <indirizzo ip destinazione> #comando per modificare il tempo di attesa massimo per ogni richiesta in millisecondi
ping -w 30 93.184.216.34 #definisco un tempo massimo di 30 millisecondi
```

Mentre il ping mi fa vedere il tempo di risposta, il **Traceroute** (o il **Tracert** di windows)
mi permette di verificare tra me e un sito internet quanti rooter ci sono (quanti op ho) e ad ogni op quanti millisecondi ci mette a rispondermi.
```sh
tracert google.it #verifica quanti rooter ci sono tra la mia macchina e google.it
tracert 11.1.0.1
```
Questo comando è particolarmente utile per capire dove eventualmente ho dei colli di bottiglia.
Il primo op che viene rilevato è il gateway, il quale corrisponde all'ipconfig della macchina e risponde che ci ha messo tot millisecondi, in seguito mi dirà che il router gira tutti i miei pacchetti su un proxy. Quindi avrò un meccanismo di proxy che mi darà anche l'ip e mi filtra le porte come con il ping.

## DNS

Vediamo nel dettaglio cosa sono i servizi DNS, che abbiamo già citato sopra.

Alla base del funzionamento di internet, troviamo il sistema dei nomi di dominio (DNS). Senza il servizio offerto dai server DNS, la navigazione nel web sarebbe molto meno intuitiva ed alquanto più complessa. In breve, i DNS sono quei servizi nati con internet per rendere piacevole la navigazione.
Ricordarsi un indirizzo ip è infatti troppo complesso, rispetto che ricordare un nome simbolico.
Ma come funzionano?

Essi hanno una struttura gerarchica (c'è qualcuno che si sente autoritario per risolvere gli indirizzi ip) e laddove il DNS intermedio non è in grado di risolvere un nome simbolico, non fa altro che inoltrare questa richiesta a un DNS superiore a lui. Un domain controller per funzionare utilizza il protocollo DNS, tanto è vero che all'interno di una rete locale io installo un domain controller, installo un servizio DNS server ed eventualmente il mio domain controller può farmi anche da DHCP server.
Ma il mio domain controller che metto nella mia rete locale non è autoritativo, quindi a sua volta io dovrò configurare nella parte del pannello del mio DNS server del mio domain controller il server di inoltro, cioè a chi punto come server di inoltro.
Quindi i DNS sono una struttura gerarchica per fornire tutte le informazioni di domini
con tutte le estensioni.
Nel mondo esistono 13 DNS root, 13 perché è un servizio fondamentale. Paradossalmente se i DNS mondiali non funzionassero ma la struttura di
rete internet continuasse a funzionare nessuno riuscirebbe a lavorare. Quindi i dns root sono assolutamente geolocalizzati, distribuiti nel mondo
e ridondanti.

#### Nslookup

**Nslookup** (*Name System Look Up*) è uno strumento che permette di interrogare un server di nomi per ottenere le informazioni riguardo un dominio o un host e quindi di diagnosticare gli eventuali problemi di configurazione della DNS. Senza argomento, il comando nslookup visualizza il nome e l'indirizzo IP del server di nomi primario e visualizza un invito di comando per l'integrazione.

All'invito basta digitare il nome di un dominio per visualizzarne le caratteristiche. È ugualmente possibile richiedere le informazioni su un host indicando il nome dopo il comando nslookup

```sh
nslookup host.name #comando che interroga il server di nomi primario configurato sul terminale
nslookup google.it
```

Se provo a dare un comando di questo tipo su ad esempio il sito dell'università di Milano,
questo mi dirà che non è autoritativo per risolverlo.
Ciò significa che google per sapere qual'è l'indirizzo ip dell'università di Milano chiede un altro DNS server.

Da default, il comando nslookup interroga il server di nomi primario configurato sul terminale. È tuttavia possibile interrogare un server di nomi specifico.
```sh
nslookup host.name -server.di.nome #comando che interroga un server di nomi specifico
```

È anche possibile modificare il modo di interrogare il comando nslookup
```sh
nslookup –type=MX google.it #set type=mx raccoglie le informazioni riguardo il o i server di messaggeria di un dominio
```
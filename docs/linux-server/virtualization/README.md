# Virtualizzazione

La **virtualizzazione** è nata coi sistemi operativi, negli anni ‘60, in cui già esistevano dei layer di virtualizzazione ma era ancora troppo poco efficiente Dagli anni ‘90 in poi la virtualizzazione comincia a diffondersi e prendere piede con VMware, in cui il suo scopo principale era quello di erogare un'ambiente di test. 

Altri sistemi di virtualizzazione: VirtualBox, Hyper-V e altri sistemi sistemi oper source. 

Tale tecnologia permette una circostanza importante: il fatto che più sistemi operativi possono operare contemporaneamente, a differenza di come questi possano girare nell’hardware. In breve, la virtualizzazione è una tecnologia che ha lo scopo di permettere l'esecuzione di più sistemi operativi nello stesso hardware, astraendo dalle tecniche hardware stesse. 

Indipendentemente da come è costruita la tecnologia di virtualizzazione, io sullo stesso hardware posso per esempio eseguire in maniera concorrente Windows e Linux senza dover costruire un boot loader con più partizioni, nel cui caso dovrei avviare al bootstrap della macchina solo un sistema operativo alla volta (o faccio partire Windows, o faccio partire Linux), mentre con la virtualizzazione posso avere due sistemi operativi entrambi funzionanti. Quando creo una macchina virtuale associo le risorse a un disco fisso e facendo un buon lavoro di ottimizzazione cambieranno completamente alcuni concetti.

#### Guest

Sistema operativo che installo nel mio sistema di virtualizzazione. Guest perché è un ospite, ma il controllo del mio computer ce l’ha sempre il sistema operativo avviato nell’hardware. Il mio sistema operativo guest non sarà più spalmato nel mio disco fisso partizionato, ma corrisponderà bensì a un file. 

#### Come viene visto un SO guest in un sistema di virtualizzazione? 

Esso è visto come un processo. Il disco fisso di un sistema operativo guest è un file. In realtà ci sono due file: uno che è il disco fisso e l'altro che è un file di configurazione con formati diversi a seconda della tecnologia.

#### Quali requisiti devo avere per utilizzare un sistema di virtualizzazione?

Prima di utilizzare la tecnologia di virtualizzazione, dovrò assicurarmi che il mio computer abbia dei prerequisiti necessari: devo avere un sistema operativo a 64bit e devo verificare se delle proprietà intel sono installate

Le varie componenti dell'infrastruttura del sistema di virtualizzazione garantiscono un'alta continuità. 

#### Alta continuità

Garantisce una continuità operativa in situazioni critiche onde evitare perdite di dati in situazioni di downtime (termine che sta per: periodo di momentanea indisponibilità, dovuto a guasto o manutenzione, di un apparecchio informatico e/o dei servizi da esso erogati). Quindi in informatica sono tutte quelle soluzioni che possono garantire la continuità del servizio stesso.

L'alta continuità si gestisce con la ridondanza, cioè io duplico o triplico le risorse per garantire che il mio server web risponda correttamente alle chiamate. 

**Procedura di rollback**: ripristino e riavvio.

Sulla singola macchina virtuale noi eroghiamo i servizi in maniera automatica (stand alone), quindi molte impostazioni sono già assegnate di default. 

#### Ma chi è colui che gestisce tutti questi server che virtualizzo?

La risposta è: dei software di monitoraggio (il cui pannello controlla lo stato di lavorazione di ciascun server). 

#### Nested virtualization

Tecnologia che consente di eseguire un hypervisor (come Hyper-V) all’interno di una macchina virtuale. Utile per i test di configurazione che normalmente richiedono più host.

## Cosa non deve mancare

La virtualizzazione possiede due paradigmi fondamentali: **isolamento** e **incapsulamento**, le quali sono le principali peculiarità che deve garantire. 

### Isolamento

La virtualizzazione deve garantire che i sistemi operativi che eroga (i guest) in nessun caso possano incidere sulle proprie risorse l'uno nell'altro. Quindi, nonostante il fatto che ci sia lo stesso hardware, le risorse che vengono utilizzate dall'uno e dall'altro SO non vanno mai in reciproco conflitto. Ad esempio non capiterà mai che le operazioni che Linux esegue effettuino delle chiamate per occupare delle risorse del mondo Windows. Perciò è come se avrò una separazione che evita che un qualsiasi comportamento di Linux possa causare una sovrascrittura nelle aree di memoria di Windows o viceversa. Dunque il sistema di virtualizzazione, avente simili caratteristiche a un sistema operativo (avrà senza dubbio uno scheduler, un gestore dei processi, una gestione dell'accesso alla memoria), garantisce questo isolamento. Sostanzialmente un sistema operativo guest lavorerà come se avesse un hardware dedicato e ciò rende l’isolamento un requisito fondamentale. Attenzione, per “isolamento” non mi sto riferendo anche al discorso di performance o di prestazioni, ma bensì alla garanzia che le azioni del singolo sistema virtualizzato (il guest) non vadano a influire sulla funzionalità e nell’area di memoria del sistema operativo ospitato. Quindi io posso avere comunque un degrado delle prestazioni a causa invece dell'unità di memoria, perché essa è sempre la medesima. Ad esempio, se io ho 16 giga di memoria e ho due sistemi operativi che in quel momento mi fanno chiamata e dovrebbero occupare un RAM di 16 giga, avrò l'mmu (unità di gestione della memoria) del sistema di virtualizzazione che frammenta e mette in coda, e a causa di questo il tempo di elaborazione sarà influenzato. Non creo però uno stallo, ossia nel caso che Windows va in stallo (in stato not-responsive) non comporta anche il not-responsive del sistema operativo Linux. 

### Incapsulamento

Caratteristica che indica che il mio sistema operativo nella macchina virtuale non corrisponde alla partizione all'interno di un disco fisso, ma risponde in astrazione a un file che può essere flessibile (lo posso liberamente prenderlo e spostarlo). 

## Hypervisor

Conosciuto anche come virtual machine monitor, è il componente centrale e più importante di un sistema basato sulle macchine virtuali. 

Un esempio di Hypervisor è Hyper-V, in cui con esso è possibile creare macchine virtuali su sistemi basati su processori x86-64 che eseguono Windows. Inoltre Hyper-V è compatibile anche con il cloud. 

Nella tecnologia di virtualizzazione fanno parte due tipologie di Hypervisor: il type 1 e il type 2.

### Type 1

In questo caso è il sistema di virtualizzazione ad avere il controllo sull'hardware. Il type 1 è senza dubbio il più efficiente, il più performante e il più sicuro, ma ci sono vantaggi o svantaggi da entrambe le parti. Come esempio citiamo ancora una volta Hyper-V e Xen.

### Type 2

C'è sempre un sistema operativo che ha il controllo dell'hardware e delle risorse e quindi vede il sistema di virtualizzazione come un'applicazione. Un esempio di infrastruttura di questo tipo è VirtualBox, un software che si installa sul proprio computer come una normale applicazione, da cui posso creare la mia macchina virtuale, come altri esempi di tipo 2 abbiamo WMware e Workstation.

#### Come capire quale sistema di virtualizzazione mi conviene usare?

Naturalmente dipende dal modo in cui questo viene usufruito. 

Su un portatile in genere conviene installare un type 2 per fare dei test e quindi in tal caso non c'è la necessità che quella macchina virtuale nell'ambiente di test debba funzionare particolarmente bene, se invece devo erogare un server web conviene installare un tipo 1, anche per semplicità e non un sistema operativo con un software sopra in cui faccio girare il server web, ma installo direttamente un sistema di virtualizzazione che controlla in maniera più efficiente l'hardware e da lì eroga direttamente il mio servizio.

C’è da dire che dappertutto oramai si trovano server di virtualizzazione e non fisici.

## Cluster

La differenza sostanziale tra uno storage e un disco fisso, è che quest'ultimo è pensato per essere collegato alla singola risorsa hardware, mentre lo storage area network invece è pensato per essere collegato via rete a più dispositivi server. Quindi io avrò più dispositivi (ad esempio s1 e s2) con dei protocolli, affinché ci sia un obbiettivo: cioè che il mio sistema operativo (Linux), che sta fisicamente come file, possa essere visto contemporaneamente da s1 e s2. Questo vuol dire che in tali soluzioni devo avere una tecnologia di virtualizzazione che chiamiamo enterprise, la quale abbia al suo interno tutta una serie di funzionalità per costruire un vero e proprio cluster.  

Cluster: (dall'inglese grappolo), è un insieme di computer connessi tra loro tramite una rete telematica. Lo scopo del cluster è distribuire un'elaborazione molto complessa tra i vari computer, aumentando la potenza di calcolo del sistema e/o garantendo una maggiore disponibilità di servizio. 

Ma non devo costruire un cluster a livello di applicazione web o di sistema operativo, ossia io installo il mio server web nella mia macchina Linux stand alone (senza alcun tipo di ridondanza), ma farò a questo livello un sistema di clustering che mi permette di migrare in base alle necessità. Ma quando una macchina viene migrata tutta o in parte su un altro nodo, le due principali condizioni sono che, se io ho un crash, la macchina viene migrata (ad esempio va via la corrente e la macchina riparte), oppure per una questione di performance a un bilanciatore, per cui il sistema decide che il 70% della CPU del primo nodo che va oltre l'occupazione può migrare la macchina. Quindi io riesco a costruire un'infrastruttura ridondata che ha costi anche ridotti. 

Il motivo della virtualizzazione era consolidare, cioè ridurre il numero di server a disposizione, creare dei sistemi più sicuri cercando anche di risparmiare. Quindi se io devo avere cluster per i miei server Windows, devo avere cluster per la parte Linux, devo avere i cluster per la parte database e perciò costruisco essenzialmente un cluster di virtualizzazione. Inoltre con la virtualizzazione tutte le operazioni di migrazione saranno dunque molto più veloci. 

<!--
## $ cp e $ mv
```sh{4}
cp frida.txt lincoln.txt # copia il file frida.txt in un nuovo file lincoln.txt
cp file1 ... <directory> # copia il file/i files specificati nella directory specificata
cp m*.txt scifi/ # copia tutti i file txt che iniziano per m nella cartella scify
# NOTA: vedi wildcards
```
> Ogni esempio visto sopra può essere fatto anche usando `mv`, naturalmente con effetti leggermente diversi:<br>
>`cp` effettua la copia dei file, `mv` li sposta. (ctrl + c vs ctrl + x).<br>
> Ad esempio per rinominare un file `mv file1 file2`

## Wildcards
Oltre ad usare nomi di files possiamo usare dei caratteri speciali, come `*` per **selezionare gruppi di files**. Questi caratteri speciali sono chiamati [wildcards](https://www.tecmint.com/use-wildcards-to-match-filenames-in-linux/). L'* ad esempio seleziona tutti i files nella working directory.

## $ rm
Per eliminare files e cartelle in maniera __*DEFINITIVA*__
```sh{4}
rm file
rm -r directory/ # -r sta per recursive e serve per eliminare la directory ed il suo contenuto, ricorsivamente.
rm directory/* # Elimina ogni file dentro la directory
```
-->
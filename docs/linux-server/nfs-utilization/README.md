# Utilizzo del servizio NFS

Abbiamo già detto che l'NFS è un protocollo standard usato per la condivisione di porzioni di filesystem attraverso una rete locale. Con l'NFS possiamo rendere disponibile, in modo logico, parte di un filesystem situato su una macchina ad un'altra macchina che lo potrà vedere ed usare come fosse presente localmente.

Se siamo arrivati qui, significa che abbiamo già eseguito il comando di intallazione del servizio NFS. [Clicca qui](../nfs-service/README.md) per vedere questo passaggio.
Ora verifichiamo se il servizio in questione è installato e attivo sia sul server che sul client
```sh
service nfs status #comando che serve a verificare se l'nfs è installato
```
Prima di proseguire con la configurazione del server dobbiamo accertarci che anche il servizio rpcbind sia installato. Questo servizio ha, più o meno, le stesse funzionalità di un DNS. rpcbind converte numeri di programma RPC in indirizzi universali.
```sh
service rpcbind status #verifica che l'rpcbind sia installato
```

## Creare una cartella condivisa tra client e server CentOS

Quando si condividono dei file mediante l'utilizzo di un server NFS la comunicazione avviene fra due componenti: il server e i client. Il server rappresenta il computer su cui vengono memorizzati fisicamente i file da condividere, mentre i client rappresentano i computer che avranno accesso alla cartella condivisa del server eseguendone il mount sotto forma di unità disco virtuale. Il sistema NFS deve quindi essere configurato sia sul lato server sia sul lato client per permettere le comunicazioni.

### Configurazione nel server

La macchina del server ospiterà tutti i file da condividere in rete. Il server NFS deve essere in funzione e collegato alla rete per permettere ai client di eseguire il mount della cartella di rete che contiene i dati da condividere.

Ora sul server, per prima cosa, creiamo la directory da condividere. 

Entriamo in root.

```sh
cd / #comando per entrare nella root
```
Creiamo una cartella all'interno della root
```sh
mkdir directorycondivisa #crea una nuova cartella all'interno della directory corrente
```
**mkdir** è un comando dei sistemi operativi Unix che crea una o più directory.

Per completezza verificare che la directory è stata creata.
```sh
ls #comando che elenca tutti gli oggetti all’interno della directory corrente (in questo caso /root)
```
Verificare se tra tutti i file presenti c'è anche il nome della cartella. 

Proseguiamo la configurazione andando a modificare il file exports all’interno della directory /etc.
Il file exports contiene un elenco delle risorse locali che devono essere rese accessibili ai client nfs.

```sh
vi /etc/export #apriamo il file export nella cartella /etc (si ricorda che vi si usa per aprire i file)
```
Una volta aperto il file digitiamo da tastiera i per inserire dati in input in modo da modificare il file.

A questo punto inseriamo il path della cartella di condivisione appena create, l’indirizzo IP guest (del client a cui deve essere condivisa la cartella) e dei permessi/comandi opzionali.

:::tip Permessi
* **ro** => per consentire l’accesso di sola lettura (read only)
* **rw** => per consentire l’accesso di lettura e scrittura (read and write)
* **no_root_squash** => per consentire al client di scrivere nella cartella
* **sync** => consente al client di accedere alla risorsa solamente se essa è “committata”
(fissata, rende disponibile i dati condivisi solo quando sono fisicamente scritti)
* **async** => assicura l'indipendenza da eventuali "commit"
:::
```
/directorycondivisa 192.168.10.10(rw, no_root_squash, sync) 
```
Ricordarsi che per salvare i file bisogna fare la cominazione di tasti ESC + (shift:) wq! e Invio

Le configurazioni contenute nel file exports in realtà non sono utilizzate direttamente, ma devono essere compilate ed inserite in un file binario etab (con path: /var/lib/nfs/etab) che verrà utilizzato ad ogni richiesta di mount da parte di un client.

```sh
/usr/sbin/exportfs #Per compilare il file binario sopraesposto
```
Il comando **exportfs** si occupa di mantenere la tabella di export aggiornata, (si tratta di quella che abbiamo definito nel file export con i permessi aggiuntivi).
```sh
exportfs -av #visualizziamo la tabella di export ed eventualmente aggiungere un altro parametro
```
:::tip Comandi per exportfs
* **-a** => aggiungere
* **-v** => visualizzare
* **-r** => per modificare, aggiungere o rimuovere un'altra directory definita nel file export
:::

Prima di passare alla configurazione del client, bisogna abilitare le seguenti porte sul firewall che permettano la condivisione della directory:

* @ porta 111: servizio NFS
* @ porta 2049: servizio RPCBIND
```sh
firewall-cmd --zone=public --add-port=<n° porta> --permanent #comando che abilita una porta sul firewall
```
*permanent* significa “per sempre”. Ometterla sarebbe significherebbe “fino al prossimo reboot”.

Dovrebbe bastare aggiungere solo la porta 111 sia tcp, sia udp.
```sh
firewall-cmd --zone=public --add-port=111/tcp --permanent
firewall-cmd --zone=public --add-port=111/udp --permanent
firewall-cmd --zone=public --add-port=2049/tcp --permanent #opzionale
```

### Configurazione nel client

Arrivati a questo punto, creiamo il percorso locale dalla quale la cartella condivisa (directorycondivisa) sia accessibile.
```sh
cd / #ci spostiamo in root
mkdir cartellalocaleclient #creiamo una nuova cartella all'interno di root
cd cartellalocaleclient #ci spostiamo in questa directory appena creata
mkdir cartellacondivisa #creiamo una cartella che accederà alla directorycondivisa del server
```
Abbiamo definito una cartella nel client a cui accedere alle risorse che sono presenti nella cartella directorycondivisa del Server (questo è il path: /cartellalocaleclient/cartellacondivisa). Ma per ora abbiamo definito solo il percorso, ci manca ancora montare la cartella da condividere dal server al client.

Ora controlliamo quali mount point sono disponibili sul server.

```sh
showmount -e <host> #comando che mostra i mounth point diponibili su uno specifico host
```
Come host mettiamo l'indirizzo ip statico del server
```sh
showmount -e 192.168.10.100
```
Controlliamo se la nostra directorycondivisa sia presente nella lista di esportazione. Se presente possiamo montare la cartella condivisa sul nostro percorso locale

```sh
mount <host>:<cartellaRemota> <mountLocale> #comando per montare una cartella in esportazione di un'altro host in uno specifico path della macchina
```

Per questo comando inseriamo quindi il percorso /cartellalocaleclient/cartellacondivisa (ricordiamo  che sarà la cartellacondivisa del client ad accedere alle risorse della directorycondivisa del server).

```sh
mount 192.168.10.100: /directorycondivisa /cartellalocaleclient/cartellacondivisa
```
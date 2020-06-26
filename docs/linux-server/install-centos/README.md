# Installazione CentOS nella VM

**CentOS** è un sistema operativo di distribuzione Linux derivata da Red Hat Enterprise Linux. Pur installabile su architetture desktop, è un sistema concepito, sviluppato e utilizzato per gli ambienti server.

Ora, nella schermata di avvio della VM che abbiamo appena creato, selezionare Install

![install-centos7](../assets/install-centos7.png)

Dopodiché comparirà un’interfaccia iniziale in cui scegliere la lingua (scegliamo inglese).

![centos-lang](../assets/centos-lang.png)

![install-summary](../assets/install-summary.png)

Su “Keyboard” impostiamo la tastiera italiana 

![install-keyboard](../assets/install-keyboard.png)

Su “Date & Time” impostiamo il fuso orario Europe/Rome Timezone

![install-timezone](../assets/install-timezone.png)

Su “Installation destination” scegliamo l’opzione “I will configure partitioning” > Done

![install-destination](../assets/install-destination.png)

selezionare “standard patition” > clic su “+” per impostare le mie partizioni.

![install-manual-partitioning](../assets/install-manual-partitioning.png)

In questo caso ne mettiamo tre: 

* La prima mettiamo “swap” come Mount Point e 1G come Desired Capacity 

* Nella seconda mettiamo “/boot/efi” come Mount Point e 100M come Desired Capacity 

* Nella terza mettiamo “/” (root) come Mount Point e lasciamo vuoto il campo Desired Capacity in modo che venga messa automaticamente la quantità di memoria restante.

Dopodiché clic su “Done” > e confermare i cambiamenti appena effettuati (Accept Changes). 

![install-addmounthpoint](../assets/install-addmounthpoint.png)

![install-partition](../assets/install-partition.png)

Dopo tutti questi passaggi posso finalmente far avviare la procedura di installazione. Quindi clic su “Begin installation”. 

![install-begin](../assets/install-begin.png)

A questo punto apparirà la mia schermata che mostra l’avanzamento dell’installazione, ma intanto io posso impostare la password del root. Quindi andare su “Root password” e impostare la mia password (se stiamo lavorando per fare una semplice esercitazione in locale non è necessario immetterne una tanto sicura, quindi in casi come questi inseriamo sempre un nome facile da ricordare come “paperino”). 

![install-rootpassword](../assets/install-rootpass.png)

Una volta che vedo il processo di installazione terminato fare clic su “Reboot”. Di cui poi comparirà la schermata di login.

![install-reboot](../assets/install-reboot.png)

::: tip Credenziali di esempio
+ localhost login: root 
+ Password: paperino 
:::

![centos-login](../assets/centos-login.png)

<!--
> Gli [alias](https://alvinalexander.com/blog/post/linux-unix/create-aliases) non sono altro che metodi alternativi per chiamare un comando.<br>
> ad esempio con `alias search=grep` d'ora in poi grep si chiamerà anche search! (all'interno della sessione a meno che non sia specificato nel file sopra citato)


## nano & .bash_profile
nano è un **editor** di testi completamente text based e minimale, non offre molte funzionalità, ma è comodo per scrivere linee di **configurazione** in giro per il File System.
```sh
nano ~/.bash_profile # apre il file contenente alcune configurazioni di bash
source ~/.bash_profile # Carica le impostazioni contenute nel .bash_profile senza dover chiudere e riaprire il terminale
```
> `~` Identifica il path assoluto per accedere alla home dell'utente della sessione bash.
:::warning
Con `su` si può accedere ad altri utenti dentro la sessione bash, **non è la stessa cosa di cambiare utente** quando si fa il reboot del pc, si parla appunto di un envinronment fine a se stesso, ovvero all'interno del terminale.
:::

![bash-screenshots-05](../assets/bash-screenshots-05.png)
![bash-screenshots-06](../assets/bash-screenshots-06.png)

Ora all'inizio di ogni sessione comparirà un messaggio di benvenuto

## Le variabili
```sh
# ~/.bash_profile
export USER="handgull"
```
```sh
echo $USER # Stamperà a video "handgull"
```

### Bonus: Pixel-art
Se può interessare ho fatto delle variabili che messe nel `~/.bash_profile` forniscono delle pixel art, clicca [qui](./pixel-art)!

### Variabili di ambiente
Bash ci fornisce alcune variabili già valorizzate, come ad esempio `$PS1` o `'$HOME`:
```sh
echo $PS1 # Stampa il valore della variabile che si occupa della shell prompt
export PS1="$ " # Modifica la shell prompt, CONSIGLIO: da sperimentare da terminale, per modificare solo la sessione corrente
echo $HOME # Stampa il path assoluto associato alla home dell'utente
echo $PATH # Stampa la lista di tutti i PATH degli eseguibili.
env # Stampa a video ogni variabile d'ambiente, con il valore associato
```

![bash-screenshots-08](../assets/bash-screenshots-08.png)

> Anche in questo screen si può notare come $PS1 sia stata modificata di valore, portando ad una modifica della shell prompt<br>
> Come potete vedere evidenziato in **rosso** è anche presente il path `/bin`, proviamo a non sottointenderlo:
```sh
/bin/pwd # Lancia il comando pwd specificando il path assoluto, che è implicito grazie a $PATH
```
```sh
# ~/.bash_profile
export PATH=<nuovo_path_assoluto>:$PATH # Aggiunge un path ai PATH degli eseguibili accessibili direttamente da Bash
# NOTA: il carattere : separa i path gli uni dagli altri
```
::: tip
Questo è utile quando ad esempio vi è un eseguibile con path `/directory/eseguibile` e si vuole rendere l'eseguibile **accessibile** da qualunque path specificandone solo il nome (in questo caso "eseguibile")
:::
-->
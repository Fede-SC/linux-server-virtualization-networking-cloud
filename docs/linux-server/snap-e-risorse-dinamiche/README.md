# Snapshot e risorse dimaniche su Hyper-V

Installeremo su Hyper-V un sistema operativo Windows 10 su macchina virtuale, e su questa vedremo come cambiare dinamicamente le risorse su Hyper-v e come effettuare delle snapshot tramite i checkpoint.

## Nuova macchina virtuale con Windows 10 Business
* Nome macchina: Win10
* Generazione 1
* Memoria: 2024MB
* Connessione: non connessa
* Cambiare il percorso del disco rigido virtuale in SSD (disco D:) e lasciare le dimensioni del disco così come sono
* Inserire l'ISO con Windows 10

Ora sulla nuova macchina virtuale installiamo Windows 10. Avviamo la macchina.

Selezionare Lingua, Regione e Keyboard Layout e premere Next.

![languageWin10](../assets/languageWin10.png)

Selezionare il sistema operativo desiderato e premere Next (Windows 10 Enterprise)

![win10-enterprise](../assets/win10-enterprise.png)

Attendere il termine dell’installazione.

![wait-install-win10](../assets/wait-install-win10.png)

Selezionare la Region e premere Yes.

![select-region-win10](../assets/select-region-win10.png)

Selezionare il Keyboard Layout e premere Yes.

![keyboard-win10](../assets/keyboard-win10.png)

Selezionare Skip.

![skip-win10](../assets/skip-win10.png)

Selezionare “I don’t have internet”

![connection-win10](../assets/connection-win10.png)

Selezionare “Continue with limited setup”.

![limited-setup-win10](../assets/limited-setup-win10.png)

Inserire un nome utente e premere Next (Admin)

![admin-win10](../assets/admin-win10.png)

Inserire la Password e premere Next (paperino)

![password-win10](../assets/password-win10.png)

Confermare la password e premere Next.

![confirm-password-win10](../assets/confirm-password-win10.png)

Creare la prima security answer e premere Next.

![first-security-answer-win10](../assets/first-security-answer-win10.png)

Creare la seconda security answer e premere Next.

![second-security-answer-win10](../assets/second-security-answer-win10.png)

Creare la terza security answer e premere Next.

![third-security-answer-win10](../assets/third-security-answer-win10.png)

Selezionare No.

![no-history-win10](../assets/no-history-win10.png)

Selezionare Decline.

![decline-assistant-win10](../assets/decline-assistant-win10.png)

Selezionare “Don’t use online speech recognition” e premere Accept.

![online-voice-win10](../assets/online-voice-win10.png)

Selezionare “No” e premere Accept.

![location-win10](../assets/location-win10.png)

Selezionare “No” e premere Accept.

![find-device-win10](../assets/find-device-win10.png)

Selezionare Basic e premere Accept.

![diagnostic-data-win10](../assets/diagnostic-data-win10.png)

Selezionare “No” e premere Accept.

![inking-typing-win10](../assets/inking-typing-win10.png)

Selezionare “No” e premere Accept.

![tailord-experience-win10](../assets/tailord-experience-win10.png)

Selezionare “No” e premere Accept.

![advertising-win10](../assets/advertising-win10.png)

Attendere il completamento dell’installazione.

![wait-install2-win10](../assets/wait-install2-win10.png)

## Come cambiare dinamicamente le risorse di una VM

Ora espandiamo il disco virtuale della VM usando le impostazioni di Hyper-V.

Clic destro sulla VM > impostazioni

![screen-win10-impostazioni](../assets/screen-win10-impostazioni.png)

Sotto Controller IDE 0 selezionare Unità disco rigido > clic sul bottone "Modifica"

![screen-win10-ide](../assets/screen-win10-ide.png)

Apparirà una finestra che si occuperà di guidare l'utente alla modifica del disco rigido virtuale. Su questa cliccare il bottone "Avanti" fino alla sezione "Scelta azione".

Su "Scelta azione" scegliere l'opzione "Espandi" > Avanti

![win10-scelta-azione](../assets/screen-win10-scelta-azione.png)

In "Espansione disco rigido virtuale" impostare 200 GB per le nuove dimensioni > Fine

![screen-win10-scelta-dimensioni](../assets/screen-win10-scelta-dimensioni.png)

Ora ridimensioniamo il disco virtuale della VM con il Computer Management del Windows 10 installato.

Avviare il Computer Management

![win10-computer-management](../assets/win10-computer-management.png)

Aperto il Computer Management selezionare Disk Management e notare che le dimensioni effettive del disco si sono espanse fino a 200 GB (le stesse che abbiamo configurato sulle impostazioni di Hyper-V).

![win10-disk-management](../assets/win10-disk-management.png)

Notare che la dimensione del C: al momento è di 150 GB, mentre ci sono 48 GB di spazio non allocato.

Tasto destro nella casella C: > Extend Volume...

![win10-disk-management-extend](../assets/win10-disk-management-extend.png)

A questo punto espandere il volume C: per tutta la memoria disponibile.

![win10-extend-volume](../assets/win10-extend-volume.png)

![win10-extend-volume2](../assets/win10-extend-volume2.png)

![win10-extend-volume3](../assets/win10-extend-volume3.png)

Notare che ora non c'è più spazio di memoria non allocata, tutta la memoria disponibile è stata occupata dal volume C:

![win10-disk-management2](../assets/win10-disk-management2.png)

Adesso proviamo a ridurre il volume usando sempre il Computer Management di Windows 10.

Sempre sul volume C: > tasto destro > Shrink Volume...

![win10-disk-management-shrink](../assets/win10-disk-management-shrink.png)

Reimpostare le dimensioni del volume C: a 50000 MB > Shrink

![win10-volume-shrink](../assets/win10-volume-shrink.png)

Abbiamo esteso e ridotto il volume C: A questo punto siamo ritornati alla situazione iniziale

![win10-disk-management](../assets/win10-disk-management.png)

Ora riduciamo il disco virtuale della VM usando le impostazioni di Hyper-V in modo da tornare alla configurazione iniziale.

Clic destro sulla VM > impostazioni

![screen-win10-impostazioni](../assets/screen-win10-impostazioni.png)

Sotto Controller IDE 0 selezionare Unità disco rigido > clic sul bottone "Modifica"

![screen-win10-ide](../assets/screen-win10-ide.png)

Apparirà una finestra che si occuperà di guidare l'utente alla modifica del disco rigido virtuale. Su questa cliccare il bottone "Avanti" fino alla sezione "Scelta azione". Notare che ora è apparsa anche l'opzione "Riduci" (questo perché ho precedentemente espanso le dimensioni del disco rigido virtuale a più di 152 GB).

Scegliere l'opzione "Riduci" > Avanti

![screen-win10-riduci](../assets/screen-win10-riduci.png)

Inserire la dimensione a 152 GB > Fine.

![screen-win10-riduci-dimensioni](../assets/screen-win10-riduci-dimensioni.png)

## Come creare un checkpoint in Windows 10

Avviare la macchina virtuale con Windows 10

Ora andiamo a fare una piccola modifica nella nostra macchina virtuale, come per esempio creare un file di testo in un percorso qualsiasi e poi aprirlo.

![test-checkpoint-vm](../assets/test-checkpoint-vm.png)

Sempre sull'interfaccia di Hyper-V, selezionare la macchina virtuale > Punto di controllo

![screen-menu-checkpoint](../assets/screen-menu-checkpoint.png)

Il punto di controllo creato per quella macchina virtuale verrà mostrato direttamente nell'interfaccia grafica di Hyper-V

![screen-hyperv-checkpoint](../assets/screen-hyperv-checkpoint.png)

Ora che è stato creato un checkpoint, apportare una modifica alla macchina virtuale e successivamente applicare il checkpoint per ripristinare lo stato salvato della macchina virtuale.

Chiudere il file di testo se è ancora aperto ed eliminarlo dal desktop della macchina virtuale.

![test-checkpoint-vm-deletetxt](../assets/test-checkpoint-vm-deletetxt.png)

Aprire la console di gestione di Hyper-V, fare clic con il pulsante destro del mouse sul checkpoint standard e selezionare Applica.

![hyperv-checkpoint-apply](../assets/hyperv-checkpoint-apply.png)

Selezionare Applica nella finestra di notifica Applica punto di controllo.

![hyperv-checkpoint-apply2](../assets/hyperv-checkpoint-apply2.png)

Dopo l'applicazione del checkpoint, si noti che non solo è presente il file di testo, ma il sistema è nello stato esatto in cui si trovava quando il checkpoint è stato creato. In questo caso Blocco note è aperto e il file di testo è stato caricato.

![return-vm-aftercheckpoint](../assets/return-vm-aftercheckpoint.png)
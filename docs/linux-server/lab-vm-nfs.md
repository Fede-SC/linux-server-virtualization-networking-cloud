---
prev: ./
next: false
---
# Laboratorio: creare due VM CentOS, un NFS Server e un Client

#### Il server deve essere: 

* Una macchina virtuale di generazione 1 

* Nome: ServerNfs 

* RAM: 1 giga 

* Hard disk: 16 giga 

* Partizionamento: 1 giga di swap, 5 giga di root, 10 giga di /datinfs 

* Rete: ExtSwitch (rete esterna), DHCP 

#### Il client deve essere: 

* Una macchina virtuale di generazione 1 

* Nome: ClientNfs 

* RAM: 1 giga 

* Hard disk: 6 giga 

* Partizionamento: 1 giga di swap, 5 giga di root 

* Rete: ExtSwitch, DHCP 

:::warning
Si ricorda di disabilitare il Kdump e i Checkpoint. 
:::

<!--
Filesystem:
```
bicycle-world-ii
|—— brands.txt
|—— freight/
|   |—— messenger/
|   |—— porteur/
|—— mountain/
|   |—— downhill/
|   |   |—— heavyweight/
|   |   |—— lightweight/
|   |—— hardtail/
|—— racing/
    |—— road/
    |—— track/
```
Compito:
1. Stampare a video la Working Directory.
2. Stampare la lista dei files e delle cartelle presenti nella directory.
3. Cambiare cartella ed andare in `freight/`
4. Stampare nuovamente la lista dei files e delle cartelle presenti nella directory.
5. Cambiare cartella ed andare in `porteur/`
6. Tornare alla cartella iniziale con un solo comando, tramite [path relativo](https://it.wikipedia.org/wiki/Percorso#Percorsi_relativi_e_assoluti).
7. Cambiare cartella ed andare in `mountain/downhill/` con un solo comando.
8. Creare due file vuoti: `dirt.txt` e `mud.txt`
9. Stampare la lista dei files e delle cartelle presenti nella directory.
10. Creare una cartella di nome `safety/`
11. Creare una cartella `bmx/` nella cartella `bicycle-world-ii` **SENZA** cambiare directory
12. Creare due file `tricks.txt` e `models.txt` nella cartella `bmx/` **SENZA** cambiare directory, in un unico comando.
-->
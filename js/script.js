console.log('Boolzapp')

const contacts = [
    {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent',
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent',
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received',
            }
        ],
    },
    {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro B.',
        avatar: '_4',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro L.',
        avatar: '_5',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },
    {
        name: 'Claudia',
        avatar: '_6',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novit???',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Federico',
        avatar: '_7',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che ?? il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Davide',
        avatar: '_8',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
];


// soluzione ciclando con for
// for (let i=0; i<contacts.length; i++){
//     const contact = contacts[i]
//     for (let j=0; j<contact.messages.length; j++) {
//         contact.messages[j].modalActive = false
//     }
// };

// soluzione ciclando con map e forEach
contacts.map(contact => {
    contact.messages.forEach(message => {
        message.modalActive = false
    });
    return contact
});

const boolzapp = new Vue({
    el: '#boolzapp',
    data: {
        myProfile: {
            name: 'Stefano',
            avatar: '_mine'
        },
        contacts,
        activeContact: undefined,

        // key per aggiungere un mex all'enter dell'input collegata al value 
        newMessage: '',
        // search bar
        searchBar: '',

    },
    methods: {
        // function per passare l'url delle immagini in base all'avatar
       imgURLAvatar: (id) => `img/avatar${id}.jpg`,

        // function last message
        lastMessage(singoloContatto) {
            const messages = singoloContatto.messages;
            const lastMessage = messages[messages.length - 1].message
            if (lastMessage.length > 30) {
                return lastMessage.slice(0, 30) + '...'
            }
            return (messages.length > 0) ? lastMessage : ''
        },

        // function to return the last date
        returnLastHour: (singoloContatto) => singoloContatto.messages[singoloContatto.messages.length - 1].date,

        // function per convertire il nostro formato data in uno internazionale per ricavare l'ora
        convertFromStringToDate(responseDate) {
            if(!isNaN(responseDate[0])){
                let dateComponents = responseDate.split(' ');
                let datePieces = dateComponents[0].split("/");
                let timePieces = dateComponents[1].split(":");
                return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
                                    timePieces[0], timePieces[1], timePieces[2]))
            } 
            // siccome la data che inserisco io ?? gi?? in formato internazionale metto il controllo
            return responseDate
        },

        // function per far ritornare l'ora nel formato che voglio io 
        returnHour(messageDate) {
            return this.convertFromStringToDate(messageDate).toLocaleTimeString('it-IT', {
                hour: '2-digit',
                minute: '2-digit',
              });
        },

        // function to show the last received message in top right side area
        lastReceivedMessage() {
            const messaggiRicevuti = this.activeContact.messages.filter(messaggio => messaggio.status == 'received');
            if (messaggiRicevuti.length > 0) {

                    const date = this.convertFromStringToDate(messaggiRicevuti[messaggiRicevuti.length-1].date);
                    const day = date.toLocaleDateString();
                    const time = date.toLocaleTimeString('it-IT', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    return `${day} ${time}`                
            }
        },

        // function per passare l'indice del conctact selezionato dall'array 
       setActiveContact(element) {
            this.activeContact = element,
            console.log(this.activeContact)
       },

       //function per passare il nuovo mex nell'array
       pushNewMessage(i) {
            if ((this.newMessage.trim()).length > 0) {
                
                this.activeContact.messages.push(
                    {
                        date: new Date(),
                        message: this.newMessage,
                        status: 'sent',
                        modalActive: false
                    }
                ),
                setTimeout(() =>{
                    this.activeContact.messages.push(
                        {
                            date: new Date(),
                            message: 'Ok',
                            status: 'received',
                            modalActive: false
                        }
                    )
                }, 1000)
            }
            this.newMessage = ''
       },

    //    funzione per cambiare il valore della booleana in modo da visualizzare il modal
       showModal(contatto) {
           if (!contatto.modalActive){
               this.activeContact.messages.forEach(message => message.modalActive = false)
            };
            contatto.modalActive = !contatto.modalActive;

       },

    //    function per togglare il modal se premo fuori dal messaggio
       refreshActiveModal() {
           if (this.activeContact) {
            const messaggi = this.activeContact.messages;
                messaggi.forEach(messaggio => messaggio.modalActive = false);

                /* soluzione con ciclo for
                for (let i=0; i < messaggi.length; i++) {
                    const messaggio = messaggi[i];
                    if (messaggio.modalActive) {
                        messaggio.modalActive = !messaggio.modalActive;
                    }
                }
                */
       }},

    //    function per cancellare il mex
       deleteMessage(indice) {
           this.activeContact.messages.splice(indice, 1)
       },

       backMenu() {
           this.activeContact = undefined
       },

       displayLeftInMediaQuery() {
           if (!this.activeContact) {
               return "display-query"
           }
       },

       displayRightInMediaQuery() {
        if (this.activeContact) {
            return "display-query"
        }
    }
    },

    // computed property per filtrare il mio array in base alla searchbar
    computed: {

        filteredContacts() {
   
            return this.contacts.filter((contact) => {
               return contact.name.toLowerCase().match(this.searchBar.toLowerCase())})


            /* opzione alternativa con indice array ma non funzionante

            let newIndex = -1;
            return this.contacts.filter((contact, index) => {
                const isActiveIndex = this.activeContact === index;
               const result = contact.name.toLowerCase().match(this.searchBar.toLowerCase()) 
               || isActiveIndex ;
               
               if (result) {
                    newIndex++;
                    if (isActiveIndex) {
                        this.activeContact = newIndex
                    }
               }
              return result }
            )

            */
            
        }
    }
});

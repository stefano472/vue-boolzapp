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
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
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
                message: 'Ciao Claudia, hai novità?',
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
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
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
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
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

const boolzapp = new Vue({
    el: '#boolzapp',
    data: {
        contacts,
        activeContact: null,
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
            return (messages.length > 0) ? messages[messages.length - 1].message : ''
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
            // siccome la data che inserisco io è già in formato internazionale metto il controllo
            return responseDate
        },

        // function per far ritornare l'ora nel formato che voglio io 
        returnHour(messageDate) {
            return this.convertFromStringToDate(messageDate).toLocaleTimeString('it-IT', {
                hour: '2-digit',
                minute: '2-digit',
              });
        },

        // function per passare l'indice del conctact selezionato dall'array 
       setActiveContact(i) {
            this.activeContact = i
       },
       //function per passare il nuovo mex nell'array
       pushNewMessage(i) {
            if ((this.newMessage.trim()).length > 0) {
                
                this.filteredContacts[i].messages.push(
                    {
                        date: new Date(),
                        message: this.newMessage,
                        status: 'sent'
                    }
                ),
                setTimeout(() =>{
                    this.filteredContacts[i].messages.push(
                        {
                            date: new Date(),
                            message: 'Ok',
                            status: 'received'
                        }
                    )
                }, 1000)
            }
            this.newMessage = ''
       },
    },
    // computed property per filtrare il mio array in base alla searchbar
    computed: {
        filteredContacts() {
           return this.contacts.filter((contact) => {
               return contact.name.toLowerCase().includes(this.searchBar.toLowerCase())})
        }
    }
})
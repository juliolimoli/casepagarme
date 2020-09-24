
const pagarme = require('pagarme');
pagarme.client.connect({ api_key: 'ak_test_dtnWfVMzW9uXAN3XW84M758Byo02m8' })
  .then(client => client.transactions.create({
    "amount": 801000,
    "card_number": "376449047333005",
    "card_cvv": "1234",
    "card_expiration_date": "1222",
    "card_holder_name": "Julio Limoli Silva",
    "customer": {
      "external_id": "#1",
      "name": "Júlio Limoli Silva",
      "type": "individual",
      "country": "br",
      "email": "juliolimolisilva@gmail.com",
      "documents": [
        {
          "type": "cpf",
          "number": "30621143049"
        }
      ],
      "phone_numbers": ["+5519988456979"],
      "birthday": "1994-07-04"
    },
    "billing": {
      "name": "Trinity Moss",
      "address": {
        "country": "br",
        "state": "sp",
        "city": "Cotia",
        "neighborhood": "Rio Cotia",
        "street": "Rua Matrix",
        "street_number": "9999",
        "zipcode": "06714360"
      }
    },
    "shipping": {
      "name": "Neo Reeves",
      "fee": 1000,
      "delivery_date": "2000-12-21",
      "expedited": true,
      "address": {
        "country": "br",
        "state": "sp",
        "city": "Cotia",
        "neighborhood": "Rio Cotia",
        "street": "Rua Matrix",
        "street_number": "9999",
        "zipcode": "06714360"
      }
    },
    "items": [
      {
        "id": "r123",
        "title": "Red pill",
        "unit_price": 250000,
        "quantity": 1,
        "tangible": true
      },
      {
        "id": "b123",
        "title": "Blue pill",
        "unit_price": 250000,
        "quantity": 1,
        "tangible": true
      },
      {
        "id": "g123",
        "title": "Green pill",
        "unit_price": 300000,
        "quantity": 1,
        "tangible": true
      },
    ],
    "split_rules": [
      {
        "recipient_id": "re_ckfe90pgc0f0csw6e4u2f9v9d",
        "percentage": 60,
        "liable": true,
        "charge_processing_fee": true
      },{
        "recipient_id": "re_ckfe90xbd0etpoz6dbhdyf0kq",
        "percentage": 10,
        "liable": true,
        "charge_processing_fee": true
      },{
        "recipient_id": "re_ckfe75rh20epzou6dducyspce",
        "percentage": 30,
        "liable": true,
        "charge_processing_fee": true
      }
  ],
  }))
  .then(transaction => {console.log('A transação de ID: '+transaction.tid+' foi realizada.');var tranid = transaction.tid; saldo1(tranid)})

  .catch(exception => console.log(exception.response))


  /*---------------------------------------------------------------------------------------------------------------------


  Retorno do saldo de cada recebedor.


  */

 function saldo1(tranid){

  pagarme.client.connect({ api_key: 'ak_test_dtnWfVMzW9uXAN3XW84M758Byo02m8' })
  .then(client => client.balance.find({
  recipientId: 're_ckfe90pgc0f0csw6e4u2f9v9d'
  }))
  .then(balance => console.log('O recebedor 1 possui: '+ balance.waiting_funds.amount + ' de saldo.'))
  pagarme.client.connect({ api_key: 'ak_test_dtnWfVMzW9uXAN3XW84M758Byo02m8' })
  .then(client => client.balance.find({
  recipientId: 're_ckfe90xbd0etpoz6dbhdyf0kq'
  }))
  .then(balance => {console.log('O recebedor 2 possui: '+ balance.waiting_funds.amount + ' de saldo.')})
  pagarme.client.connect({ api_key: 'ak_test_dtnWfVMzW9uXAN3XW84M758Byo02m8' })
  .then(client => client.balance.find({
  recipientId: 're_ckfe75rh20epzou6dducyspce'
  }))
  .then(balance => {console.log('O recebedor 3 possui: '+ balance.waiting_funds.amount + ' de saldo.'); estorno(tranid)})
  

  }
  
 //------------------------------------------------------------------------------------------------------------------------
  /*----------------------------------------------------------------------------------------------------------------------

  Estorno da transação.


  */
 function estorno(tranid){


 pagarme.client.connect({ api_key: 'ak_test_dtnWfVMzW9uXAN3XW84M758Byo02m8' })
   .then(client => client.transactions.refund({
     id: tranid
   }))
  .then(transactions => {console.log('A transação '+tranid+' foi estornada.'); saldo2()})
   }
     /*---------------------------------------------------------------------------------------------------------------------


  Retorno do saldo de cada recebedor.


  */
 function saldo2(){

 pagarme.client.connect({ api_key: 'ak_test_dtnWfVMzW9uXAN3XW84M758Byo02m8' })
 .then(client => client.balance.find({
   recipientId: 're_ckfe90pgc0f0csw6e4u2f9v9d'
 }))
 .then(balance => console.log('Agora o recebedor 1 possui: '+ balance.waiting_funds.amount + ' de saldo.'))
 pagarme.client.connect({ api_key: 'ak_test_dtnWfVMzW9uXAN3XW84M758Byo02m8' })
 .then(client => client.balance.find({
   recipientId: 're_ckfe90xbd0etpoz6dbhdyf0kq'
 }))
 .then(balance => console.log('Agora o recebedor 2 possui: '+ balance.waiting_funds.amount + ' de saldo.'))
 pagarme.client.connect({ api_key: 'ak_test_dtnWfVMzW9uXAN3XW84M758Byo02m8' })
 .then(client => client.balance.find({
   recipientId: 're_ckfe75rh20epzou6dducyspce'
 }))
 .then(balance => console.log('Agora o recebedor 3 possui: '+ balance.waiting_funds.amount + ' de saldo.')) 
}
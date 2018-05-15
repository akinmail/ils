const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const axios =  require('axios');

const randomBytesAsync = promisify(crypto.randomBytes);




exports.getOffers = (req, res, next) => {
  //console.log(req);
  axios.get('https://api.interswitchng.com/lending-service/api/v2/offers?channelCode=QTWEBSITE&customerId='+req.query.customerId+'&amount='+req.query.amount, { 'headers': { 'Authorization': req.header('Authorization') } })
  .then(function (response) {
    console.log(response);
    res.send(response.data);
    //return response;
  })
  .catch(function (error) {
    console.log(error);
    //return res.json(error);
    res.send(error);
  });  
}

exports.getPaymentMethods = (req, res, next) => {
  //console.log(req);
  axios.get('https://api.interswitchng.com/lending-service/api/v1/users/' + req.params.customerId+'/payment-methods?channelCode=QTWEBSITE', { 'headers': { 'Authorization': req.header('Authorization') } })
  .then(function (response) {
    console.log(response);
    res.send(response.data);
    //return response;
  })
  .catch(function (error) {
    console.log(error);
    //return res.json(error);
    res.send(error);
  });
}

exports.acceptOffer = (req, res, next) => {
  var data = req.body;
  //console.log(req.params.offerId);
  axios.post('https://api.interswitchng.com/lending-service/api/v2/offers/' + req.params.offerId+'/accept',data, { 'headers': { 'Authorization': req.header('Authorization'), 'Content-Type':'application/json'} }
).then((response) => {
  //console.log(response);
  res.send(response.data);
})
.catch((error) => {
  console.log(error);
  res.status(503).send(error.response);
})
}
//dependencies
const phone = require ('node-phonenumber');
const express = require ('express');
const app = express();
const bodyParser = require('body-parser');

//parsing incoming data
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res)=>{
    
    console.log(req.query.number);
    
       const telnumber = req.query.number;



//sanitizing phonenumber     
const phoneUtil = phone.PhoneNumberUtil.getInstance();
const phoneNumber = phoneUtil.parse( telnumber ,'NG');

const sanitizedNumber = phoneUtil.format( phoneNumber, phone.PhoneNumberFormat.INTERNATIONAL);

//changing to string and splitting
const stringtoNumber = sanitizedNumber.toString();
const tel = stringtoNumber.split("");
const impThree = `${tel[5]}${tel[6]}${tel[7]}`;

//identification of network provider


switch (impThree){
    case "703" : 
    case  "706" : 
    case "803" : 
    case  "806" : 
    case  "810" : 
    case  "813": 
    case  "814" : 
    case  "816" : 
    case  "903" : 
    case  "906": 
    network_operator = 'MTN';
    break;
    case "605":
    case "705" :
    case "805" :
    case "807" :
    case "811":
    case "815" :
    case "905" :
    network_operator = 'GLO';
    break; 
    case "701":
    case "708":
    case "802": 
    case "808":
    case "812":
    case "902":
    case "907":
    network_operator = 'airtel';
    break; 
    case "809": 
    case "817": 
    case "818":
    case "908":
    case "909":
    network_operator = '9MOBILE';
    break; 
    default: console.log('cannot identify network operator');
    
}
// console.log(mno);

const telinfo = [{sanitizedNumber},{network_operator}];
console.log(telinfo);

res.json(telinfo);




});
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
  
});
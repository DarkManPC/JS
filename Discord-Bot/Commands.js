
const snekfetch = require("snekfetch");

class Instruction{

  constructor(){
    var tintin = new Tintin();
    var bonjour = new Bonjour();
    var list = new List(this);
    var btc = new Btc();
    var eth = new Eth();
    var zec = new Zec()
    var worker = new Worker();
    var balance = new Balance();
    var esti = new Estimation();
    var paie = new Paiement();
    var tot = new Total();
    this.com = [];
    this.com.push(tintin);
    this.com.push(bonjour);
    this.com.push(list);
    this.com.push(worker);
    this.com.push(balance);
    this.com.push(esti);
    this.com.push(paie);
    this.com.push(tot);
    this.com.push(btc);
    this.com.push(eth);
    this.com.push(zec);
  }

  play(msg){
    for(var i = 0; i < this.com.length; i++){
      if(this.com[i].parse(msg)){
        return;
      }
    }
    if(msg.content.startsWith("!")){
      msg.channel.send("J'ai pas ça en stock, vois avec les Lopez de Clermont !\n");
      this.com[2].action(msg);
    }
  }
}

class Command {

  constructor(){
    this.word = '';
  }
  parse (msg){

    if(this.find(msg)){
      this.action(msg);

      return true;
    }

    return false;
  }

  find (msg){
    return false;
  }

  action (msg){
  }

}

class Tintin extends Command {

  constructor(){
    super();
    this.word = '!tintin';
  }

  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){

    msg.channel.send('Ce gros PD');
  }
}

class Bonjour extends Command {

  constructor(){
    super();
    this.word = '!bonjour';
  }

  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){

    msg.channel.send('La calote de ses morts !');
  }
}

class List extends Command {

  constructor(ins){
    super();
    this.word = '!list';
    this.ins = ins
  }

  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){

    var str = "Actions disponible :\n";
    for(var i = 0; i < this.ins.com.length; i++){
      str = str + this.ins.com[i].word.substring(0) + "\n";
    }
    msg.channel.send(str); // Affiche le nom de l'action avec le "!"
  }
}

class Btc extends Command {

  constructor(){
    super();
    this.word = '!btc';
  }

  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){

    const API = "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=10";

    snekfetch.get(API).then(r => {
      let body = r.body;
      let str = ""

      let entry = r.body.find(post => post.id === "bitcoin");

      str = Math.floor(entry.price_usd) + " $ \n" + Math.floor(entry.price_eur) + " €";

      msg.channel.send(str);
    });

  }
}

class Eth extends Command {

  constructor(){
    super();
    this.word = '!eth';
  }

  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){

    const API = "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=10";

    snekfetch.get(API).then(r => {
      let body = r.body;
      let str = ""

      let entry = r.body.find(post => post.id === "ethereum");

      str = Math.floor(entry.price_usd) + " $ \n" + Math.floor(entry.price_eur) + " € \n" + entry.price_btc + " BTC";

      msg.channel.send(str);
    });

  }
}

class Zec extends Command {

  constructor(){
    super();
    this.word = '!zec';
  }

  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){

    const API = "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=100";

    snekfetch.get(API).then(r => {
      let body = r.body;
      let str = ""

      let entry = r.body.find(post => post.id === "zcash");

      str = Math.floor(entry.price_usd) + " $ \n" + Math.floor(entry.price_eur) + " € \n" + entry.price_btc + " BTC";

      msg.channel.send(str);
    });

  }
}

class Worker extends Command {

  constructor(){
    super();
    this.word = '!workers';

  }



  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){
    const API = "https://api.nanopool.org/v1/zec/user/t1U7b3SkWcWBiZJL2UeaExHTyz7BpDKCuuw";
    snekfetch.get(API).then(r => {
      let body = r.body;
      let str = ""

      for(let i = 0;i < body.data.workers.length; i++ ){
        if(body.data.workers[i].hashrate != "0.0"){
          str += body.data.workers[i].id + " : " + body.data.workers[i].hashrate +" Sol/s\n";
        }
      }

      msg.channel.send(str);
    });



  }
}

class Total extends Command {

  constructor(){
    super();
    this.word = '!total';

  }



  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){
    const API = "https://api.nanopool.org/v1/zec/payments/t1U7b3SkWcWBiZJL2UeaExHTyz7BpDKCuuw";
    snekfetch.get(API).then(r => {
      let body = r.body;
      let amounts = 0
      let str = ""

      for(let i = 0;i < body.data.length; i++ ){
        amounts += body.data[i].amount;
      }

      msg.channel.send(amounts + " ZEC depuis le debut sur nanopool");
    });



  }
}

class Estimation extends Command {

  constructor(){
    super();
    this.word = '!estimation';

  }



  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){
    const hrateAPI = "https://api.nanopool.org/v1/zec/user/t1U7b3SkWcWBiZJL2UeaExHTyz7BpDKCuuw";
    var API = "https://api.nanopool.org/v1/zec/approximated_earnings/";

    snekfetch.get(hrateAPI).then(r => {
      let body = r.body;


      API ="https://api.nanopool.org/v1/zec/approximated_earnings/" + body.data.avgHashrate.h12;

      snekfetch.get(API).then(r => {
        let body = r.body;
        let str = ""

        str += Math.floor(body.data.day.euros) + " € / Jour \n";
        str += (Math.floor(body.data.day.coins*10000)/10000) + " ZEC / Jour \n";
        str += (Math.floor((body.data.day.coins/0.05)*10)/10) + " paiement / Jour \n\n";
        str += Math.floor(body.data.week.euros) + " € / Semaine \n";
        str += (Math.floor(body.data.week.coins*10000)/10000) + " ZEC / Semaine \n";
        str += (Math.floor((body.data.week.coins/0.05)*10)/10) + " paiement / Semaine \n\n";
        str += Math.floor(body.data.month.euros) + " € / Mois \n";
        str += (Math.floor(body.data.month.coins*10000)/10000) + " ZEC / Mois \n";
        str += (Math.floor((body.data.month.coins/0.05)*10)/10) + " paiement / Mois \n\n";
        str += "En moyenne " + Math.floor(0.05/body.data.hour.coins) + " heures pour faire 0.05 ZEC soit "
        + (Math.floor((0.05/body.data.day.coins)*10)/10) + " jours\n\n"



        msg.channel.send(str);
      });

    });





  }
}

class Paiement extends Command {

  constructor(){
    super();
    this.word = '!paiement';

  }



  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){
    const hrateAPI = "https://api.nanopool.org/v1/zec/user/t1U7b3SkWcWBiZJL2UeaExHTyz7BpDKCuuw";
    var API = "https://api.nanopool.org/v1/zec/approximated_earnings/";

    snekfetch.get(hrateAPI).then(r => {
      let body = r.body;


      API ="https://api.nanopool.org/v1/zec/approximated_earnings/" + body.data.avgHashrate.h12;

      var balance = body.data.balance;

      snekfetch.get(API).then(r => {

        let avgDay = r.body.data.day.coins;
        let avgHour = r.body.data.hour.coins;
        let payoutAPI = "https://api.nanopool.org/v1/zec/usersettings/t1U7b3SkWcWBiZJL2UeaExHTyz7BpDKCuuw";

        snekfetch.get(payoutAPI).then(r => {
          let body = r.body;
          let str = ""

          str += Math.floor((balance / body.data.payout)*100) + " % de " + body.data.payout + " ZEC \n";

          let dayLeft = Math.floor((body.data.payout - balance)/avgDay);
          if(dayLeft > 0){
            str +="Paiement avant environ " + (Math.floor((body.data.payout - balance)/avgDay) + 1) + " jour(s) \n";
          }else{
            str +="Paiement avant environ " + (Math.floor((body.data.payout - balance)/avgHour) + 1) + " heure(s) \n";
          }

          msg.channel.send(str);
        });
      });

    });





  }
}

class Balance extends Command {

  constructor(){
    super();
    this.word = '!balance';

  }



  find (msg){

    return msg.content.startsWith(this.word);
  }

  action (msg){
    const API = "https://api.nanopool.org/v1/zec/user/t1U7b3SkWcWBiZJL2UeaExHTyz7BpDKCuuw";
    snekfetch.get(API).then(r => {
      let body = r.body;
      let str = "";
      let balance = body.data.balance;

      str = balance + " ZEC \n";

      const coinAPI = "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=100";
      snekfetch.get(coinAPI).then(r => {
        let entry = r.body.find(post => post.id === "zcash");
        str += (Math.floor(balance*entry.price_eur*100)/100) + " €";

        msg.channel.send(str);
      });
    });



  }
}

module.exports = {
  Instruction : Instruction
}

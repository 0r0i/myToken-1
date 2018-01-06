var Whitelist = artifacts.require("./Whitelist.sol");
var MyToken = artifacts.require("./MyToken.sol");
var MyCrowdsale = artifacts.require("./MyCrowdsale.sol");

function latestTime () {
    return web3.eth.getBlock('latest').timestamp;
  }
  
  const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
  };

  
module.exports = function(deployer, network, accounts) {
    
    // Account & Wallet configuration
    var admin            = accounts[0];
    var refundVault      = accounts[0];
    const startTime      = latestTime() + duration.seconds(30);
    const endTime        = startTime + duration.weeks(1);
    const ethRate        = new web3.BigNumber(100);
    const wallet         = accounts[0];
    const maxTokenSupply = 500e18;

    deployer.deploy(MyToken, maxTokenSupply).then(function() {
        deployer.deploy(MyCrowdsale, startTime, endTime, ethRate, wallet, MyToken.address).then(function() {
            console.log('Presale contract deployed');
        });
    });  
};
let writeText = '';
let writeMode = false;
let readOnly = false;
let writeScan = document.getElementById('scanWrite');
let writeFeedback = document.getElementById('scanTextFeedback');
const output = document.getElementById('scanStatus');
const dialogueContainer = document.getElementById('dialogueContainer');
const dialogueWriteBtn = document.getElementById("dialogueWrite");
const dialogueText = document.getElementById("dialogueText");
let writes = 0;
let maxwrite = 0;
dialogueText.textContent = "Please select the amount of players...";
document.addEventListener('deviceready', () => {
    navigator.splashscreen.hide();
    nfc.enabled(function () {
            console.log("Valid Device")
        },
        function () {
            dialogueText.textContent = "Your device doesn't have NFC Capabilities";
            dialoguePlayerAmount.style.display = "none";
        }
    )
    nfc.addNdefListener(
        function (nfcEvent) {
          const tag = nfcEvent.tag;
          const ndefMessage = tag.ndefMessage;

          if (writeMode) {
            // Writes player name to tag
            const record = ndef.textRecord(writeText);
            nfc.write(
              [record],
              () => {
                playbeep();
                document.getElementById('userID').value = "";
                writeFeedback.textContent = "Data Assigned Successfully..."; 
                autoHide(writeScan);
                players[writes+1].name = writeText;
                players[writes+1].cash = 15000;
                writes++;
                dialogueText.textContent = `Enter username for Player ${writes+1}...`
                if (writes == maxwrite) {
                    autoHide(dialogueContainer)
                    readOnly = true;
                }
                
            },
              err => {writeFeedback.textContent ="❌ Write failed: " + JSON.stringify(err); autoHide(writeScan);}
            );
            writeMode = false;
            return;
          }

          // Otherwise, handle read
          if (readOnly == true && ndefMessage && ndefMessage.length > 0) {
            playbeep();
            const payload = ndefMessage[0].payload;
            const text = nfc.bytesToString(payload).substring(3); // Skip language code
            storedtext = text;
            clearScanned();
            scanned();
            output.textContent = "Card scanned successfully...";
          } else {
            output.textContent = "Unsupported format...";
          }
        },
        () => console.log("NDEF listener ready"),
        error => {
            console.log("Listener error: " + JSON.stringify(error));
            dialogueText.textContent = "Your device doesn't have NFC Capabilities";
            dialoguePlayerAmount.style.display = "none";
        }
    );
});

function autoHide(element) {
    setTimeout(()=>{
        element.style.display = "none";
        writeFeedback.textContent = "Waiting for scan...";
    },1500)
}
function enableWriteMode() {
    const input = document.getElementById('userID').value.trim();
    const feedback = document.getElementById("dialogueText");
    if (!input) {
        feedback.textContent = "Please Enter a Valid Username"
        return;
    }

    if(input.length < 3) {
        feedback.textContent = "Username too short please\nEnter a Valid Username"
        return;
    }

    writeText = input;
    writeMode = true;
    writeScan.style.display = "flex";
}

dialogueWriteBtn.addEventListener('click', () => enableWriteMode());
let storedtext = ":  - - - ";
let playerScannedIndex = 0;

const playerSelectElement = document.getElementById("playerselect");

playerSelectElement.addEventListener('change', () => {
    maxwrite = playerSelectElement.value;
    dialoguePlayerAmount.style.display = "none";
    dialogueWrite.style.display = "flex";
    dialogueText.textContent = `Enter username for Player ${writes+1}...`;
})

let players = [
    {
        name: "- - -   ",
        cash: 0,
        properties: [], //Owned Properties
        utilities: [], //Owned Utilities
        stations: [] //Owned Stations
    },
    {
        name: "",
        cash: 0,
        properties: [], //Owned Properties
        utilities: [], //Owned Utilities
        stations: [] //Owned Stations
    },
    {
        name: "",
        cash: 0,
        properties: [],
        utilities: [],
        stations: []
    },
    {
        name: "",
        cash: 0,
        properties: [],
        utilities: [],
        stations: []
    },
    {
        name: "",
        cash: 0,
        properties: [],
        utilities: [],
        stations: []
    },
    {
        name: "",
        cash: 0,
        properties: [],
        utilities: [],
        stations: []
    },
    {
        name: "",
        cash: 0,
        properties: [],
        utilities: [],
        stations: []
    },
    {
        name: "",
        cash: 0,
        properties: [],
        utilities: [],
        stations: []
    },
    {
        name: "",
        cash: 0,
        properties: [],
        utilities: [],
        stations: []
    }

]

let properties = [
    {
        "name": "---",
        "rentCost": [0,0,0,0,0,0],
        "rentVal": 0,
        "oneHouse": 0,
        "twoHouse": 0,
        "threeHouse": 0,
        "fourHouse": 0,
        "hotel": 0,
        "houseCost": 0,
        "mortgageVal": 0,
        "propertyCost": 0,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Old Kent Road",
        "rentCost": [20,100,300,900,1600,2500],
        "rentVal": 20,
        "oneHouse": 100,
        "twoHouse": 300,
        "threeHouse": 900,
        "fourHouse": 1600,
        "hotel": 2500,
        "houseCost": 500,
        "mortgageVal": 300,
        "propertyCost": 600,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "White Chapel Road",
        "rentCost": [40,200,600,1800,3200,4500],
        "rentVal": 40,
        "oneHouse": 200,
        "twoHouse": 600,
        "threeHouse": 1800,
        "fourHouse": 3200,
        "hotel": 4500,
        "houseCost": 500,
        "mortgageVal": 300,
        "propertyCost": 600,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "The Angel Islington",
        "rentCost": [60,300,900,2700,4000,5500],
        "rentVal": 60,
        "oneHouse": 300,
        "twoHouse": 900,
        "threeHouse": 2700,
        "fourHouse": 4000,
        "hotel": 5500,
        "houseCost": 500,
        "mortgageVal": 500,
        "propertyCost": 1000,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Euston Road",
        "rentCost": [60,300,900,2700,4000,5500],
        "rentVal": 60,
        "oneHouse": 300,
        "twoHouse": 900,
        "threeHouse": 2700,
        "fourHouse": 4000,
        "hotel": 5500,
        "houseCost": 500,
        "mortgageVal": 300,
        "propertyCost": 1000,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Pentonville Road",
        "rentCost": [80,400,1000,3000,4500,6000],
        "rentVal": 80,
        "oneHouse": 400,
        "twoHouse": 1000,
        "threeHouse": 3000,
        "fourHouse": 4500,
        "hotel": 6000,
        "houseCost": 500,
        "mortgageVal": 300,
        "propertyCost": 1200,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Pall Mall",
        "rentCost": [100,500,1500,4500,6250,7500],
        "rentVal": 100,
        "oneHouse": 500,
        "twoHouse": 1500,
        "threeHouse": 4500,
        "fourHouse": 6250,
        "hotel": 7500,
        "houseCost": 1000,
        "mortgageVal": 700,
        "propertyCost": 1400,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Whitehall",
        "rentCost": [100,500,1500,4500,6250,7500],
        "rentVal": 100,
        "oneHouse": 500,
        "twoHouse": 1500,
        "threeHouse": 4500,
        "fourHouse": 6250,
        "hotel": 7500,
        "houseCost": 1000,
        "mortgageVal": 700,
        "propertyCost": 1400,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Northumberland Avenue",
        "rentCost": [120,600,1800,5000,7000,9000],
        "rentVal": 120,
        "oneHouse": 600,
        "twoHouse": 1800,
        "threeHouse": 5000,
        "fourHouse": 7000,
        "hotel": 9000,
        "houseCost": 1000,
        "mortgageVal": 800,
        "propertyCost": 1600,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Bow Street",
        "rentCost": [140,700,2000,5500,7500,9500],
        "rentVal": 140,
        "oneHouse": 700,
        "twoHouse": 2000,
        "threeHouse": 5500,
        "fourHouse": 7500,
        "hotel": 9500,
        "houseCost": 1000,
        "mortgageVal": 900,
        "propertyCost": 1800,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Marlborough Street",
        "rentCost": [140,700,2000,5500,7500,9500],
        "rentVal": 140,
        "oneHouse": 700,
        "twoHouse": 2000,
        "threeHouse": 5500,
        "fourHouse": 7500,
        "hotel": 9500,
        "houseCost": 1000,
        "mortgageVal": 900,
        "propertyCost": 1800,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Vine Street",
        "rentCost": [160,800,2200,6000,8000,10000],
        "rentVal": 160,
        "oneHouse": 800,
        "twoHouse": 2200,
        "threeHouse": 6000,
        "fourHouse": 8000,
        "hotel": 10000,
        "houseCost": 1000,
        "mortgageVal": 1000,
        "propertyCost": 2000,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Strand",
        "rentCost": [180,900,2500,7000,8750,10500],
        "rentVal": 180,
        "oneHouse": 900,
        "twoHouse": 2500,
        "threeHouse": 7000,
        "fourHouse": 8750,
        "hotel": 10500,
        "houseCost": 1500,
        "mortgageVal": 1100,
        "propertyCost": 2200,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Fleet Street",
        "rentCost": [180,900,2500,7000,8750,10500],
        "rentVal": 180,
        "oneHouse": 900,
        "twoHouse": 2500,
        "threeHouse": 7000,
        "fourHouse": 8750,
        "hotel": 10500,
        "houseCost": 1500,
        "mortgageVal": 1100,
        "propertyCost": 2200,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Trafalgar Square",
        "rentCost": [200,1000,3000,7500,9250,11000],
        "rentVal": 200,
        "oneHouse": 1000,
        "twoHouse": 3000,
        "threeHouse": 7500,
        "fourHouse": 9250,
        "hotel": 11000,
        "houseCost": 1500,
        "mortgageVal": 1200,
        "propertyCost": 2400,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Leicester Square",
        "rentCost": [220,1100,3300,8000,9750,11500],
        "rentVal": 220,
        "oneHouse": 1100,
        "twoHouse": 3300,
        "threeHouse": 8000,
        "fourHouse": 9750,
        "hotel": 11500,
        "houseCost": 1500,
        "mortgageVal": 1300,
        "propertyCost": 2600,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Coventry Street",
        "rentCost": [220,1100,3300,8000,9750,11500],
        "rentVal": 220,
        "oneHouse": 1100,
        "twoHouse": 3300,
        "threeHouse": 8000,
        "fourHouse": 9750,
        "hotel": 11500,
        "houseCost": 1500,
        "mortgageVal": 1300,
        "propertyCost": 2600,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Piccadilly",
        "rentCost": [240,1200,3600,8500,10250,12000],
        "rentVal": 240,
        "oneHouse": 1200,
        "twoHouse": 3600,
        "threeHouse": 8500,
        "fourHouse": 10250,
        "hotel": 12000,
        "houseCost": 1500,
        "mortgageVal": 1400,
        "propertyCost": 2800,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Regent Street",
        "rentCost": [260,1300,3900,9000,11000,12750],
        "rentVal": 260,
        "oneHouse": 1300,
        "twoHouse": 3900,
        "threeHouse": 9000,
        "fourHouse": 11000,
        "hotel": 12750,
        "houseCost": 2000,
        "mortgageVal": 1500,
        "propertyCost": 3000,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Oxford Street",
        "rentCost": [260,1300,3900,9000,11000,12750],
        "rentVal": 260,
        "oneHouse": 1300,
        "twoHouse": 3900,
        "threeHouse": 9000,
        "fourHouse": 11000,
        "hotel": 12750,
        "houseCost": 2000,
        "mortgageVal": 1500,
        "propertyCost": 3000,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Bond Street",
        "rentCost": [280,1500,4500,10000,12000,14000],
        "rentVal": 280,
        "oneHouse": 1500,
        "twoHouse": 4500,
        "threeHouse": 10000,
        "fourHouse": 12000,
        "hotel": 14000,
        "houseCost": 2000,
        "mortgageVal": 1600,
        "propertyCost": 3200,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Park Lane",
        "rentCost": [350,1750,5000,11000,13000,15000],
        "rentVal": 350,
        "oneHouse": 1750,
        "twoHouse": 5000,
        "threeHouse": 11000,
        "fourHouse": 13000,
        "hotel": 15000,
        "houseCost": 2000,
        "mortgageVal": 1750,
        "propertyCost": 3500,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    },
    {
        "name": "Mayfair",
        "rentCost": [500,2000,6000,14000,17000,20000],
        "rentVal": 500,
        "oneHouse": 2000,
        "twoHouse": 6000,
        "threeHouse": 14000,
        "fourHouse": 17000,
        "hotel": 20000,
        "houseCost": 2000,
        "mortgageVal": 2000,
        "propertyCost": 4000,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isMonopolized" : false,
        "isOwned": 0
    }
]
let utilities  = [
    {
        "name" : null,
        "mortgageVal" : null,
        "propertyCost" : null,
        "propertyValue": null,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isOwned": 0
    },
    {
        "name" : "Electric Company",
        "mortgageVal" : 750,
        "propertyCost" : 1500,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isOwned": 0
    },
    {
        "name" : "Water Works",
        "mortgageVal" : 750,
        "propertyCost" : 1500,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isOwned": 0
    }
]
let stations = [
    {
        "name" : null,
        "rentVal": null,
        "mortgageVal" : null,
        "propertyCost" : null,
        "propertyValue": null,
        "isMortgaged" : false,
        "isOwned": 0
    },
    {
        "name" : "Kings Cross Station",
        "rentVal": 250,
        "mortgageVal" : 1000,
        "propertyCost" : 2000,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isOwned": 0
    },
    {
        "name" : "Martylebone Station",
        "rentVal": 250,
        "mortgageVal" : 1000,
        "propertyCost" : 2000,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isOwned": 0
    },
    {
        "name" : "Fenchurch Station",
        "rentVal": 250,
        "mortgageVal" : 1000,
        "propertyCost" : 2000,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isOwned": 0
    },
    {
        "name" : "Liverpool St Station",
        "rentVal": 250,
        "mortgageVal" : 1000,
        "propertyCost" : 2000,
        "propertyValue": 0,
        "developmentIndex": 0,
        "isMortgaged" : false,
        "isOwned": 0
    }
];

const defaultProperties = properties.map(p => ({...JSON.parse(JSON.stringify(p))}));
const defaultUtilities = utilities.map(u => ({...JSON.parse(JSON.stringify(u))}));
const defaultStations = stations.map(s => ({...JSON.parse(JSON.stringify(s))}));

const monopolyGroups = [
    [1,2],
    [3,4,5],
    [6,7,8],
    [9,10,11],
    [12,13,14],
    [15,16,17],
    [18,19,20],
    [21,22]
];

const utilGroups = [
    [1,2]
]
const propertybtn = document.getElementById("property");
const propertyCard = document.getElementById("propertyCard");
const landName =  document.getElementsByClassName('landName')[0];
const rentval = document.getElementById("rentVal");
const onehouse = document.getElementById("rent1Val");
const twohouse = document.getElementById("rent2Val");
const threehouse = document.getElementById("rent3Val");
const fourhouse = document.getElementById("rent4Val");
const hotel = document.getElementById("rent5Val");
const houseprice = document.getElementById("housePrice");
const hotelprice = document.getElementById("hotelPrice");
const mortgageprice = document.getElementById("mortgagePrice");

const utilitybtn = document.getElementById("utility");
const utilityName =  document.getElementsByClassName('utilityName')[0];
const stationbtn = document.getElementById("station");
const stationName =  document.getElementsByClassName('stationName')[0];
const utilityCard = document.getElementById("utilityCard");
const stationCard = document.getElementById("stationCard");
const utilImg = document.getElementById("util");

const owner = document.getElementById("playerName");
const cash = document.getElementById("playerCash");
const propertiesOwned = document.getElementById("playerProperties");

const scanClearBtn = document.getElementById("scanClear");
const dialogueAskContainer = document.getElementById('ask');
const dialogueAlertContainer = document.getElementById('alert');
const dialogueBankContainer = document.getElementById('bankDialogue');
const dialoguePlayerAmount =  document.getElementById("playerAmount");
const dialogueWrite =  document.getElementById("write");
const tradeselectContainer = document.getElementById("tradeSelectContainer");
const choicePurchase = document.getElementById("purchase");
const choiceRent = document.getElementById("payment");
const choiceMortgage = document.getElementById("mortgage");
const choiceTrade = document.getElementById("trade");
const choiceUpgrade = document.getElementById("upgrade");
const choiceSell = document.getElementById("sell");
const ownerText = document.getElementById("owner");
const developmentText = document.getElementById("development");
const rentText = document.getElementById("rent");
const mortgageText = document.getElementById("mortgaged");
const monopolizedText = document.getElementById("monopolized");
const propertyValueText = document.getElementById("propertyVal");
const developmentType = ["Rental   ", "🏠︎   ", "🏠︎🏠︎   ", "🏠︎🏠︎🏠︎   ", "🏠︎🏠︎🏠︎🏠︎   ", "HOTEL   "]
let propertySelectVal = 0;
let utilSelectVal = 0;
let stationSelectVal = 0;
let selectedOption = ""
choicePurchase.addEventListener("click", () => {
    console.log("Purchase clicked");
    dialogueContainer.style.display = "flex";
    clearDialogue();
    dialogueAskContainer.style.display = "flex";
    dialogueText.textContent = "Are you sure you want to purchase this property?"
    askQuery(() => { purchaseItem() });
});

function purchaseItem() {
    if(selectedOption == "property") {
        players[playerScannedIndex].cash -= properties[propertySelectVal].propertyCost;
        properties[propertySelectVal].isOwned = playerScannedIndex;
        players[playerScannedIndex].properties.push(parseInt(propertySelectVal));
        properties[propertySelectVal].propertyValue += properties[propertySelectVal].propertyCost;
        dialogueText.textContent = "Property Purchased!";
        dialogueAskContainer.style.display = "none";
        clearScanned();
        autoHide(dialogueContainer);
    }
    if(selectedOption == "utility") {
        players[playerScannedIndex].cash -= utilities[utilSelectVal].propertyCost;
        utilities[utilSelectVal].isOwned = playerScannedIndex;
        players[playerScannedIndex].utilities.push(parseInt(utilSelectVal));
        utilities[utilSelectVal].propertyValue += utilities[utilSelectVal].propertyCost;
        dialogueText.textContent = "Property Purchased!";
        dialogueAskContainer.style.display = "none";
        clearScanned();
        autoHide(dialogueContainer);
    }
    if(selectedOption == "station") {
        players[playerScannedIndex].cash -= stations[stationSelectVal].propertyCost;
        stations[stationSelectVal].isOwned = playerScannedIndex;
        players[playerScannedIndex].stations.push(parseInt(stationSelectVal));
        stations[stationSelectVal].propertyValue += stations[stationSelectVal].propertyCost;
        dialogueText.textContent = "Property Purchased!";
        dialogueAskContainer.style.display = "none";
        clearScanned();
        autoHide(dialogueContainer);
    }
}

choiceRent.addEventListener("click", () => {
    console.log("Rent clicked");
    dialogueContainer.style.display = "flex";
    clearDialogue();
    dialogueAskContainer.style.display = "flex";
    dialogueText.textContent = "Are you sure you want to pay rent?";
    askQuery(() => { payRent() });
});

function payRent() {
    let payer = players[playerScannedIndex];
    let ownerIndex;
    let rentAmount = 0;

    if (selectedOption === "property") {
        let prop = properties[propertySelectVal];
        ownerIndex = prop.isOwned;
        rentAmount = prop.rentCost[prop.developmentIndex];
        if(checkMonopoly(ownerIndex,propertySelectVal) && prop.developmentIndex == 0) {
            rentAmount *= 2;
        }
    } else if (selectedOption === "utility") {
        let util = utilities[utilSelectVal];
        ownerIndex = util.isOwned;
        const diceRoll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
        rentAmount = diceRoll * 10;
        if(players[ownerIndex].utilities.length == 2) {
            rentAmount *= 10;
        }
    } else if (selectedOption === "station") {
        let stat = stations[stationSelectVal];
        ownerIndex = stat.isOwned;
        const ownedStations = players[ownerIndex].stations.length;
        rentAmount = stationsPrice[ownedStations];
    } else {
        dialogueText.textContent = "Invalid selection.";
        return;
    }

    payer.cash -= rentAmount;
    dialogueText.textContent = `Paid $${rentAmount} in rent to the bank...`;
    if(selectedOption === "property" && !properties[propertySelectVal].isMortgaged) {
        players[ownerIndex].cash += rentAmount;
        dialogueText.textContent = `Paid $${rentAmount} in rent to ${players[ownerIndex].name}...`;
    }
    if(selectedOption === "utility" && !utilities[utilSelectVal].isMortgaged) {
        players[ownerIndex].cash += rentAmount;
        dialogueText.textContent = `Paid $${rentAmount} in rent to ${players[ownerIndex].name}...`;
    }
    if(selectedOption === "station" && !stations[stationSelectVal].isMortgaged) {
        players[ownerIndex].cash += rentAmount;
        dialogueText.textContent = `Paid $${rentAmount} in rent to ${players[ownerIndex].name}...`;
    }

    dialogueAskContainer.style.display = "none";
    autoHide(dialogueContainer);
    clearScanned();
}

choiceMortgage.addEventListener("click", () => {
    console.log("Mortgage clicked");
    dialogueContainer.style.display = "flex";
    clearDialogue();
    dialogueAskContainer.style.display = "flex";
    dialogueText.textContent = "Are you sure you want to toggle mortgage status?";
    askQuery(() => { mortgageProperty() });
});

function mortgageProperty() {
    let owner = players[playerScannedIndex];
    if (selectedOption === "property") {
        const prop = properties[propertySelectVal];
        prop.isMortgaged = !prop.isMortgaged;
        dialogueText.textContent = prop.isMortgaged
            ? `${prop.name} has been mortgaged.`
            : `${prop.name} has been unmortgaged.`;
        if(!prop.isMortgaged) { owner.cash -= (prop.mortgageVal + (prop.mortgageVal/10)) } else { owner.cash += prop.mortgageVal };
    } else if (selectedOption === "utility") {
        const util = utilities[utilSelectVal];
        util.isMortgaged = !util.isMortgaged;
        dialogueText.textContent = util.isMortgaged
            ? `${util.name} has been mortgaged.`
            : `${util.name} has been unmortgaged.`;
        if(!util.isMortgaged) { owner.cash -= (util.mortgageVal + (util.mortgageVal/10)) } else { owner.cash += util.mortgageVal };
    } else if (selectedOption === "station") {
        const stat = stations[stationSelectVal];
        stat.isMortgaged = !stat.isMortgaged;
        dialogueText.textContent = stat.isMortgaged
            ? `${stat.name} has been mortgaged.`
            : `${stat.name} has been unmortgaged.`;
        if(!stat.isMortgaged) { owner.cash -= (stat.mortgageVal + (stat.mortgageVal/10)) } else { owner.cash += stat.mortgageVal };
    } else {
        dialogueText.textContent = "Invalid selection.";
        return;
    }
    dialogueAskContainer.style.display = "none";
    autoHide(dialogueContainer);
    clearScanned();
}


const tradeSelect =  document.getElementById("tradeSelect");
function addTradeOptions() {
    clearOptions("tradeSelect");

    players.forEach((player, index) => {
        if (index === playerScannedIndex || player.name === "") return;

        player.properties.forEach(propIndex => {
            const prop = properties[propIndex];
            if(!isPropertyMonopolized(propIndex)) {
                addOption("tradeSelect", `property-${index}-${propIndex}`, `${player.name} - ${prop.name}`,false);
            }   
        });

        player.utilities.forEach(utilIndex => {
            const util = utilities[utilIndex];
            addOption("tradeSelect", `utility-${index}-${utilIndex}`, `${player.name} - ${util.name}`,false);
        });

        player.stations.forEach(stationIndex => {
            const stat = stations[stationIndex];
            addOption("tradeSelect", `station-${index}-${stationIndex}`, `${player.name} - ${stat.name}`,false);
        });
    });
}


choiceTrade.addEventListener("click", () => {
    console.log("Trade clicked");
    dialogueContainer.style.display = "flex";
    clearDialogue();
    dialogueAskContainer.style.display = "flex";
    tradeselectContainer.style.display = "flex";
    dialogueText.textContent = "- Trade -";
    addTradeOptions();
    askQuery(() => { tradeSelectedProperty(); });
});

function tradeSelectedProperty() {
    const tradeValue = document.getElementById("tradeSelect").value;
    if (!tradeValue) {
        dialogueText.textContent = "No trade target selected.";
        return;
    }

    const [otherType, otherPlayerIndexStr, tradeIndexStr] = tradeValue.split("-");
    const otherPlayerIndex = parseInt(otherPlayerIndexStr);
    const otherAssetIndex = parseInt(tradeIndexStr);

    const currentPlayer = players[playerScannedIndex];
    const otherPlayer = players[otherPlayerIndex];

    // Identify current player's asset
    let playerAsset, playerAssetIndex, playerAssetType;
    if (selectedOption === "property") {
        playerAssetType = "property";
        playerAssetIndex = propertySelectVal;
        playerAsset = properties[playerAssetIndex];
    } else if (selectedOption === "utility") {
        playerAssetType = "utility";
        playerAssetIndex = utilSelectVal;
        playerAsset = utilities[playerAssetIndex];
    } else if (selectedOption === "station") {
        playerAssetType = "station";
        playerAssetIndex = stationSelectVal;
        playerAsset = stations[playerAssetIndex];
    } else {
        dialogueText.textContent = "Invalid selected asset.";
        return;
    }

    // Identify other player's asset
    let otherAsset;
    if (otherType === "property") {
        otherAsset = properties[otherAssetIndex];
    } else if (otherType === "utility") {
        otherAsset = utilities[otherAssetIndex];
    } else if (otherType === "station") {
        otherAsset = stations[otherAssetIndex];
    } else {
        dialogueText.textContent = "Invalid target asset.";
    }

    // Calculate value difference
    const playerVal = playerAsset.propertyValue || playerAsset.propertyCost;
    const otherVal = otherAsset.propertyValue || otherAsset.propertyCost;
    const diff = playerVal - otherVal;

    // Helper: remove value from array
    const removeFrom = (arr, val) => arr.filter(i => i !== val);

    // Transfer ownerships
    playerAsset.isOwned = otherPlayerIndex;
    otherAsset.isOwned = playerScannedIndex;

    // Remove and add player asset from/to respective lists
    if (playerAssetType === "property") {
        currentPlayer.properties = removeFrom(currentPlayer.properties, playerAssetIndex);
        otherPlayer.properties.push(playerAssetIndex);
    } else if (playerAssetType === "utility") {
        currentPlayer.utilities = removeFrom(currentPlayer.utilities, playerAssetIndex);
        otherPlayer.utilities.push(playerAssetIndex);
    } else if (playerAssetType === "station") {
        currentPlayer.stations = removeFrom(currentPlayer.stations, playerAssetIndex);
        otherPlayer.stations.push(playerAssetIndex);
    }

    // Remove and add other asset from/to respective lists
    if (otherType === "property") {
        otherPlayer.properties = removeFrom(otherPlayer.properties, otherAssetIndex);
        currentPlayer.properties.push(otherAssetIndex);
    } else if (otherType === "utility") {
        otherPlayer.utilities = removeFrom(otherPlayer.utilities, otherAssetIndex);
        currentPlayer.utilities.push(otherAssetIndex);
    } else if (otherType === "station") {
        otherPlayer.stations = removeFrom(otherPlayer.stations, otherAssetIndex);
        currentPlayer.stations.push(otherAssetIndex);
    }

    // Adjust cash compensation
    if (diff > 0) {
        currentPlayer.cash += diff;
        otherPlayer.cash -= diff;
    } else if (diff < 0) {
        const absDiff = Math.abs(diff);
        otherPlayer.cash += absDiff;
        currentPlayer.cash -= absDiff;
    }

    dialogueText.textContent = `Trade completed! Compensation: $${Math.abs(diff)}`;
    tradeselectContainer.style.display = "none";
    dialogueAskContainer.style.display = "none";
    autoHide(dialogueContainer);
    clearScanned();
}

choiceUpgrade.addEventListener("click", () => {
    console.log("Upgrade clicked");
    dialogueContainer.style.display = "flex";
    clearDialogue();
    dialogueAskContainer.style.display = "flex";
    dialogueText.textContent = "Upgrade this property?";
    askQuery(() => { upgradeProperty() });
});

function upgradeProperty() {
    const prop = properties[propertySelectVal];
    const owner = players[playerScannedIndex];

    prop.developmentIndex++;
    owner.cash -= prop.houseCost;
    prop.propertyValue += prop.houseCost;

    dialogueText.textContent = `${prop.name} upgraded to ${developmentType[prop.developmentIndex]}`;
    dialogueAskContainer.style.display = "none";
    autoHide(dialogueContainer);
    clearScanned();
}

choiceSell.addEventListener("click", () => {
    console.log("Sell clicked");
    dialogueContainer.style.display = "flex";
    clearDialogue();
    dialogueAskContainer.style.display = "flex";
    dialogueText.textContent = "Are you sure to you want to sell this property?";
    askQuery(() => { sellProperty() });
});

function sellProperty() {
    let owner = players[playerScannedIndex];

    if (selectedOption === "property") {
        const prop = properties[propertySelectVal];
        if(prop.developmentIndex == 0) {
            owner.cash += prop.propertyValue;
            properties[propertySelectVal] = JSON.parse(JSON.stringify(defaultProperties[propertySelectVal]));
            players[playerScannedIndex].properties = players[playerScannedIndex].properties.filter(index => index !== propertySelectVal);
            dialogueText.textContent = `Sold ${prop.name} for $${prop.propertyValue}`;
        } else {
            dialogueText.textContent = prop.developmentIndex == 5 ? `Sold ${prop.name} hotel for $${prop.houseCost}` : `Sold ${prop.name} house for $${prop.houseCost}`;
            prop.developmentIndex -= 1;
            prop.propertyValue -= prop.houseCost;
            owner.cash += prop.houseCost;
        }
    } 
    else if (selectedOption === "utility") {
        const util = utilities[utilSelectVal];
        owner.cash += util.propertyValue;
        utilities[utilSelectVal] = JSON.parse(JSON.stringify(defaultUtilities[utilSelectVal]));
        players[playerScannedIndex].utilities = players[playerScannedIndex].utilities.filter(index => index !== utilSelectVal);
        dialogueText.textContent = `Sold ${util.name} for $${util.propertyValue}`;
        
    } 
    else if (selectedOption === "station") {
        const stat = stations[stationSelectVal];
        owner.cash += stat.propertyValue;
        stations[stationSelectVal] = JSON.parse(JSON.stringify(defaultStations[stationSelectVal]));
        players[playerScannedIndex].stations = players[playerScannedIndex].stations.filter(index => index !== stationSelectVal);
        dialogueText.textContent = `Sold ${stat.name} for $${stat.propertyValue}`;
    } 
    else {
        dialogueText.textContent = "Invalid selection.";
        return;
    }

    dialogueAskContainer.style.display = "none";
    autoHide(dialogueContainer);
    clearScanned();
}


function clearDialogue() {
    dialogueAlertContainer.style.display = "none";
    dialogueAskContainer.style.display = "none";
    dialogueBankContainer.style.display = "none";
    dialoguePlayerAmount.style.display = "none";
    dialogueWrite.style.display = "none";
}
propertybtn.addEventListener("change", () => {
    let SelectionValue = document.getElementById("property").value;
    SelectionValue = parseInt(SelectionValue);
    propertySelectVal = SelectionValue;
    selectedOption = "property";
    if(SelectionValue <= 0) {
        propertyCard.style.visibility = "hidden";
        utilityCard.style.visibility = "hidden";
        stationCard.style.visibility = "hidden";
        statReset();
    } else if(SelectionValue <= 2) {
        landName.style.backgroundColor = "purple";
    } else if(SelectionValue <= 5) {
        landName.style.backgroundColor = "lightskyblue";
    } else if(SelectionValue <= 8) {
        landName.style.backgroundColor = "darkorchid";
    } else if(SelectionValue <= 11) {
        landName.style.backgroundColor = "orange";
    } else if(SelectionValue <= 14) {
        landName.style.backgroundColor = "red";
    } else if(SelectionValue <= 17) {
        landName.style.backgroundColor = "rgb(255, 238, 0)";
    } else if(SelectionValue <= 20) {
        landName.style.backgroundColor = "green";
    } else if(SelectionValue <= 22) {
        landName.style.backgroundColor = "darkblue";
    }
    if (SelectionValue > 0) {
        propertyCard.style.visibility = "visible";
        propertyCard.style.display = "flex";
        utilityCard.style.display = "none";
        stationCard.style.display = "none";
    }
    utilitybtn.selectedIndex = 0;
    stationbtn.selectedIndex = 0;
    let property = properties[SelectionValue];
    landName.innerText = property.name.toUpperCase();
    rentval.innerText = property.rentVal;
    onehouse.innerText = property.oneHouse;
    twohouse.innerText = property.twoHouse;
    threehouse.innerText = property.threeHouse;
    fourhouse.innerText = property.fourHouse;
    hotel.innerText = property.hotel;
    houseprice.innerText = `$ ${property.houseCost} each`;
    hotelprice.innerText = `$ ${property.houseCost} plus\n4 houses`;
    mortgageprice.innerText = `$ ${property.mortgageVal}`;

    //Stats
    let devIndex = properties[SelectionValue].developmentIndex;
    ownerText.textContent = properties[SelectionValue].isOwned == 0 ? "- - -   " :  `${players[properties[SelectionValue].isOwned].name}   `;
    rentText.textContent = `$ ${properties[SelectionValue].rentCost[devIndex]}   `;
    developmentText.textContent = developmentType[properties[SelectionValue].developmentIndex];
    mortgageText.textContent = properties[SelectionValue].isMortgaged ? "YES   " : "NO   ";
    choiceMortgage.textContent = properties[SelectionValue].isMortgaged ? "UNMORTGAGE" : "MORTGAGE";
    monopolizedText.textContent = isPropertyMonopolized(propertySelectVal) ? "YES   " : "NO   ";
    propertyValueText.textContent = (properties[SelectionValue].propertyValue == 0)? `$ ${properties[SelectionValue].propertyCost}   ` : `$ ${properties[SelectionValue].propertyValue}   `;
    //Activate Buttons Once Property has been selected based on which players is scanned...
    if(isOwned(SelectionValue,selectedOption)) {
        choicePurchase.disabled = true;
        choiceRent.disabled = true;
        choiceMortgage.disabled = false;
        choiceTrade.disabled = properties[SelectionValue].isMortgaged || isPropertyMonopolized(propertySelectVal);
        choiceUpgrade.disabled = !canUpgradeHouse(SelectionValue);
        if(!isPropertyMonopolized(propertySelectVal) || properties[SelectionValue].developmentIndex == 5 || properties[SelectionValue].isMortgaged) {
            choiceUpgrade.disabled = true;
        }
        choiceSell.disabled = properties[SelectionValue].isMortgaged || isLowestDevelopmentInMonopoly(SelectionValue);
        console.log("Owner's Choice");
    } else {
        if(!properties[SelectionValue].isOwned == 0 || players[playerScannedIndex].cash < properties[SelectionValue].propertyCost) {
            choicePurchase.disabled = true;
        } else {
            choicePurchase.disabled = false;
        }

        if(properties[SelectionValue].isOwned == playerScannedIndex || properties[SelectionValue].isOwned == 0) {
            choiceRent.disabled = true;
        } else {
            choiceRent.disabled = false;
        }
        choiceMortgage.disabled = true;
        choiceTrade.disabled = true;
        choiceUpgrade.disabled = true;
        choiceSell.disabled = true;
        console.log("Other's Choice");
    }
});

function disableChoiceBtns() {
    choicePurchase.disabled = true;
    choiceRent.disabled = true;
    choiceMortgage.disabled = true;
    choiceTrade.disabled = true;
    choiceUpgrade.disabled = true;
    choiceSell.disabled = true;
}

utilitybtn.addEventListener("change", () => {
    let SelectionValue = document.getElementById("utility").value;
    SelectionValue = parseInt(SelectionValue);
    utilSelectVal = SelectionValue;
    selectedOption = "utility";
    if(SelectionValue <= 0) {
        propertyCard.style.visibility = "hidden";
        utilityCard.style.visibility = "hidden";
        stationCard.style.visibility = "hidden";
    } else if (SelectionValue == 1) {
        utilImg.src = "assets/images/electric.png"
    } else if (SelectionValue == 2) {
        utilImg.src = "assets/images/waterworks.png"
    }
    if (SelectionValue > 0) {
        utilityCard.style.visibility = "visible";
        utilityCard.style.display = "flex";
        propertyCard.style.display = "none";
        stationCard.style.display = "none";
    }
    propertybtn.selectedIndex = 0;
    stationbtn.selectedIndex = 0;
    let utility = utilities[SelectionValue];
    utilityName.innerText = utility.name.toUpperCase();
    console.log(SelectionValue);

    //Stats
    ownerText.textContent = utilities[SelectionValue].isOwned == 0 ? "- - -   " :  `${players[utilities[SelectionValue].isOwned].name}   `;
    rentText.textContent = `Dice Roll   `;
    developmentText.textContent = developmentType[utilities[SelectionValue].developmentIndex];
    mortgageText.textContent = utilities[SelectionValue].isMortgaged ? "YES   " : "NO   ";
    choiceMortgage.textContent = utilities[SelectionValue].isMortgaged ? "UNMORTGAGE" : "MORTGAGE";
    monopolizedText.textContent = (utilities[1].isOwned == utilities[2].isOwned && utilities[1].isOwned != 0 && utilities[2].isOwned) ? "YES   " : "NO   ";
    propertyValueText.textContent = (utilities[SelectionValue].propertyValue == 0)? `$ ${utilities[SelectionValue].propertyCost}   ` : `$ ${utilities[SelectionValue].propertyValue}   `;
    //Activate Buttons Once Property has been selected based on which players is scanned...
    if(isOwned(SelectionValue,selectedOption)) {
        choicePurchase.disabled = true;
        choiceRent.disabled = true;
        choiceMortgage.disabled = false;
        choiceTrade.disabled = utilities[SelectionValue].isMortgaged;
        choiceUpgrade.disabled = true;
        choiceSell.disabled = utilities[SelectionValue].isMortgaged;
        console.log("Owner's Choice");
    } else {
        if(!utilities[SelectionValue].isOwned == 0 || players[playerScannedIndex].cash < utilities[SelectionValue].propertyCost) {
            choicePurchase.disabled = true;
        } else {
            choicePurchase.disabled = false;
        }

        if(utilities[SelectionValue].isOwned == playerScannedIndex || utilities[SelectionValue].isOwned == 0) {
            choiceRent.disabled = true;
        } else {
            choiceRent.disabled = false;
        }
        choiceMortgage.disabled = true;
        choiceTrade.disabled = true;
        choiceUpgrade.disabled = true;
        choiceSell.disabled = true;
        console.log("Other's Choice");
    }
});
let stationsPrice = [0, 250, 500, 1000, 2000];
let priceIndex = 0;
stationbtn.addEventListener("change", () => {
    let SelectionValue = document.getElementById("station").value;
    SelectionValue = parseInt(SelectionValue);
    stationSelectVal = SelectionValue;
    selectedOption = "station";
    if(SelectionValue <= 0) {
        propertyCard.style.visibility = "hidden";
        utilityCard.style.visibility = "hidden";
        stationCard.style.visibility = "hidden";
    }
    if (SelectionValue > 0) {
        stationCard.style.visibility = "visible";
        stationCard.style.display = "flex";
        propertyCard.style.display = "none";
        utilityCard.style.display = "none";
    }
    utilitybtn.selectedIndex = 0;
    propertybtn.selectedIndex = 0;
    let station = stations[SelectionValue];
    stationName.innerText = station.name.toUpperCase();
    console.log(SelectionValue);
    
    if(stations[SelectionValue].isOwned != 0) {
        priceIndex = stations.filter(station => station.isOwned === stations[SelectionValue].isOwned).length;
    }
    //Stats
    ownerText.textContent = stations[SelectionValue].isOwned == 0 ? "- - -   " :  `${players[stations[SelectionValue].isOwned].name}   `;
    rentText.textContent = `$ ${stationsPrice[priceIndex]}   `;
    developmentText.textContent = developmentType[stations[SelectionValue].developmentIndex];
    mortgageText.textContent =  stations[SelectionValue].isMortgaged ? "YES   " : "NO   ";
    choiceMortgage.textContent = stations[SelectionValue].isMortgaged ? "UNMORTGAGE" : "MORTGAGE";
    monopolizedText.textContent = (stationsPrice[priceIndex] == 2000) ? "YES   " : "NO   ";
    propertyValueText.textContent = (stations[SelectionValue].propertyValue == 0)? `$ ${stations[SelectionValue].propertyCost}   ` : `$ ${stations[SelectionValue].propertyValue}   `;
    //Activate Buttons Once Property has been selected based on which players is scanned...
    if(isOwned(SelectionValue,selectedOption)) {
        choicePurchase.disabled = true;
        choiceRent.disabled = true;
        choiceMortgage.disabled = false;
        choiceTrade.disabled = stations[SelectionValue].isMortgaged;
        choiceUpgrade.disabled = true;
        choiceSell.disabled = stations[SelectionValue].isMortgaged;
        console.log("Owner's Choice");
    } else {
        if(!stations[SelectionValue].isOwned == 0 || players[playerScannedIndex].cash < stations[SelectionValue].propertyCost) {
            choicePurchase.disabled = true;
        } else {
            choicePurchase.disabled = false;
        }

        if(stations[SelectionValue].isOwned == playerScannedIndex || stations[SelectionValue].isOwned == 0) {
            choiceRent.disabled = true;
        } else {
            choiceRent.disabled = false;
        }
        choiceMortgage.disabled = true;
        choiceTrade.disabled = true;
        choiceUpgrade.disabled = true;
        choiceSell.disabled = true;
        console.log("Other's Choice");
    }
});

function scanned() {
    players.forEach((player, index) => {
        if(storedtext === player.name) {
            owner.innerText = `:  ${player.name}`;
            if(player.cash <= 0) {
                cash.innerText = `: BANKRUPT`;
            } else {
                cash.innerText = `: $ ${player.cash}`;
            }
            clearOptions("ownedproperties");
            isOwnedList(index);
            playerScannedIndex = index;
            bankBtn.disabled = false;
            propertybtn.disabled = false;
            stationbtn.disabled = false;
            utilitybtn.disabled = false;
        }

        if(players.length-1 == index) {
            output.textContent = "Player not found...";
        }
    });
}

function clearScanned() {
    let status = document.getElementById('scanStatus');
    status.textContent = "Waiting for scan...";
    owner.innerText = `:  - - - `;
    cash.innerText = `: $ - - -`;
    playerScannedIndex = null;
    bankBtn.disabled = true;
    propertybtn.disabled = true;
    stationbtn.disabled = true;
    utilitybtn.disabled = true;
    propertybtn.selectedIndex = 0;
    utilitybtn.selectedIndex = 0;
    stationbtn.selectedIndex = 0;
    propertyCard.style.visibility = "hidden";
    utilityCard.style.visibility = "hidden";
    stationCard.style.visibility = "hidden";
    choiceMortgage.textContent = "MORTGAGE"
    statReset();
    disableChoiceBtns();
    clearOptions("ownedproperties");
}

scanClearBtn.addEventListener('click', () => { clearScanned() });

const resetbtn = document.getElementById("resetBtn");

resetbtn.addEventListener('click', () => {
    dialogueContainer.style.display = "flex";
    clearDialogue();
    dialogueAskContainer.style.display = "flex";
    dialogueText.textContent = "Are you sure you want to clear progress?"
    askQuery(() => { location.reload() });
});

const bankBtn = document.getElementById('bank');
const bankFeedback = document.getElementById('bankFeedback');
const bankInput = document.getElementById('dialogueNumber');
bankBtn.addEventListener('click', () => {
    showBank();
    bankBack.disabled = false;
    bankInput.disabled = false;
    bankGo.disabled = false;
})
function showBank() {
    dialogueContainer.style.display = "flex";
    clearDialogue();
    dialogueBankContainer.style.display = "flex";
    dialogueText.textContent = "- BANK -"
    bankFeedback.textContent = "---";
}
let bankAdd = document.getElementById('dialogueAdd');
let bankSubtract = document.getElementById('dialogueSubtract');
let bankGo = document.getElementById('dialogueGo');
let bankBack = document.getElementById('dialogueBack');
bankInput.addEventListener('input', () => {
    let condition = bankInput.value.trim() === "";
    bankAdd.disabled = condition;
    bankSubtract.disabled = condition;
});

bankAdd.addEventListener('click', () => {
    bankInput.disabled = true;
    bankAdd.disabled = true;
    bankSubtract.disabled = true;
    bankBack.disabled = true;
    bankGo.disabled = true;
    players[playerScannedIndex].cash += parseInt(bankInput.value);
    bankFeedback.textContent = `Added $${parseInt(bankInput.value)} to ${players[playerScannedIndex].name}...`;
    bankInput.value = "";
    autoHide(dialogueContainer);
    clearScanned();
});

bankSubtract.addEventListener('click', () => {
    bankAdd.disabled = true;
    bankSubtract.disabled = true;
    bankGo.disabled = true;
    bankInput.disabled = true;
    bankBack.disabled = true;
    players[playerScannedIndex].cash -= parseInt(bankInput.value);
    bankFeedback.textContent = `Charged $${parseInt(bankInput.value)} from ${players[playerScannedIndex].name}...`;
    bankInput.value = "";
    autoHide(dialogueContainer);
    console.log(players[0].cash);
    clearScanned();
});

bankGo.addEventListener('click', () => {
    bankInput.disabled = true;
    bankAdd.disabled = true;
    bankSubtract.disabled = true;
    bankGo.disabled = true;
    bankBack.disabled = true;
    players[playerScannedIndex].cash += 2000;
    bankFeedback.textContent = `Added $${2000} to ${players[playerScannedIndex].name} for passing go...`;
    bankInput.value = "";
    autoHide(dialogueContainer);
    console.log(players[0].cash);
    clearScanned();
});

bankBack.addEventListener('click', () => {
    dialogueContainer.style.display = "none";
    clearScanned();
});

function isOwnedList(playerIndex) {
    for(let i = 0; i < properties.length; i++) {
        let name = properties[i].name;
        if(players[playerIndex].properties.includes(i)) {
            addOption("ownedproperties",i,name,true);
        }
    }

    for(let i = 0; i < stations.length; i++) {
        if(players[playerIndex].stations.includes(i)) {
            let name = stations[i].name;
            addOption("ownedproperties",i,name,true);
        }
    }

    for(let i = 0; i < utilities.length; i++) {
        if(players[playerIndex].utilities.includes(i)) {
            let name = utilities[i].name;
            addOption("ownedproperties",i,name,true);
        }
    }
}

function isOwned(propertyIndex, propertyType="") {
    if(propertyType == "property") {
        return players[playerScannedIndex].properties.includes(propertyIndex);
    } 
    if(propertyType == "utility") {
        return players[playerScannedIndex].utilities.includes(propertyIndex);
    }
    if(propertyType == "station") {
        return players[playerScannedIndex].stations.includes(propertyIndex);
    }
    return false;
}

function addOption(id = "", value, text, isdisabled = true) {
  const select = document.getElementById(id);
  const option = document.createElement("option");
  option.disabled = isdisabled;
  option.value = value;
  option.text = text;
  select.appendChild(option);
}

function removeOptions(value) {
  const select = document.getElementById("mySelect");
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value === value) {
      select.remove(i);
      break;
    }
  }
}

function clearOptions(id) {
  const select = document.getElementById(id);
  while (select.options.length > 1) {
    select.remove(1);
  }
}

function statReset() {
    ownerText.textContent = `- - -   `;
    rentText.textContent = `$ - - -   `;
    developmentText.textContent = "- - -   ";
    mortgageText.textContent = "- - -   ";
    monopolizedText.textContent = "- - -   ";
    propertyValueText.textContent = `$ - - -   `;
}

function checkMonopoly(playerIndex, selectedPropertyIndex) {
    for (let group of monopolyGroups) {
        if (group.includes(selectedPropertyIndex)) {
            return group.every(index => players[playerIndex].properties.includes(index));
        }
    }
    return false;
}

function askQuery(handler) {
    const askYes = document.getElementById('dialogueYes');
    const askNo = document.getElementById('dialogueNo');

    // Remove all previous listeners by cloning and replacing the elements
    const askYesClone = askYes.cloneNode(true);
    const askNoClone = askNo.cloneNode(true);

    askYes.parentNode.replaceChild(askYesClone, askYes);
    askNo.parentNode.replaceChild(askNoClone, askNo);

    // Add new one-time listener
    askYesClone.addEventListener('click', function wrapper() {
        askYesClone.removeEventListener('click', wrapper);
        handler();
    });

    // Re-hide on No
    askNoClone.addEventListener('click', () => {
        dialogueContainer.style.display = "none";
        tradeselectContainer.style.display = "none";
    });
}


function isPropertyMonopolized(propertyIndex) {
    for (let group of monopolyGroups) {
        if (group.includes(propertyIndex)) {
            for (let i = 0; i < players.length; i++) {
                if (group.every(index => players[i].properties.includes(index))) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canUpgradeHouse(propertyIndex) {
    const group = monopolyGroups.find(group => group.includes(propertyIndex));
    if (!group) return false;

    const currentDev = properties[propertyIndex].developmentIndex;

    // Cannot upgrade if any other property in group has less development
    return group.every(index => {
        if (index === propertyIndex) return true; // skip self
        return properties[index].developmentIndex >= currentDev;
    });
}

function isLowestDevelopmentInMonopoly(propertyIndex) {
    const group = monopolyGroups.find(g => g.includes(propertyIndex));
    if (!group) return false;

    const devIndices = group.map(i => properties[i].developmentIndex);
    const currentDev = properties[propertyIndex].developmentIndex;

    const minDev = Math.min(...devIndices);
    const maxDev = Math.max(...devIndices);

    if (minDev === maxDev) return false; // All equal
    return currentDev === minDev;
}
const endGame = document.getElementById('endGame');
endGame.addEventListener("click", () => {
    console.log("End Game clicked");
    dialogueContainer.style.display = "flex";
    clearDialogue();
    dialogueAskContainer.style.display = "flex";
    dialogueText.textContent = "Are you sure you want to end the game?";
    askQuery(() => { sellAllProperties() });
});

function sellAllProperties() {
    players.forEach(player => {
        if(player.properties.length > 0) {
            player.properties.forEach(property => {
                player.cash += properties[property].propertyValue;
                properties[property] = defaultProperties[property];
            })
            player.properties = [];
        } else {
            console.log(player.name, " has no property")
        }

        if(player.utilities.length > 0) {
            player.utilities.forEach(utility => {
                player.cash += utilities[utility].propertyValue;
                utilities[utility] = defaultUtilities[utility];
            })
            player.utilities = [];
        } else {
            console.log(player.name, " has no utility")
        }

        if(player.stations.length > 0) {
            player.stations.forEach(station => {
                player.cash += stations[station].propertyValue;
                stations[station] = defaultStations[station];
            })
            player.stations = [];
        } else {
            console.log(player.name, " has no station")
        }
    })
    let highestCash = 0;
    let highestCashIndex = -1;
    players.forEach((player, index) => {
        if(player.cash > highestCash) {
            highestCashIndex = index;
            highestCash = player.cash;
        }
    })
    dialogueAskContainer.style.display = "none";
    dialogueText.textContent = `Ended the game with ${players[highestCashIndex].name} having $${highestCash}`;
    propertybtn.disabled = true;
    utilitybtn.disabled = true;
    stationbtn.disabled = true;
    bankBtn.disabled = true;
    endGame.disabled = true;
    autoHide(dialogueContainer);
}

function playbeep() {
    const audio = new Audio('../assets/audios/press.mp3');
    audio.play();
}
const inCash = document.getElementById("cash");
const outChange = document.getElementById("change-due");
const btnClick = document.getElementById("purchase-btn");



let price = 1.87;
let cid = [
    ['PENNY', 1.01],        // 0.01
    ['NICKEL', 2.05],       // 0.05
    ['DIME', 3.1],          // 0.1
    ['QUARTER', 4.25],      // 0.25
    ['ONE', 90],            // 1
    ['FIVE', 55],           // 5
    ['TEN', 20],            // 10
    ['TWENTY', 60],         // 20
    ['ONE HUNDRED', 100]    // 100
];




btnClick.addEventListener("click", () => {

    let cash = inCash.value; // input value
    let change = outChange.textContent; // output value
    let combinedCid = 0; // total count of cid[x][1]

    for (let i = 0; i < cid.length; i++) { //combine cid values into single value
        combinedCid += cid[i][1];
    }

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (cash == price) {
        change = "No change due - customer paid with exact cash";
    } else if ((cash - price) > combinedCid) {
        change = "Status: INSUFFICIENT_FUNDS";
    } else if (cash > price) {
        checkChangeDue();
    }

    outChange.textContent = change;



    function checkChangeDue() {
        let changeDue = cash - price;
        let bClosed = false;
        if (changeDue == combinedCid) {
            bClosed = true;
        }
        let cidValues = [
            0.01,
            0.05,
            0.1,
            0.25,
            1,
            5,
            10,
            20,
            100,
        ]

        let copyOfCid = cid;
        let givinCid = [0, 0, 0, 0, 0, 0, 0, 0, 0];


        for (let i = cid.length - 1; i >= 0; i--) {

            while (cidValues[i] <= changeDue && cid[i][1] >= cidValues[i] && changeDue >= 0) {
                // console.log(`${changeDue} - ${cidValues[i]}`)
                cidValues[i] = (Math.round(cidValues[i] * 100)) / 100;
                changeDue -= cidValues[i];
                cid[i][1] -= cidValues[i];
                givinCid[i] += cidValues[i];

                changeDue = (Math.round(changeDue * 100)) / 100;
                cid[i][1] = (Math.round(cid[i][1] * 100)) / 100;
                givinCid[i] = (Math.round(givinCid[i] * 100)) / 100;
            }
        }




        if (changeDue == 0) {


            if (bClosed) {
                change = `Status: CLOSED`
            } else {
                change = `Status: OPEN`
            }
            for (let i = cid.length - 1; i >= 0; i--) {
                if (givinCid[i] != 0) {
                    change += ` ${cid[i][0]}: $${givinCid[i]}`
                }
            }

        } else {
            change = "Status: INSUFFICIENT_FUNDS";
            cid = copyOfCid
        }

    }
})


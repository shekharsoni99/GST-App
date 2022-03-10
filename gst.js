var party_data = JSON.parse(localStorage.getItem("PartyData")) || [];

function addNewParty() {

    document.querySelector(".table").innerHTML = "";

    document.querySelector(".right_header").textContent = "Add New Party Data";

    document.querySelector(".right_main").innerHTML = "";
     
    var partyName = document.createElement("label")
    partyName.textContent = "Enter Party Name";

    var party_name = document.createElement("input");
    party_name.setAttribute("id", "partyName1");

    var partyAddress = document.createElement("label")
    partyAddress.textContent = "Enter Address";

    var party_address = document.createElement("input");
    party_address.setAttribute("id", "partyAddress");

    var partyGST = document.createElement("label")
    partyGST.textContent = "Enter GST Number";

    var party_gst = document.createElement("input");
    party_gst.setAttribute("id", "partyGST");

    var addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.setAttribute("onclick", "addNewPartyData()");

    var homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.addEventListener("click", function() {
        window.location.href = "gst.html";
    })

    document.querySelector(".right_main").append(partyName, party_name, partyAddress, party_address, partyGST, party_gst, addButton, homeButton);


    var table = document.createElement("table");

    var thead = document.createElement("thead");

    var tr1 = document.createElement("tr");

    var th1 = document.createElement("th");
    th1.textContent = "Party Name";

    var th2 = document.createElement("th");
    th2.textContent = "Party Address";

    var th3 = document.createElement("th");
    th3.textContent = "Party GST Number";

    tr1.append(th1, th2, th3);

    thead.append(tr1);

    table.append(thead);

    document.querySelector(".table").append(table);

}

function addNewPartyData() {

    // document.querySelector(".table").innerHTML = "";


    var name1 = document.getElementById("partyName1").value;
    var address = document.getElementById("partyAddress").value;
    var gst = document.getElementById("partyGST").value;

    
    var tbody = document.createElement("tbody");

    var tr2 = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.textContent = name1;

    var td2 = document.createElement("td");
    td2.textContent = address;

    var td3 = document.createElement("td");
    td3.textContent = gst;

    tr2.append(td1, td2, td3);

    tbody.append(tr2);

    var partyData = new construct(name1, address, gst);

    party_data.push(partyData);

    localStorage.setItem("PartyData", JSON.stringify(party_data));

    document.querySelector("table").append(tbody);

    var para = document.createElement("p");
    para.textContent = "Party Added Successfully"
    para.style.color = "green";

    document.querySelector(".right_main").append(para);
}

function construct(name, address, gst) {

    this.Name = name;
    this.Address = address;
    this.GST = gst;
}


select();

function select(){

    party_data.map(function (items) {

        var option = document.createElement("option");
        option.textContent = items.Name;

        document.querySelector("select").append(option);

    });
}

document.querySelector("form").addEventListener("submit", save);

var taxFillingDetails = JSON.parse(localStorage.getItem("taxFilledData")) || [];

print();

function save(event) {

    event.preventDefault();

    var name = document.querySelector("#partyName").value;
    var date = document.getElementById("date").value;
    var invoice = document.getElementById("invoiceNumber").value;
    var type = document.getElementById("type").value;
    var qty = document.querySelector("#qty").value;
    var unit = document.querySelector("#unit").value;
    var cat = document.querySelector("#cgst").value;
    var total = document.querySelector("#total").value;
    var taxAmount = total/1.05;
    var tax = total - taxAmount;

    for(let i = 0; i < party_data.length; i++) {
        if(party_data[i].Name == name) {
            var address = party_data[i].Address;
            var gst = party_data[i].GST;
            break;
        }
    }

    var gst_fill = new construct2(name, address, gst, date, invoice, type, qty, unit, cat, taxAmount, tax, total);

    taxFillingDetails.push(gst_fill);

    localStorage.setItem("taxFilledData", JSON.stringify(taxFillingDetails));

    print();
}

function construct2(name, address, gst, date, invoice, type, qty, unit, cat, taxAmount, tax, total){
    this.Name = name;
    this.Address = address;
    this.GST = gst;
    this.Date = date;
    this.invoiceNumber = invoice;
    this.Type = type;
    this.Quantity = qty;
    this.Unit = unit;
    this.TaxCategory = cat;
    this.TaxAmount = taxAmount.toFixed(2);;
    this.Tax = tax.toFixed(2);
    this.Total = total;
}


function print() {

    document.querySelector("#tbody1").innerHTML = "";
   
    taxFillingDetails.map(function (items, index) {

        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.textContent = items.Name;
    
        var td2 = document.createElement("td");
        td2.textContent = items.Address;
    
        var td3 = document.createElement("td");
        td3.textContent = items.GST;
    
        var td4 = document.createElement("td");
        td4.textContent = items.Date;
    
        var td5 = document.createElement("td");
        td5.textContent = items.invoiceNumber;
    
        var td6 = document.createElement("td");
        td6.textContent = items.Type;
    
        var td7 = document.createElement("td");
        td7.textContent = `${items.Quantity} ${items.Unit}`;
    
        var td8 = document.createElement("td");
        td8.textContent = items.Tax;
    
        var td9 = document.createElement("td");
        td9.textContent = items.TaxCategory;
    
        var td10 = document.createElement("td");
        td10.textContent = items.TaxAmount;
    
        var td11 = document.createElement("td");
        td11.textContent = items.Tax;
    
        var td12 = document.createElement("td");
        td12.textContent = items.Total;
    
        var btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.style.width = "70%";
        btn.addEventListener("click",function (){
            taxFillingDetails.splice(index, 1);
            localStorage.setItem("taxFilledData",JSON.stringify(taxFillingDetails));
            print();
        });
    
        tr.append(td1, td2, td3, td4, td5, td6, td7, td9, td10, td8, td12,  btn);
    
        document.querySelector("#tbody1").append(tr);
    });



    var amount = taxFillingDetails.reduce(function(a, b) {
        return (a + +b.TaxAmount);
    }, 0);

    document.querySelector("#totalAmount").textContent = `Total Amount without GST = ${amount.toFixed(2)}`;

    var tax = taxFillingDetails.reduce(function(a, b) {
        return (a + +b.Tax);
    }, 0);

    document.querySelector("#totalTax").textContent = `Total Tax Paid = ${tax}`;

    var totalPurchase = taxFillingDetails.reduce(function(a, b) {
        return (a + +b.Total);
    }, 0);

    document.querySelector("#totalPurchase").textContent = `Total Purchase Amount = ${totalPurchase}`;

}

function newGST() {

    localStorage.removeItem("taxFilledData");
    window.location.href = "gst.html";

}
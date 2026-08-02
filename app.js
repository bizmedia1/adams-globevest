const bankName = document.getElementById("bankName");
const accountName = document.getElementById("accountName");
const accountNumber = document.getElementById("accountNumber");
const ctaLink = document.getElementById("ctaLink");

async function loadConfig(){

const res = await fetch("/api/config");

const data = await res.json();

bankName.value = data.bankName;
accountName.value = data.accountName;
accountNumber.value = data.accountNumber;
ctaLink.value = data.ctaLink;

}

loadConfig();

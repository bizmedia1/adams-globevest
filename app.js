const bankName = document.getElementById("bankName");
const accountName = document.getElementById("accountName");
const accountNumber = document.getElementById("accountNumber");
const ctaLink = document.getElementById("ctaLink");
const saveBtn = document.getElementById("saveBtn");

async function loadConfig() {

  const res = await fetch("/api/config");
  const data = await res.json();

  bankName.value = data.bankName;
  accountName.value = data.accountName;
  accountNumber.value = data.accountNumber;
  ctaLink.value = data.ctaLink;

}

loadConfig();

saveBtn.addEventListener("click", async () => {

  saveBtn.disabled = true;
  saveBtn.textContent = "Saving...";

  const res = await fetch("/api/save-config", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      bankName: bankName.value,
      accountName: accountName.value,
      accountNumber: accountNumber.value,
      ctaLink: ctaLink.value

    })

  });

  const data = await res.json();

  if (data.success) {

    alert("Saved successfully!");

  } else {

    alert("Failed to save.");

    console.log(data);

  }

  saveBtn.disabled = false;
  saveBtn.textContent = "Save Changes";

});

async function insertStudent() {
  const studentInsert = {
    // company_id: document.getElementById('label').value,
    first_name: document.getElementById('label1').value,
    last_name: document.getElementById('label2').value,
    grad_semester: document.getElementById('label3').value,
    grad_year: document.getElementById('label4').value,
    status: document.getElementById('label5').value,
    infosci_concentration: document.getElementById('label6').value
  };
  console.log(studentInsert);
  await fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentInsert)
  });
}
  
document.querySelector('#button1').addEventListener('click', (event) => {
  insertCompany();
});
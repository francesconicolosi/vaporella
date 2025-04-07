const fetch = require('node-fetch');

let modifyAccess = false;
function toggleModifyAccess() {
    modifyAccess = document.getElementById('modifyAccessSwitch').checked;
}

window.addEventListener('fetchInactiveUsers', fetchInactiveUsers);

async function fetchInactiveUsers() {
    alert('fegc');
    const jiraBaseUrl = document.getElementById('jiraBaseUrl').value;
    const jiraApiToken = document.getElementById('jiraApiToken').value;
    const jiraEmail = document.getElementById('jiraEmail').value;
    try {
        const response = await fetch(`${jiraBaseUrl}/rest/api/3/users/search`, {
            headers: {
                'Authorization': `Basic ${btoa(`${jiraEmail}:${jiraApiToken}`)}`,
                'Accept': 'application/json'
            }
        });
        const users = await response.json();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const inactiveUsers = users.filter(user => {
            const lastLogin = new Date(user.lastLogin);
            return lastLogin < sixMonthsAgo;
        });
        const userTable = document.getElementById('userTable');
        userTable.innerHTML = '';
        inactiveUsers.forEach(user => {
            const row = userTable.insertRow();
            row.insertCell(0).innerText = user.displayName;
            row.insertCell(1).innerText = user.lastLogin;
            const confirmCell = row.insertCell(2);
            const confirmButton = document.createElement('button');
            confirmButton.innerText = 'Confirm';
            confirmButton.onclick = () => updateUserAccess(user.accountId, row);
            confirmCell.appendChild(confirmButton);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        document.getElementById('output').innerText = 'Errore durante il recupero degli utenti: ' + error.message;
    }
}

async function updateUserAccess(userId, row) {
    console.log('updated');
    //if (!modifyAccess) {
    //    row.cells.innerText = 'Modifica accesso disabilitata';
    //    return;
    //}
    //const jiraBaseUrl = document.getElementById('jiraBaseUrl').value;
    //const jiraApiToken = document.getElementById('jiraApiToken').value;
    //const jiraEmail = document.getElementById('jiraEmail').value;
    //try {
    //    await fetch(`${jiraBaseUrl}/rest/api/3/group/user`, {
    //        method: 'DELETE',
    //        headers: {
    //            'Authorization': `Basic ${btoa(`${jiraEmail}:${jiraApiToken}`)}`,
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify({
    //            accountId: userId,
    //            groupname: 'jira-software-users'
    //        })
    //    });
    //    await fetch(`${jiraBaseUrl}/rest/api/3/group/user`, {
    //        method: 'POST',
    //        headers: {
    //            'Authorization': `Basic ${btoa(`${jiraEmail}:${jiraApiToken}`)}`,
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify({
    //            accountId: userId,
    //            groupname: 'jira-servicemanagement-users'
    //        })
    //    });
    //    row.cells.innerText = 'Accesso aggiornato';
    //} catch (error) {
    //    console.error('Errore durante l\'aggiornamento dell\'accesso:', error);
    //    document.getElementById('output').innerText = 'Errore durante l\'aggiornamento dell\'accesso: ' + error.message;
    //}
}

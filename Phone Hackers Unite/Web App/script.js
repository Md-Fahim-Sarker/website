
    // Function to get URL parameters
    function getURLParams() {
      const params = new URLSearchParams(window.location.hash.substring(1));
      return Object.fromEntries(params.entries());
    }

    // Parse URL parameters
    const params = getURLParams();

    // Extract user data
    const userData = JSON.parse(params.user || '{}');
    
    // Add new parameter to the URL if user ID exists
    if (userData.id) {
      const newParam = `chatnum=${userData.id}`;
      const newUrl = `${window.location.origin}${window.location.pathname}#${window.location.hash.substring(1)}&${newParam}`;
      
      // Update the browser's URL without reloading
      window.history.replaceState({}, document.title, newUrl);
    }


const urlParams = new URLSearchParams(window.location.search);
const chatid = urlParams.get('id');

function gotocamara() {
window.location.href = 'acco.html?tools=camara&id=' + chatid;
}

function gotomychatid() {
window.location.href = 'general.html?general=mychatid&id=' + chatid;
}

function gotoacchack() {
window.location.href = 'account.html?id=' + chatid;
}

function gotodevyoutub() {
window.location.href = 'general.html?general=devyoutub&id=' + chatid;
}

function gotodevinfo() {
window.location.href = 'general.html?general=devinfo&id=' + chatid;
}

function gotohelp() {
window.location.href = 'general.html?general=help&id=' + chatid;
}

function gotocommandlist() {
window.location.href = 'general.html?general=commandlist&id=' + chatid;
}

function gotobotinfo() {
window.location.href = 'general.html?general=botinfo&id=' + chatid;
}

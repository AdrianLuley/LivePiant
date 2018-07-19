// Add logic to this script to poll server every second for updated pixels.
let lastSeenIndex = 0;

function pollServer () {
    const postReqOptions = {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({"clientupdates": clientupdates, lastSeenIndex}),
    }
    
    
    fetch("/updates", postReqOptions)
        .then(response => response.json())
        .then(data => {
            lastSeenIndex = data.last;
            data.updates.forEach((update) => {
                update.forEach((update) =>{
                let row = update[0];
                let col = update[1];
                let color = update[2];
                bitmap.setColor(row, col, color, true);
                clientupdates = [];
            });
            });
            
    })
    checkServer = setTimeout(pollServer, 1000);
}

pollServer();
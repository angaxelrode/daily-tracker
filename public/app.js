window.addEventListener('load', () => {
    document.getElementById('complete').addEventListener('click', () => {
        let RitualDescrip = document.getElementById('ritual').value;
        console.log(RitualDescrip);
        
        // creating the object 
        let obj = { "Rituals": RitualDescrip };

        // stringify the object to reparse into json
        let jsonData = JSON.stringify(obj);

        // fetch to route
        fetch('/rituals', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

        document.getElementById('get-tracker').addEventListener('click', () => {
            // Get info on ALL progress so far
            fetch('/progress')
            .then(resp => resp.json())
            .then(data => {
                document.getElementById('ProgressInfo').innerHTML = ''; // Clear progress
                console.log(data.data);
                
                // Display each ritual with a smiley face
                for (let i = 0; i < data.data.length; i++) {
                    let string = data.data[i].date + " : " + data.data[i].Rituals;
                    let elt = document.createElement('p');
                    elt.innerHTML = string + ' <span class="smiley">😊</span>'; // Append smiley
                    document.getElementById('ProgressInfo').appendChild(elt);
                }
            });
        });
    });
});
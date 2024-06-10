document.getElementById('menu_image').addEventListener('click', (event)=>{
    document.getElementById('dropdown-content').style.display = "block";
});

const dropdown_links = ['dropdown-link1', 'dropdown-link2', 'dropdown-link3', 'dropdown-link4', 'main']
dropdown_links.forEach((link_id)=>{
    document.getElementById(link_id).addEventListener('click', (event)=>{
        // event.preventDefault();
        document.getElementById('dropdown-content').style.display = "none";
    });
});

document.getElementById('formOfContact').addEventListener('submit', (event)=>{
    event.preventDefault();

    // let form = event.target;
    // let formData = {
    //     user_name: form.nom.value,
    //     user_email: form.email.value,
    //     message: form.message.value
    // };

// Réinitialiser les messages et les styles d'erreur
    document.getElementById('retourMessage').textContent = '';
    let inputs = document.querySelectorAll('#formOfContact input,#formOfContact textarea');
    inputs.forEach((input)=>{
        input.classList.remove('error');
    });

    // Assurons-nous que les champs sont remplis.
    let isValid = true;
    let dataOfForm = {};
    inputs.forEach((input)=>{
        if(!input.value){
            input.classList.add('error');
            isValid = false;
        } else{
            dataOfForm[input.name] = input.value;
        }
    });
    if(!isValid){
        document.getElementById('retourMessage').textContent = 'Vous devez remplir tous les champs.';
        document.getElementById('retourMessage').style.color = 'red';
        return;
    }

    // Effacer les espaces superflus dans le nom
    let nameClean = document.getElementById('nom').value.trim();
    document.getElementById('nom').value = nameClean;

    // Validation d'email
    let emailValue = document.getElementById('email').value;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(emailValue)){
        document.getElementById('retourMessage').textContent = 'Veuillez entrer une adresse e-mail valide.';
        document.getElementById('retourMessage').style.color = 'red';
        document.getElementById('email').focus();
        return;
    };
    
    if(isValid && emailPattern.test(emailValue)){
        try{
            emailjs.sendForm('service_w20l8j6', 'Porfolio_Contact_Form', '#formOfContact').then(
                (response) => {
                    alert("Message envoyé avec succès")
                    console.log('SUCCESS!', response.status, response.text);
                    document.getElementById('retourMessage').textContent = 'Merci pour votre message. Nous vous répondrons dans un bref délais.';
                    document.getElementById('retourMessage').classList.remove('error')
                    document.getElementById('formOfContact').reset();
                },
                (error) => {
                    alert("Oups ! Une erreur s'est produite, veuillez réessayer.")
                    console.log('FAILED...', error);
                },
            );
        }catch(e){
            alert("Oups ! Une erreur s'est produite, veuillez vérifier votre connexion et réessayer.");
            console.log('Catch error...', error);
        }
    }
    // else{
    //     document.getElementById('retourMessage').textContent = 'Vous devez remplir tous les champs.';
    //     document.getElementById('retourMessage').style.color = 'red';
    // }
});

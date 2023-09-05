import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser'

function JoinTeam() {

    // create state for submitted
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [skills, setSkills] = useState("");
    const [cv, setCV] = useState("")
    const [file, setFile] = useState(null);

    // create function for handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        clearForm();
        return;
    };

    // disable submit button if all fields are not filled
    const disableSubmit = () => {
        if (!name || !email || !skills || !cv) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        disableSubmit();
        // eslint-disable-next-line
    }, [name, email, skills, cv]);


    const clearForm = () => {
        setName("");
        setEmail("");
        setSkills("");
        setCV("");
        setFile(null);
    };

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault(); // prevents the page from reloading when you hit “Send”
        console.log("entra");
        emailjs.sendForm('service_8qmbzn1', 'template_k9jo7vh', form.current, '_3nUT63kYBeDRccVv')
            .then((result) => {
                console.log(result);
                handleSubmit(e);
            }, (error) => {
                console.log(error)
            });
    };

    function saveFileOnDrive(e) {
        e.preventDefault(); // prevents the page from reloading when you hit “Send”
        console.log(e)
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(file) //start conversion...
        reader.onload = function (e) { //.. once finished..
            var rawLog = reader.result.split(',')[1]; //extract only thee file data part
            var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
            fetch('https://script.google.com/macros/s/AKfycbxAE1rMKVaqoyn7K50ijVQFYQR2JfxJwdLrQl8JJErqyYqFX-BXpgNvy-MjIupc7dOW/exec', //your AppsScript URL
                { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
                .then(res => res.json()).then((a) => {
                    console.log(a) //See response
                    sendEmail(e);
                }).catch(e => console.log(e)) // Or Error in console
        }
    }

    // set and parse the cv filename
    const handleCV = (e) => {
        // parse the filename
        const filename = e.target.value.split("\\");
        // set the filename
        setCV(filename[filename.length - 1].slice(0, -4));
        // rename the file
        e.target.files[0].name = skills + "_" + name + "_" + email + ".pdf";
        setFile(e.target.files[0]);

    };

    return (
        <JoinTeamWrapper>
            <div className="join-title">Entra nel team.</div>
            {/* if submitted thanks message */}
            {submitted && <div className="normal-text">Grazie per l&apos;interesse! Ti contatteremo il prima possibile.</div>}
            {/* else form */}
            {!submitted && (
                <div>
                    <div className="normal-text">Non c&apos;è niente di meglio di una StartUp tech per accrescere le tue abilità.</div>
                    
                    <form ref={form} onSubmit={(e) => saveFileOnDrive(e)}>

                        <input className="div1" type="text" name="user_name" id="name" placeholder="NAME" value={name} onChange={(e) => setName(e.target.value)} />

                        <input className="div2" type="email" name="user_email" id="email" placeholder="E-MAIL" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <select className="div3" id="skills" defaultValue="RUOLO" onChange={(e) => setSkills(e.target.value)}>
                            <option disabled>RUOLO</option>
                            <option value="design">Design</option>
                            <option value="development">Development</option>
                            <option value="marketing">Marketing</option>
                            <option value="sales">Sales</option>
                            <option value="human-resources">Human Resources</option>
                            <option value="finance">Finance</option>
                        </select>

                        <textarea className="div4" name="message" id="message" placeholder="NOTE" />

                        <div className="div5">
                            <label className="custom-file-upload">
                                <input type="file" accept="application/pdf" onChange={(e) => handleCV(e)} />
                                Upload CV
                            </label>
                            <p>{cv}</p>
                        </div>

                        <button className="div6" type="submit" disabled={disableSubmit()}>
                            {submitted ? "Submitted" : "SUBMIT"}
                        </button>
                    </form>
                </div >
            )
            }
        </JoinTeamWrapper >
    );
}

// Join the team subscribe wrapper
const JoinTeamWrapper = styled.div`
    background-color: white;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    .join-title {
        text-align: center;
        color: black;
        font-style: normal;
        font-weight: 400;
        font-size: 124px;
        line-height: 80px;
        letter-spacing: -0.03em;
        margin-top: 50px;
    }
    .normal-text {
        width: 60vw;
        text-align: center;
        color: black;
        font-style: normal;
        font-weight: 400;
        font-size: 55px;
        line-height: 46px;
        letter-spacing: -0.02em;
        margin-top: 30px;
        margin-bottom: 100px;
    }
    form {
        display: grid;
        grid-template-columns: repeat(, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 20px;
        // center items in grid
        align-items: center;
        justify-items: center;
        margin-right: 2rem;
        margin-left: 2rem;
        margin-bottom: 200px;

        input, select, textarea {
            background: white;
            color: black;
            border: 1px solid black;
            border-radius: 5px;
        }
        input::placeholder, textarea::placeholder {
            // font-weight: bold;
            opacity: 0.5;
            color: black;
        }
        
    }
    .div1, .div2, .div3 {
        padding: 1rem;
    }
    .div1 { 
        grid-area: 1 / 1 / 2 / 2; 
        justify-self: start;
        
    }
    .div2 { 
        grid-area: 1 / 2 / 2 / 3; 
        justify-self: center;
        width: 300px;
    }
    .div3 { 
        grid-area: 1 / 3 / 2 / 4; 
        justify-self: end;
    }
    .div4 {
        grid-area: 2 / 1 / 3 / 4; 
        justify-self: center;
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        resize: none;
    }
    .div5 { 
        grid-area: 3 / 1 / 4 / 3; 
        p {
            color: black;
            // center text vertically
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            margin-left: 0.5rem;
        }
        display: flex;
        flex-direction: row;
        width: auto;
        justify-self: start;
        input[type="file"] {
            display: none;
        }
        .custom-file-upload {
            border: 1px solid black;
            color: black;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 20px;
            cursor: pointer;
            &:hover {
                background-color: white;
                color: black;
            }
        }
    }
    .div6 { 
        grid-area: 3 / 3 / 4 / 4; 
        justify-self: end;
        height: 2.6rem;
        padding: 0rem 2rem;
        margin-right: 0.5rem;  
        background: black;
        color: white;
        border: 1px solid black;
        border-radius: 5px;
    }

    @media (max-width: 768px) {
        width: 100vw;
        margin-top: -1px;
        .join-title {
            // font-weight: 400;
            font-size: 80px;
            line-height: 70px;
        }
        .normal-text {
            width: 70vw;
            font-size: 40px;
            line-height: 36px;
            letter-spacing: -0.02em;
            margin-left: auto;
            margin-right: auto;
            margin-top: 30px;
            margin-bottom: 60px;
        }
        form {
            width: 80vw;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(6, 1fr);
            grid-column-gap: 0px;
            grid-row-gap: 20px;
        }
         .div3, .div4, .div5, .div6 {
            width: 100%;
            justify-self: center;

        }
        .div1 { grid-area: 1 / 1 / 2 / 3; 
            justify-self: center;
            width: 100%;
            box-sizing: border-box;
            padding: 1rem;
       
        }
        .div2 { 
            grid-area: 2 / 1 / 3 / 3; 
            width: 100%;
            box-sizing: border-box;
            padding: 1rem;
        }
        .div3 { 
            grid-area: 3 / 1 / 4 / 3; 
            -webkit-appearance: none;
        }
        .div4 { grid-area: 4 / 1 / 5 / 3;}
        .div5 { grid-area: 5 / 1 / 6 / 2; 
            p {
                font-size: 12px;
            }
        }
        .div6 { 
            grid-area: 6 / 1 / 7 / 2; 
            margin-right: 0;
        }
    }
`;

export default JoinTeam;
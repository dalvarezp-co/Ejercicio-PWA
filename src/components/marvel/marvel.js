import React, { useEffect, useState } from "react";
import CardCharacter from "./cardCharacter/cardCharacter";
import FooterMarvel from "./footerMarvel/foooterMarvel";
import NavbarMarvel from "./navbarMarvel/narvbarMarvel";

const md5 = require("md5"); 

function Marvel () {
    let [characters, setCharacters] = useState([]);
    useEffect(() => {
        if(!navigator.onLine) {
            if(localStorage.getItem("characters") === null) {
                setCharacters("Cargando personajes...");
            } else {
                setCharacters(JSON.parse(localStorage.getItem("characters")))
            }
        } else {
            const combiParam = '1' + 'b6031aeade5fe2bdb2cd740b49a636e7ba2173ac' + 'd87ea8eaa3626c8eff91f827828cf776';
            const hash = md5(combiParam);
            const urlAPI = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d87ea8eaa3626c8eff91f827828cf776&hash=${hash}`
            fetch(urlAPI).then((res) => res.json()).then((data) => {
                console.log("Respose", data.data.results);
                setCharacters(data.data.results);
                console.log(JSON.stringify(data.data.results))
                localStorage.setItem("characters", JSON.stringify(data.data.results));
            })
        }
    }, [])
    return (
        <div>
            <NavbarMarvel/>
            <div className="container mt-3">
                <div className="row">
                    {characters.map((c) => <CardCharacter character={c} key={c.id}/>)}
                </div>
            </div>
            <FooterMarvel/>
        </div>
    );
}

export default Marvel;
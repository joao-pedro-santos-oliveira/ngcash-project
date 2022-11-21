import React, {useState} from "react";
import 'tachyons';
import AccountData from "./account-data";
import Login from "./login";
import { Link } from "react-router-dom";

function Account({name, ChangeRoute, showBalance, balance}:any){

    function routeChanging(){
        ChangeRoute('transaction')
    }



    return(
        <article className="mw7 center ph3 ph5-ns tc br2 pv5 white mb5">
            <AccountData name={name} balance={balance}/>
            
            <div>
                <a className="f6 br-pill no-underline white ba b--dark-green grow pv2 ph3 dib mr3"href="#" onClick={() => ChangeRoute('transaction')}>Transferir</a>
                
                <a onClick={() => ChangeRoute('login')} className="f6 br-pill no-underline white ba b--dark-green grow pv2 ph3 dib mr3"
                href="#">
                Sair
                </a>
            </div>
        </article>
    )
}

export default Account;
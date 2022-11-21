import React from "react";
import 'tachyons'
import balance from './tranfers'

function AccountData({name, balance}:any){
    

    return(
        <div>
            <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
                Olá, {name}.
            </h1>
            <h2 className="fw2 f4 lh-copy mt0 mb3">
            Gostaria de realizar uma transferencia?
            </h2>
        </div>
    )
}

export default AccountData;
import React, {useState} from "react";
import 'tachyons'


function Transfers({name, ChangeRoute, showBalance}:any){
    const [transfer, setTransfer]:any = useState('')


    const onHandleClick = () => {
        fetch('http://localhost:8000/transaction', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              transfer,
              name
            })
          }).then(response => response.json())
          .then(transfer => {
            if(transfer){
              ChangeRoute('account')
              showBalance(transfer[0])
            }
          })
          

          
    }
          



    return(
        <section className="tc pa3 pa5-ns">
            <article className="hide-child relative ba b--black-20 mw5 center">
                <img src="https://img.freepik.com/premium-vector/cute-robot-waving-hand-cartoon-illustration_138676-2744.jpg" className="db" alt="Foto Ilustrativa" />
                <div className="pa2 bt b--black-20">
                <a className="f6 db link dark-blue hover-blue" href="#">Ronaldinho</a>
                <input type="text"
                name="transfer"
                 className="tc ph3 pv1"
                 placeholder="Insira o valor da transferencia"
                 value={transfer}
                 onChange={transfer => setTransfer(transfer.target.value)}
                  />
                <a className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" href="#" onClick={onHandleClick}>Transferir</a>
                </div>
                <a className="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b" href="#">×</a>
            </article>
            
        </section>
    )
}

export default Transfers;
import React, {useState} from "react";


function Register({ChangeRoute}:any){
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

      const handleClickButton = () => {
        if(password.length >= 8 && username.length > 3){
          fetch('http://localhost:8000/registro', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            name,
            username,
            password
          })
        }).then(response => response.json())
        .then(user => {
          if(user.id && user.username){
            ChangeRoute('login')
          }
        })
        }else{
          alert('Seu username deve possuir no minimo 3 caracteres e sua senha deve possuir no minimo 8 digitos')
          ChangeRoute('register')
        } 
      }

    return(
      <main className="pa4 black-80">
      <form className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Cadastro</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" >Nome</label>
            <input className="pa2 ba bg-transparent hover-bg-black hover-white w-100" type={'text'} name="name" placeholder="Nome" value={name} onChange={name => setName(name.target.value)}/>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6">Nome de Usuário</label>
            <input className="pa2 ba bg-transparent hover-bg-black hover-white w-100" type={'text'} name="username" placeholder="Nome de Usuário" value={username} onChange={username => setUsername(username.target.value) }/>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" >Senha</label>
            <input className="b pa2 ba bg-transparent hover-bg-black hover-white w-100" type={'password'} name="password"  placeholder="Senha" value={password} onChange={password => setPassword(password.target.value)}/>
          </div>
          
        </fieldset>
        <div className="">
        <button className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib" onClick={() => handleClickButton()}>Criar Conta</button>
        </div>
        <div className="lh-copy mt3">
        <button className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib"  onClick={() => ChangeRoute('login')}>Sair</button>
        </div>
      </form>
    </main>
    )
}

export default Register;

import { useEffect, useState, useRef } from 'react'
import './style.css'
import Lixo from '../../assets/lixo.svg'
import api from '../../services/api'


function Home() {

  const [users, setUsers] = useState([])

  const inputNome = useRef()
  const inputEmail = useRef()
  const inputIdade = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    })
    getUsers()
    
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de usuarios</h1>
          <input type='text' name="nome" ref={inputNome} />
          <input type='email' name="email" ref={inputEmail}/>
          <input type='number' name="idade" ref={inputIdade} />
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>

        {users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: {user.nome}</p>
              <p>Email: {user.email}</p>
              <p>Idade: {user.idade}</p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Lixo} />
            </button>
          </div>
        ))}


      </div>
    </>
  )
}

export default Home

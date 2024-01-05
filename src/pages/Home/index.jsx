import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { createData, deleteData, getData, updateData } from '../../store/products/productActions'
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { logoutAsync } from '../../store/users/userThunks'
import AntdDrawer from '../../components/antdDrawer'


function Home() {

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const dispatch = useDispatch()
  const { products } = useSelector( store => store.product )


  useEffect(() => {
    dispatch(getData())
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    const product = {
      name,
      price
    }
    dispatch(createData(product))
  }

  const handleEdit = (item) => {
    setName(item.name)
    setPrice(item.price)
    setId(item.id)
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault()
    const product = {
      id,
      name,
      price
    }
    dispatch(updateData(product))
  }

  const handleDelete = (id) => {
    dispatch(deleteData(id))
  }

  return (
    <div className='w-full flex flex-col gap-3'>
      <h1 className='text-center text-xl font-black tracking-widest text-indigo-800'>CRUD Productos</h1>
      <AntdDrawer/>
      <button 
        className='bg-indigo-500 px-3 py-1 rounded text-white'
        type='button'
        onClick={() => dispatch(logoutAsync())}
      >
        Cerrar sesión
      </button>
      <form className='flex flex-col gap-3 p-5 rounded bg-indigo-100'>
        <input type='text' readOnly hidden value={id}/>
        <div className='flex gap-3'>
          <label className='text-indigo-800' htmlFor='input-name'>Nombre de producto</label>
          <input 
            className='border-2 border-indigo-500 rounded px-3'
            type='text' 
            name='name' value={name} 
            placeholder='Ingrese el nombre de producto' 
            onChange={(e) => setName(e.target.value)}
            id='input-name'
          />
        </div>
        <div className='flex gap-3'>
          <label className='text-indigo-800' htmlFor='input-price'>Precio de producto</label>
          <input 
            className='border-2 border-indigo-500 rounded px-3' 
            type='number' 
            name='price' 
            value={price} 
            placeholder='Ingrese el precio de producto' 
            onChange={(e) => setPrice(e.target.value)}
            id='input-price'
          />
        </div>
        <div className='flex  gap-5'>
          <button 
            className='bg-indigo-500 px-3 py-1 rounded text-white'
            type='button' 
            onClick={(e) => handleSubmit(e)}
          >
            Enviar producto
          </button>
          <button 
            className='bg-emerald-400 px-3 py-1 rounded text-white'
            type='button' 
            onClick={(e) => handleSubmitEdit(e)}
          >
            Editar
          </button>
        </div>

      </form>
      {
        products.map(item => (
          <div className='flex gap-9 p-5 rounded bg-indigo-100 justify-start' key={item.id}>
            <div>
              <div>
                <span className='font-semibold px-3'>Producto:</span>
                <span>{item.nombre || item.name}</span>
              </div>
              <div>
                <span className='font-semibold px-3'>Precio:</span>
                <span>${item.precio || item.price}</span>
              </div>
            </div>
            <div className='flex gap-2'>
              <button className='bg-orange-400 px-4 rounded text-white' type='button' onClick={() => handleEdit(item)}><FaEdit /></button>
              <button className='bg-red-400 px-4 rounded text-white' type='button' onClick={() => handleDelete(item.id)}><MdDelete /></button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Home
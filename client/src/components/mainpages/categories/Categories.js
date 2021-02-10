import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="w-5/6 md:w-1/2 m-auto mt-10">
            <form onSubmit={createCategory} className="flex items-center justify-center space-x-4 p-5 h-20 bg-gray-100 shadow-xl">
                <label htmlFor="category">Category</label>
                <input className="w-1/2 rounded-md pl-5" type="text" name="category" value={category} required
                onChange={e => setCategory(e.target.value)} />

                <button className="p-2 bg-red-300 px-5 hover:bg-red-400  transition duration-300 ease-in-out uppercase text-sm font-semibold rounded-md" type="submit">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-4">
                {
                    categories.map(category => (
                        <div className="col-span-1 bg-gray-300 flex flex-col justify-center items-center w-full shadow-lg rounded-xl" key={category._id}>
                            <p className="text-2xl uppercase mt-3 mb-3 font-pop font-bold">{category.name}</p>
                            <div className="flex justify-between items-center space-x-3 w-full p-2 mb-1">
                                <button className="bg-white shadow-md uppercase text-xs hover:bg-green-400 focus:outline-none  transition duration-300 ease-in-out  p-1 rounded-full  w-full" onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button className="bg-white shadow-md uppercase text-xs hover:bg-red-400   focus:outline-none transition duration-300 ease-in-out p-1 rounded-full  w-full" onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories

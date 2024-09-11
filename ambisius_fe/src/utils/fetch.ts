import { Dispatch, SetStateAction } from 'react';
import {WorkerType} from '@/types/Worker.type';
import { alertMessage } from '@/utils/alertMessage';

export const fetchData = (url:string, setData: Dispatch<SetStateAction<WorkerType[]>>, setPagination:any) =>{
    fetch(url).then(res =>{
      if(res){
        return res.json()
      }
      setData([])
    }).then((data)=>{
      setData(data?.params?.data)
      setPagination(data?.params?.pagination)
    })
}

export const fetchDeleteWorker = async (url: string, data: number [], action?: any)=>{
  try {
    const response = await fetch(url,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),

    })
    if(response){
      const data = await response?.json()
      alert(data?.message)
      return "ok"
    }
  }catch (e: Error | unknown) {
    if(e instanceof  Error){
      alert(e.message)
    }
    alert("something went wrong")

  }
}

export const fetchCreateWorker = async ( url:string, data: WorkerType[], setData: Dispatch<SetStateAction<WorkerType[]>>, action:any) =>{
  try {
    const response = await fetch(url, {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    if(response){
      const data = await  response.json()
      setData(data?.params?.data)
      if(action){
        action()
      }
      alert(data?.message)

    }
  }catch (e) {
    alert('something went wrong')
  }
}

export const fetchUpdateWorker = async ( url:string, data: WorkerType[]) =>{
  try {
    const response = await fetch(url, {
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    if(response){
      // alertMessage('Berhasil Update Data', 'success')
      const data = await  response.json()
      alert(data?.message)
      return "ok"
    }
  }catch (e) {
    alert('something went wrong')
  }
}

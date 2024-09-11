'use client';
import { TabSortComponent } from '@/components/TabSortComponent';
import { ChangeEvent, useEffect, useState } from 'react';
import { fetchData, fetchDeleteWorker, fetchUpdateWorker } from '@/utils/fetch';
import { HeaderCrud } from '@/components/HeaderCrud';
import { WorkerType } from '@/types/Worker.type';
import { ModalAdd } from '@/components/ModalAdd';

export const dynamic = 'force-dynamic';
export default function Home() {
  const [orderBy, setOrderby] = useState<string>('asc');
  const [page, setPage] = useState(1)
  const [isAcending, setIsAscending] = useState(false);
  const [dataWorker, setDataWorker] = useState<WorkerType[]>([]);
  const [pagination, setPagination] = useState<any>()
  const [modalAdd, setModalAdd] = useState(false);
  const [isWantToDelete, setIsWantToDelete] = useState(false)
  const [dataDelete, setDataDelete] = useState<number[]>([])
  const [sortType, setSortType] = useState('') //sort=first_name&orderby=asc
  const [dataUpdatedWorker, setDataUpdatedWorker] = useState<WorkerType[]>([])
  const onCLickTabSort = (nameTab: string) => {
    setSortType(nameTab);
  };
  const togleIc = () => {
    setIsAscending(prev =>{
      if(prev){
        setOrderby('desc')
      }else{
        setOrderby('asc')
      }
      return !prev
    } );
  };
  useEffect(() => {
    fetchData(`http://localhost:3000/api/worker?page=${page}&sort=${sortType}&orderby=${orderBy}`, setDataWorker, setPagination);
  setDataUpdatedWorker([])
    }, [sortType, orderBy, page]);

  const [dataAddWorker, setDataAddWorker] = useState<WorkerType[]>([{
    first_name:"", email: '', id: 0, last_name: '', position: ''
  }])

  const handleDelete = async () =>{
    if(isWantToDelete){
      if(dataDelete.length > 0 ){
        const res = await fetchDeleteWorker('http://localhost:3000/api/worker',dataDelete, )
        if(res === "ok"){
          const filtered = dataWorker.filter(item => !dataDelete.includes(item.id))
          setDataWorker(filtered)
          setIsWantToDelete(false)
        }
      }else{
        setIsWantToDelete(false)

      }
    }else{
      setIsWantToDelete(true)
    }
  }
  const handleAddBtn = () =>{
    setModalAdd(true)
  }
  const handleSave = async () =>{
    if(dataUpdatedWorker.length <= 0){
      return
    }
    const updateWorker = await  fetchUpdateWorker('http://localhost:3000/api/worker', dataUpdatedWorker)
    if(updateWorker){
      setDataUpdatedWorker([])
    }
  }


  const onChange = (id: number, key: keyof WorkerType) => (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setDataWorker(prev => {
      return prev.map(item => {
        if (item.id === id) {
          setDataUpdatedWorker(prev2 => {
            const itemExists = prev2.some(item => item.id === id);
            if (itemExists) {
              return prev2.map(item => {
                if (item.id === id) {
                  return {
                    ...item,
                    [key]: newValue
                  };
                }
                return item;
              });
            }else{
              return  [...prev2, item]
            }
          });
          return {
            ...item,
            [key]: newValue
          };
        }
        return item;
      });
    });


  };
  return (
    <main className="w-full" id={'main-content'} >
      <HeaderCrud onSaveBtn={handleSave} onDeleteBtn={handleDelete} onAddBtn={handleAddBtn} />
      <div className={'grid grid-cols-4 mb-4'}>
        <TabSortComponent value={'first_name'} togleIc={togleIc} onClick={onCLickTabSort} isAscending={isAcending} title={'First Name'}
                          isClicked={sortType === 'first_name'} />
        <TabSortComponent value={'last_name'} togleIc={togleIc} onClick={onCLickTabSort} isAscending={isAcending} title={'Last Name'}
                          isClicked={sortType === 'last_name'} />
        <TabSortComponent value={'position'} togleIc={togleIc} onClick={onCLickTabSort} isAscending={isAcending} title={'Position'}
                          isClicked={sortType === 'position'} />
        <TabSortComponent value={'email'} togleIc={togleIc} onClick={onCLickTabSort} isAscending={isAcending} title={'Email'}
                          isClicked={sortType === 'email'} />
      </div>

      {dataWorker?.map((item, index) => {

        return (
          <div key={item.id} className={`grid grid-cols-4 gap-6 px-4`}>
            {isWantToDelete ? (
              <div className={'flex flex-row items-center gap-4 transition-all ease-in-out'}>
                <input
                  onChange={(e)=>{
                    if(e.target.checked){
                     setDataDelete((prev) =>{
                       const newArr = [...prev]
                       newArr.push(item.id)
                       return newArr
                     })
                  }}}
                  type={'checkbox'} />
                <input onChange={onChange(item.id,'first_name')} placeholder={'Worker\'s first name'} type={'text'} value={item.first_name} className={'my-2'} />
              </div>

            ) : <input onChange={onChange(item.id,'first_name')} placeholder={'Worker\'s first name'} type={'text'} value={item.first_name} className={'my-2'} />}
            <input
              onChange={onChange(item.id,'last_name')}
              placeholder={'Worker\'s last name'} type={'text'} value={item.last_name} className={'my-2'}  />
            <input
              onChange={onChange(item.id,'position')}
              placeholder={"Worker's position"} type={'text'} value={item.position} className={'my-2'}  />
            <input
              onChange={onChange(item.id,'email')}
              placeholder={"Worker's mail"} type={'text'} value={item.email} className={'my-2'}  />
          </div>
        );
      })}
      {pagination ? (
        <div className={'flex flex-row justify-end px-32 mt-16'}>
          <div className={'w-8 h-8 flex flex-col justify-center items-center bg-slate-500 text-white rounded-md hover:cursor-pointer  '}>
            {pagination?.total_page}
          </div>

        </div>
      ) : null}
      <ModalAdd data={dataAddWorker} setData={setDataAddWorker} isOpen={modalAdd} setModalAdd={setModalAdd} setDataWorker={setDataWorker} />
    </main>
  )
    ;
}

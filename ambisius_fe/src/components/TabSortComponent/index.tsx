import { IcAsc } from '@/assets/IcAsc';
import { Dispatch, SetStateAction, useState } from 'react';
import { IcDesc } from '@/assets/IcDesc';
import { WorkerType } from '@/types/Worker.type';

type props = {
  title: string,
  isClicked: boolean
  isAscending?:boolean
  onClick: (nameTab: string) => void
  togleIc: ()=> void
  value: keyof WorkerType
}
export const TabSortComponent = ({title, isClicked, onClick, isAscending, togleIc, value}:props) =>{
  const ascending = isClicked ?  isAscending ? <IcAsc /> : <IcDesc/> : null

  return(
    <div onClick={()=> !isClicked ? onClick(value) : togleIc() } className={'flex items-center gap-4 self-center bg-slate-100 hover:bg-slate-200 hover:cursor-pointer justify-center p-2'}>
      <p>{title}</p>
      {ascending}
    </div>
  )
}
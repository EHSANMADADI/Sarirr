import React from 'react'
import HeaderMenue from '../Share/HeaderMenue'
import TitleDetails from '../Share/TitleDetails'
import DecryptorBody from './DecryptorBody'

export default function DecryptorComponnent() {
  return (
    <div className='overflow-hidden mx-auto h-screen'>
    <HeaderMenue />
    <div className="pb-20 overflow-auto h-[90vh] w-full bg-blue-50">
      <TitleDetails
        title={"ابزار یافتن رمزینه فایل های رمزنگاری شده"}
        detailes="ابزاری که به کاربران اجازه میدهد به اطلاعات محرمانه دسترسی پیدا کنند"
      />
      <DecryptorBody />
    </div>
  </div>
  )
}

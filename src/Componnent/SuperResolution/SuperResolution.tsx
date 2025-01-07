import React from "react";
import HeaderMenue from "../Share/HeaderMenue";
import TitleDetails from "../Share/TitleDetails";
import Container from './Container';
import './styles.css'




export default function SuperResolution() {
    return (
        <div className='overflow-hidden h-screen'>
            <HeaderMenue />
            <div className="pb-20 overflow-auto h-[90vh] bg-blue-50 font-Byekan">
                <TitleDetails
                    title={"ابزار هوشمند بهبود کیفیت تصاویر"}
                    detailes="با این ابزار می‌توانید کیفیت تصاویر خود را بهبود دهید."
                />
                <Container />
            </div>
        </div>
    );
}

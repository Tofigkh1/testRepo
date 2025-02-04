import { WhatsApp } from '@mui/icons-material';
import Image from 'next/image';
import React from 'react';
import WhatssapIcon from '../../../p'

const WhatsAppButton = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = '994503552716'; // Telefon numarası (başında '+' olmadan)
        const message = 'Merhaba, bu ürünü almak istiyorum.'; // Gönderilecek mesaj
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Kullanıcıyı WhatsApp URL'ine yönlendir
        window.open(whatsappUrl, '_blank');
    };

    return (
        <button onClick={handleWhatsAppClick}>
             <Image width={70} height={70} alt='icon'/>
            WhatsApp ile Mesaj Gönder
        </button>
    );
};

export default WhatsAppButton;

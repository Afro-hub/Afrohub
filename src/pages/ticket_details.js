import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/Contact.module.css';

import Head from 'next/head';
import {
  MapPinIcon,
  ArrowLeftIcon,
  MapIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';

const SectionCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm p-5 mb-6 ${className}`}>{children}</div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center mb-3">
    {Icon && <Icon className="h-5 w-5 text-blue-500 mr-2" />}
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
    <span className="text-gray-500">Loading event details...</span>
  </div>
);

const EventMap = ({ latitude, longitude, onOpenMap }) => (
  <div className="relative">
    <div className="h-56 bg-gray-200 rounded-lg overflow-hidden">
      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <MapPinIcon className="h-12 w-12 text-red-500 mx-auto mb-2" />
        <p className="text-sm text-gray-600">Map Location</p>
        <p className="text-xs text-gray-500">{latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
      </div>
    </div>
    <button
      onClick={onOpenMap}
      className="absolute bottom-3 left-3 bg-white border-2 border-blue-500 rounded-lg px-3 py-1.5 flex items-center space-x-2 hover:bg-blue-50 transition-colors"
    >
      <MapIcon className="h-4 w-4 text-blue-500" />
      <span className="text-blue-500 font-medium text-sm">View On Map</span>
    </button>
  </div>
);

export default function TicketDetails() {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://afrohub.onrender.com/api/events/${eventId}`);
        if (!response.ok) throw new Error('Failed to fetch event');
        const data = await response.json();
        setEvent(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [eventId]);

  const openMap = () => {
    if (!event) return;
    const { latitude, longitude } = event;
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const appleUrl = `http://maps.apple.com/?ll=${latitude},${longitude}`;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    window.open(isIOS ? appleUrl : googleUrl, '_blank');
  };

  if (isLoading) return <LoadingSpinner />;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
          <button
            onClick={() => router.back()}
            className="bg-white text-gray-800 px-6 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const eventPrice = ['free', 'Free', '', '0', '0.0'].includes(event.price) ? '0' : event.price;

  return (
        <Layout title="AfroHub | Connect with African Culture">
    
 <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10" style={{ paddingTop: 80 }}>
  {/* LEFT: Event Image */}
          
    <Image
      src={event.image.startsWith('http') ? event.image : `/images/${event.image}`}
      alt={event.title}
      width={700}
      height={700}
      className="rounded-[12px] shadow-md object-cover w-full h-auto"
      />

  {/* RIGHT: Event Details */}
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
    <p className="text-sm text-gray-500">{event.date} • {event.time} • {eventPrice === '0' ? 'Free' : `$${eventPrice}`}
    </p>
    <p className="text-gray-700">{event.description}</p>

    <div className="flex items-center text-gray-600 space-x-2">
    <div className={styles.mapContainer}>
            <div className={styles.map}>
              <iframe
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '12px' }}
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${event.longitude - 0.01}%2C${event.latitude - 0.01}%2C${event.longitude + 0.01}%2C${event.latitude + 0.01}&layer=mapnik&marker=${event.latitude}%2C${event.longitude}`}
                />

             
            </div>
          </div>
          

    </div>

<div style={{ paddingTop: 12 }}>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition" onClick={openMap}>
     
  View Full Map  </button></div>
  </div>
</div>

    </Layout>
  );
}
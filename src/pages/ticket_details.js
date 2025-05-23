import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
    <>
      <Head>
        <title>{event.title} • Event Details</title>
        <meta name="description" content={event.description} />
      </Head>
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur px-4 py-3 flex items-center shadow-sm">
          <button
            onClick={() => router.back()}
            className="bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-blue-600" />
          </button>
          <span className="ml-4 text-lg font-semibold text-gray-800 truncate">
            {event.title}
          </span>
        </div>

        <div className="relative h-72 sm:h-96">
          <Image
            src={event.image.startsWith('http') ? event.image : `/images/${event.image}`}
            alt={event.title}
            fill
            className="object-cover rounded-b-3xl"
            priority
          />
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6">
          <SectionCard>
            <p className="text-gray-500 text-sm mb-1">{event.date} {event.time}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h1>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </SectionCard>

          <SectionCard className="flex items-center">
            <TicketIcon className="h-6 w-6 text-blue-500 mr-3" />
            <span className="font-medium text-gray-700">Price</span>
            <div className="ml-auto">
              <span className="text-xl font-semibold text-gray-800">
                {eventPrice === '0' ? 'Free' : `$${eventPrice}`}
              </span>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeader icon={TicketIcon} title="Category" />
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </span>
          </SectionCard>

          <SectionCard>
            <SectionHeader icon={MapPinIcon} title="Address" />
            <p className="text-gray-600">{event.address}</p>
          </SectionCard>

          <SectionCard>
            <SectionHeader title="Description" />
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </SectionCard>

          <SectionCard>
            <SectionHeader icon={TicketIcon} title="Availability" />
            <div className="bg-green-50 p-4 rounded-lg flex items-center">
              <div className="flex-1">
                <p className="font-medium text-green-800">Tickets Available</p>
                <p className="text-sm text-green-600">{event.unit} tickets remaining</p>
              </div>
              <div className="text-2xl font-bold text-green-600">{event.unit}</div>
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeader icon={MapIcon} title="Location" />
            <EventMap
              latitude={event.latitude}
              longitude={event.longitude}
              onOpenMap={openMap}
            />
          </SectionCard>
        </div>

        {event.unit > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t px-4 py-4 flex justify-center">
            <button
              className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition"
            >
              Buy Ticket
            </button>
          </div>
        )}
      </div>
    </>
  );
}
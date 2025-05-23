// ticket_details.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { 
  MapPinIcon, 
  ArrowLeftIcon,
  MapIcon,
  TicketIcon
} from '@heroicons/react/24/outline';

// Types (using JSDoc for better IDE support)
/**
 * @typedef {Object} EventDetails
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} location
 * @property {string} address
 * @property {string} image
 * @property {string} date
 * @property {string} time
 * @property {string} price
 * @property {string} category
 * @property {number} unit - available tickets
 * @property {number} latitude
 * @property {number} longitude
 */

// API functions (you'll need to implement these based on your backend)
/**
 * @param {string} eventId 
 * @returns {Promise<EventDetails>}
 */
const getEventDetails = async (eventId) => {
  const response = await fetch(`https://afrohub.onrender.com/api/events/${eventId}`);
  if (!response.ok) throw new Error('Failed to fetch event details');
  return response.json();
};

// Helper function to determine image source
/**
 * @param {string} image 
 * @returns {string}
 */
const getImageSrc = (image) => {
  if (image.startsWith('http')) {
    return image;
  } else {
    try {
      // For base64 images
      return `data:image/jpeg;base64,${image}`;
    } catch (e) {
      return '/images/fallback.png';
    }
  }
};

// Map component (you can use react-leaflet or Google Maps)
/**
 * @param {Object} props
 * @param {number} props.latitude
 * @param {number} props.longitude  
 * @param {Function} props.onOpenMap
 */
const EventMap = ({ latitude, longitude, onOpenMap }) => {
  return (
    <div className="relative">
      <div className="h-56 bg-gray-200 rounded-lg overflow-hidden">
        {/* Replace with actual map component */}
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
          <div className="text-center">
            <MapPinIcon className="h-12 w-12 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Map Location</p>
            <p className="text-xs text-gray-500">{latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
          </div>
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
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
  </div>
);

export default function TicketDetails() {
  const router = useRouter();
  const { eventId } = router.query;
  
  // State
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch event details
  useEffect(() => {
    if (!eventId || typeof eventId !== 'string') return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const eventDetails = await getEventDetails(eventId);
        setEvent(eventDetails);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  // Open map
  const openMap = () => {
    if (!event) return;
    
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${event.latitude},${event.longitude}`;
    const appleMapsUrl = `http://maps.apple.com/?ll=${event.latitude},${event.longitude}`;
    
    // Try to open Apple Maps on iOS devices, otherwise Google Maps
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    window.open(isIOS ? appleMapsUrl : googleMapsUrl, '_blank');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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

  const eventPrice = event.price === 'free' || event.price === 'Free' || event.price === '' || event.price === '0' || event.price === '0.0' ? '0' : event.price;

  return (
    <>
      <Head>
        <title>{event.title} - Event Details</title>
        <meta name="description" content={event.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Image Section */}
        <div className="relative h-80">
          <Image
            src={getImageSrc(event.image)}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          
          {/* Header Controls */}
          <div className="absolute top-4 left-4">
            <button
              onClick={() => router.back()}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-6 pb-8">
          {/* Event Info */}
          <div>
            <p className="text-gray-600 text-sm mb-2">{event.date} {event.time}</p>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Price Card */}
          <div className="bg-blue-50 p-4 rounded-lg flex items-center">
            <TicketIcon className="h-6 w-6 text-blue-500 mr-3" />
            <span className="font-medium text-gray-700">Price</span>
            <div className="ml-auto">
              <span className="text-xl font-semibold text-gray-800">${eventPrice}</span>
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Category</h3>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </span>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Address</h3>
            <p className="text-gray-600">{event.address}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          {/* Available Tickets */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Availability</h3>
            <div className="bg-green-50 p-4 rounded-lg flex items-center">
              <div className="flex-1">
                <p className="font-medium text-green-800">Tickets Available</p>
                <p className="text-sm text-green-600">{event.unit} tickets remaining</p>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {event.unit}
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Location</h3>
            <EventMap
              latitude={event.latitude}
              longitude={event.longitude}
              onOpenMap={openMap}
            />
          </div>
        </div>
      </div>
    </>
  );
}
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../components/Layout';
import Head from 'next/head';
import {
  MapPinIcon,
  ArrowLeftIcon,
  MapIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';

const styles = {
  mapContainer: {
    width: '100%',
    height: '400px',
    position: 'relative',
    marginTop: '2rem',
  },
  map: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '12px',
  },
  mapPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -100%)',
    fontSize: '2rem',
    animation: 'bounce 1s infinite',
  },
  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translate(-50%, -100%) translateY(0)',
    },
    '50%': {
      transform: 'translate(-50%, -100%) translateY(-10px)',
    },
  },
};

const SectionCard = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-xl shadow-sm p-5 mb-6 ${className}`}
    style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '1.25rem',
      marginBottom: '1.5rem',
    }}
  >
    {children}
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div
    className="flex items-center mb-3"
    style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.75rem',
    }}
  >
    {Icon && (
      <Icon
        className="h-5 w-5 text-blue-500 mr-2"
        style={{
          height: '1.25rem',
          width: '1.25rem',
          color: '#3b82f6',
          marginRight: '0.5rem',
        }}
      />
    )}
    <h3
      className="text-lg font-bold text-gray-800"
      style={{
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#1f2937',
      }}
    >
      {title}
    </h3>
  </div>
);

const LoadingSpinner = () => (
  <div
    className="flex flex-col justify-center items-center min-h-screen"
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <div
      className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"
      style={{
        animation: 'spin 1s linear infinite',
        borderRadius: '50%',
        height: '4rem',
        width: '4rem',
        borderBottom: '2px solid #3b82f6',
        marginBottom: '1rem',
      }}
    ></div>
    <span
      className="text-gray-500"
      style={{ color: '#6b7280' }}
    >
      Loading event details...
    </span>
  </div>
);

const EventMap = ({ latitude, longitude, onOpenMap }) => (
  <div style={{ position: 'relative' }}>
    <div
      className="h-56 bg-gray-200 rounded-lg overflow-hidden"
      style={{
        height: '14rem',
        backgroundColor: '#e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div
        className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center"
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom right, #dbeafe, #dcfce7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <MapPinIcon
          className="h-12 w-12 text-red-500 mx-auto mb-2"
          style={{
            height: '3rem',
            width: '3rem',
            color: '#ef4444',
            margin: '0 auto 0.5rem',
          }}
        />
        <p
          className="text-sm text-gray-600"
          style={{
            fontSize: '0.875rem',
            color: '#4b5563',
          }}
        >
          Map Location
        </p>
        <p
          className="text-xs text-gray-500"
          style={{
            fontSize: '0.75rem',
            color: '#6b7280',
          }}
        >
          {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </p>
      </div>
    </div>
    <button
      onClick={onOpenMap}
      className="absolute bottom-3 left-3 bg-white border-2 border-blue-500 rounded-lg px-3 py-1.5 flex items-center space-x-2 hover:bg-blue-50 transition-colors"
      style={{
        position: 'absolute',
        bottom: '0.75rem',
        left: '0.75rem',
        backgroundColor: 'white',
        border: '2px solid #3b82f6',
        borderRadius: '8px',
        padding: '0.375rem 0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#eff6ff';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'white';
      }}
    >
      <MapIcon
        className="h-4 w-4 text-blue-500"
        style={{
          height: '1rem',
          width: '1rem',
          color: '#3b82f6',
        }}
      />
      <span
        className="text-blue-500 font-medium text-sm"
        style={{
          color: '#3b82f6',
          fontWeight: '500',
          fontSize: '0.875rem',
        }}
      >
        View On Map
      </span>
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
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="text-center"
          style={{ textAlign: 'center' }}
        >
          <h2
            className="text-2xl font-bold text-gray-800 mb-4"
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem',
            }}
          >
            Event Not Found
          </h2>
          <button
            onClick={() => router.back()}
            className="bg-white text-gray-800 px-6 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
            style={{
              backgroundColor: 'white',
              color: '#1f2937',
              padding: '0.5rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
            }}
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
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

      <div
        className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10"
        style={{
          paddingTop: '80px',
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '3rem 1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {/* LEFT: Event Image */}
        <Image
          src={event.image.startsWith('http') ? event.image : `/images/${event.image}`}
          alt={event.title}
          width={700}
          height={700}
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            objectFit: 'cover',
            width: '100%',
            height: 'auto',
          }}
        />

        {/* RIGHT: Event Details */}
        <div
          className="space-y-6"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              color: '#111827',
            }}
          >
            {event.title}
          </h1>

          <p
            className="text-sm text-gray-500"
            style={{
              fontSize: '0.875rem',
              color: '#6b7280',
            }}
          >
            {event.date} • {event.time} • {eventPrice === '0' ? 'Free' : `$${eventPrice}`}
          </p>

          <p
            className="text-gray-700"
            style={{ color: '#374151' }}
          >
            {event.description}
          </p>

          <div
            className="flex items-center text-gray-600 space-x-2"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#4b5563',
              gap: '0.5rem',
            }}
          >
            <div style={styles.mapContainer}>
              <div style={styles.map}>
                <iframe
                  width="100%"
                  height="300"
                  style={{
                    border: 0,
                    borderRadius: '12px',
                    width: '100%',
                    height: '100%',
                  }}
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${event.longitude - 0.01}%2C${event.latitude - 0.01}%2C${event.longitude + 0.01}%2C${event.latitude + 0.01}&layer=mapnik&marker=${event.latitude}%2C${event.longitude}`}
                />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '12px' }}>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition"
              onClick={openMap}
              style={{
                width: '100%',
                backgroundColor: '#2563eb',
                color: 'white',
                fontWeight: '700',
                padding: '0.75rem',
                borderRadius: '12px',
                fontSize: '1.125rem',
                boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View Full Map
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
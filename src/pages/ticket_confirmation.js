import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/Contact.module.css';

import Head from 'next/head';
import {
  CheckCircleIcon,
  ArrowLeftIcon,
  TicketIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  PrinterIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

const SectionCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm p-5 mb-6 ${className}`}>{children}</div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center mb-3">
    {Icon && <Icon className="h-5 w-5 text-green-500 mr-2" />}
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mb-4"></div>
    <span className="text-gray-500">Loading confirmation details...</span>
  </div>
);

const ConfirmationSuccess = () => (
  <div className="text-center mb-8">
    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
    <p className="text-gray-600">Your ticket purchase has been successfully processed.</p>
  </div>
);

const TicketInfo = ({ ticketCount, buyerName, confirmationNumber }) => (
  <SectionCard className="border-l-4 border-green-500">
    <SectionHeader icon={TicketIcon} title="Ticket Information" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-500 mb-1">Confirmation Number</p>
        <p className="font-bold text-lg text-gray-900">{confirmationNumber}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Number of Tickets</p>
        <p className="font-bold text-lg text-gray-900">{ticketCount}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Buyer Name</p>
        <p className="font-bold text-lg text-gray-900">{buyerName}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Purchase Date</p>
        <p className="font-bold text-lg text-gray-900">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  </SectionCard>
);

const EventSummary = ({ event, ticketCount }) => {
  const eventPrice = ['free', 'Free', '', '0', '0.0'].includes(event.price) ? '0' : event.price;
  const totalPrice = eventPrice === '0' ? 0 : parseFloat(eventPrice) * parseInt(ticketCount);
  
  return (
    <SectionCard>
      <div className="flex space-x-4">
        <Image
      src={event.image.startsWith('http') ? event.image : `/images/${event.image}`}
      alt={event.title}
      width={700}
      height={700}
      className="rounded-[12px] shadow-md object-cover w-full h-auto"
      />
        <div className="flex-grow">
          <h3 className="font-bold text-xl text-gray-900 mb-2">{event.title}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <span>{event.location || 'Location TBD'}</span>
            </div>
            <div className="flex items-center">
              <TicketIcon className="h-4 w-4 mr-2" />
              <span>{ticketCount} ticket{ticketCount > 1 ? 's' : ''}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total Paid:</span>
              <span className="font-bold text-xl text-green-600">
                {totalPrice === 0 ? 'Free' : `$${totalPrice.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

const ActionButtons = ({ onPrint, onShare, onViewEvent }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <button
      onClick={onPrint}
      className="flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors"
    >
      <PrinterIcon className="h-5 w-5 mr-2" />
      Print Tickets
    </button>
    <button
      onClick={onShare}
      className="flex items-center justify-center bg-white border-2 border-blue-500 text-blue-600 font-semibold py-3 px-4 rounded-xl hover:bg-blue-50 transition-colors"
    >
      <ShareIcon className="h-5 w-5 mr-2" />
      Share Event
    </button>
    <button
      onClick={onViewEvent}
      className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
    >
      <TicketIcon className="h-5 w-5 mr-2" />
      View Event Details
    </button>
  </div>
);

export default function TicketConfirmation() {
  const router = useRouter();
  const { eventId, ticketCount, buyerName } = router.query;
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  useEffect(() => {
    if (!eventId) return;
    
    // Generate confirmation number
    const generateConfirmationNumber = () => {
      return 'AF' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 3).toUpperCase();
    };
    
    setConfirmationNumber(generateConfirmationNumber());

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

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.origin + `/ticket-details/${eventId}`,
      });
    } else if (event) {
      // Fallback for browsers that don't support Web Share API
      const shareUrl = window.location.origin + `/ticket-details/${eventId}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Event link copied to clipboard!');
      });
    }
  };

  const handleViewEvent = () => {
    router.push(`/ticket-details/${eventId}`);
  };

  const handleBackToEvents = () => {
    router.push('/events'); // Adjust path as needed
  };

  if (isLoading) return <LoadingSpinner />;

  if (!event || !ticketCount || !buyerName) {
    return (
      <Layout title="AfroHub | Ticket Confirmation">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Confirmation Link</h2>
            <p className="text-gray-600 mb-6">The confirmation details could not be found.</p>
            <button
              onClick={handleBackToEvents}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse Events
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="AfroHub | Ticket Confirmation">
      <div className="max-w-4xl mx-auto px-4 py-12" style={{ paddingTop: 80 }}>
               <EventSummary 
          event={event}
          ticketCount={ticketCount}
        />
        
         <ConfirmationSuccess />
        
        <TicketInfo 
          ticketCount={ticketCount}
          buyerName={buyerName}
          confirmationNumber={confirmationNumber}
        />
        

        
        <ActionButtons 
          onPrint={handlePrint}
          onShare={handleShare}
          onViewEvent={handleViewEvent}
        />
        
        <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
          <h3 className="font-bold text-green-800 mb-2">Important Information</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Please save this confirmation for your records</li>
            <li>• Bring a valid ID and this confirmation to the event</li>
            <li>• Arrive at least 30 minutes before the event starts</li>
            <li>• For questions, contact event organizers</li>
          </ul>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={handleBackToEvents}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Browse More Events
          </button>
        </div>
      </div>
    </Layout>
  );
}
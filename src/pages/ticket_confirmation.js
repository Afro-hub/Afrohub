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
  ExclamationTriangleIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
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

const TicketInfo = ({ ticketCount, buyerName, confirmationNumber, userEmail }) => {
  const [copied, setCopied] = useState(false);

  const copyConfirmationNumber = async () => {
    try {
      await navigator.clipboard.writeText(confirmationNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy confirmation number:', err);
    }
  };

  return (
    <SectionCard className="border-l-4 border-green-500">
      <SectionHeader icon={TicketIcon} title="Ticket Information" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Confirmation Number</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-lg text-gray-900">{confirmationNumber}</p>
            <button
              onClick={copyConfirmationNumber}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy confirmation number"
            >
              <DocumentDuplicateIcon className="h-4 w-4" />
            </button>
          </div>
          {copied && <span className="text-xs text-green-600">Copied!</span>}
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
        {userEmail && (
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Email Address</p>
            <p className="font-bold text-lg text-gray-900">{userEmail}</p>
          </div>
        )}
      </div>
    </SectionCard>
  );
};

const EventSummary = ({ event, ticketCount }) => {
  const eventPrice = ['free', 'Free', '', '0', '0.0'].includes(event.pricePerUnit) ? '0' : event.pricePerUnit;
  const totalPrice = eventPrice === '0' ? 0 : parseFloat(eventPrice) * parseInt(ticketCount);
  
  return (
    <SectionCard>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={event.image.startsWith('http') ? event.image : `/images/${event.image}`}
            alt={event.title}
            width={200}
            height={200}
            className="rounded-[12px] shadow-md object-cover w-full md:w-48 h-48"
          />
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-xl text-gray-900 mb-2">{event.title}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{event.location || 'Location TBD'}</span>
            </div>
            <div className="flex items-center">
              <TicketIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{ticketCount} ticket{ticketCount > 1 ? 's' : ''}</span>
            </div>
            {event.theme && (
              <div className="flex items-center">
                <span className="h-4 w-4 mr-2 text-purple-500 flex-shrink-0">🎨</span>
                <span>Theme: {event.theme}</span>
              </div>
            )}
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

const ActionButtons = ({ onPrint, onShare, onViewEvent, onBackToEvents }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <button
      onClick={onPrint}
      className="flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors"
    >
      <PrinterIcon className="h-5 w-5 mr-2" />
      Print Tickets
    </button>
    <button
      onClick={onShare}
      className="flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors"
    >
      <ShareIcon className="h-5 w-5 mr-2" />
      Share Event
    </button>
    <button
      onClick={onViewEvent}
      className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
    >
      <TicketIcon className="h-5 w-5 mr-2" />
      View Event
    </button>
    <button
      onClick={onBackToEvents}
      className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
    >
      <ArrowLeftIcon className="h-5 w-5 mr-2" />
      Back to Events
    </button>
  </div>
);

const EmailConfirmationNotice = ({ userEmail }) => (
  <SectionCard className="border-l-4 border-blue-500">
    <div className="flex items-start space-x-3">
      <EnvelopeIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
      <div>
        <h3 className="font-bold text-blue-800 mb-1">Email Confirmation Sent</h3>
        <p className="text-sm text-blue-700">
          A confirmation email has been sent to <span className="font-semibold">{userEmail}</span>.
          Please check your inbox and spam folder for your ticket details.
        </p>
      </div>
    </div>
  </SectionCard>
);

export default function TicketConfirmation() {
  const router = useRouter();
  const { 
    eventId, 
    ticketCount, 
    buyerName, 
    title, 
    date, 
    time, 
    location, 
    image, 
    theme, 
    pricePerUnit,
    confirmationNumber,
    userEmail 
  } = router.query;
  
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId || !title) {
      setIsLoading(false);
      return;
    }

    try {
      // Create event object from URL parameters
      const eventData = {
        id: eventId,
        title: decodeURIComponent(title || ''),
        date: decodeURIComponent(date || ''),
        time: decodeURIComponent(time || ''),
        location: decodeURIComponent(location || ''),
        image: decodeURIComponent(image || ''),
        theme: theme ? decodeURIComponent(theme) : '',
        pricePerUnit: decodeURIComponent(pricePerUnit || '0')
      };

      setEvent(eventData);
      setError(null);
    } catch (err) {
      console.error('Error parsing event data:', err);
      setError('Failed to load event information');
    } finally {
      setIsLoading(false);
    }
  }, [eventId, title, date, time, location, image, theme, pricePerUnit, confirmationNumber]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (!event) return;

    const shareData = {
      title: event.title,
      text: `Check out this event: ${event.title}`,
      url: `${window.location.origin}/ticket-details/${eventId}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(shareData.url);
        alert('Event link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback to manual copy
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Event link copied to clipboard!');
      } catch (clipboardErr) {
        console.error('Clipboard failed:', clipboardErr);
        alert('Unable to share. Please copy the URL manually.');
      }
    }
  };

  const handleViewEvent = () => {
    router.push(`/ticket-details/${eventId}`);
  };

  const handleBackToEvents = () => {
    router.push('/events');
  };

  if (isLoading) return <LoadingSpinner />;

  if (error || !event || !ticketCount || !buyerName) {
    return (
      <Layout title="AfroHub | Ticket Confirmation">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {error || 'Invalid Confirmation Link'}
            </h2>
            <p className="text-gray-600 mb-6">
              {error || 'The confirmation details could not be found. Please check your email for the correct confirmation link.'}
            </p>
            <button
              onClick={handleBackToEvents}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
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
      <Head>
        <style jsx>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-section, .print-section * {
              visibility: visible;
            }
            .print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 py-12" style={{ paddingTop: 80 }}>
        <div className="print-section">
          <EventSummary 
            event={event}
            ticketCount={ticketCount}
          />
          
          <ConfirmationSuccess />
          
          <TicketInfo 
            ticketCount={ticketCount}
            buyerName={buyerName}
            confirmationNumber={confirmationNumber}
            userEmail={userEmail}
          />
          
          {userEmail && (
            <EmailConfirmationNotice userEmail={userEmail} />
          )}
        </div>
        
        <div className="no-print">
          <ActionButtons 
            onPrint={handlePrint}
            onShare={handleShare}
            onViewEvent={handleViewEvent}
            onBackToEvents={handleBackToEvents}
          />
        </div>
        
        <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
          <h3 className="font-bold text-green-800 mb-2">Important Information</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Please save this confirmation for your records</li>
            <li>• Bring a valid ID and this confirmation to the event</li>
            <li>• Arrive at least 30 minutes before the event starts</li>
            <li>• For questions, contact event organizers</li>
            <li>• Check your email for additional event updates</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

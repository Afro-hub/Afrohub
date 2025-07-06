import { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Share2,
  Ticket,
  User,
  Copy,
  Printer,
  ArrowLeft,
  CheckCircle,
  Mail
} from 'lucide-react';

export default function TicketConfirmation() {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    image: "",
    theme: "",
    pricePerUnit: "0"
  });

  const [orderDetails, setOrderDetails] = useState({
    confirmationNumber: "",
    date: new Date().toLocaleDateString(),
    buyerName: "",
    userEmail: "",
    ticketCount: 0,
    items: [],
    subtotal: 0,
    serviceFee: 0,
    total: 0
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return;
    
    try {
      // Get URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      
      const eventId = urlParams.get('eventId') || '';
      const ticketCount = parseInt(urlParams.get('ticketCount') || '0');
      const buyerName = urlParams.get('buyerName') ? decodeURIComponent(urlParams.get('buyerName')) : '';
      const title = urlParams.get('title') ? decodeURIComponent(urlParams.get('title')) : '';
      const date = urlParams.get('date') || '';
      const time = urlParams.get('time') || '';
      const location = urlParams.get('location') ? decodeURIComponent(urlParams.get('location')) : '';
      const image = urlParams.get('image') || '';
      const theme = urlParams.get('theme') ? decodeURIComponent(urlParams.get('theme')) : '';
      const pricePerUnit = parseFloat(urlParams.get('pricePerUnit') || '0');
      const confirmationNumber = urlParams.get('confirmationNumber') || '';

      // Calculate pricing
      const subtotal = pricePerUnit * ticketCount;
      const serviceFee = subtotal * 0.05; // 5% service fee
      const total = subtotal + serviceFee;

      // Create items array
      const items = Array.from({ length: ticketCount }, () => ({
        name: "General Admission",
        price: pricePerUnit
      }));

      // Update event state
      setEvent({
        title,
        date,
        time,
        location,
        image,
        theme,
        pricePerUnit: pricePerUnit.toString()
      });

      // Update order details
      setOrderDetails({
        confirmationNumber,
        date: new Date().toLocaleDateString(),
        buyerName,
        userEmail: "", // Not provided in URL params
        ticketCount,
        items,
        subtotal,
        serviceFee,
        total
      });
    } catch (error) {
      console.error('Error parsing URL parameters:', error);
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = (platform) => {
    if (typeof window === 'undefined') return;
    
    const shareText = `Check out this event: ${event.title}`;
    const shareUrl = window.location.href;
    
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
    }
  };

  const copyConfirmationNumber = async () => {
    if (typeof window === 'undefined' || !navigator.clipboard) return;
    
    try {
      await navigator.clipboard.writeText(orderDetails.confirmationNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy confirmation number:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your ticket purchase has been successfully processed.</p>
        </div>

        {/* Greeting & Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hi {orderDetails.buyerName || 'Customer'}!</h2>
          <p className="text-gray-600 mb-4">
            Your order for <strong>{event.title || 'Event'}</strong> has been successfully processed. 
            Please see your ticket and order details below.
          </p>
          
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold text-gray-900">Order {orderDetails.confirmationNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">{orderDetails.date}</p>
              </div>
            </div>
            
            {/* Items */}
            <div className="space-y-2 mb-4">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-900">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            {/* Totals */}
            <div className="border-t pt-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee:</span>
                <span className="text-gray-900">${orderDetails.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-green-600">${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-green-500">
          <div className="flex items-center mb-4">
            <Ticket className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Ticket Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Confirmation Number</p>
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg text-gray-900">{orderDetails.confirmationNumber}</p>
                <button
                  onClick={copyConfirmationNumber}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Copy confirmation number"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              {copied && <span className="text-xs text-green-600">Copied!</span>}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Number of Tickets</p>
              <p className="font-bold text-lg text-gray-900">{orderDetails.ticketCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Buyer Name</p>
              <p className="font-bold text-lg text-gray-900">{orderDetails.buyerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Purchase Date</p>
              <p className="font-bold text-lg text-gray-900">{orderDetails.date}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="font-bold text-lg text-gray-900">{orderDetails.userEmail || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Email Confirmation Notice */}
        {orderDetails.userEmail && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-blue-500">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-800 mb-1">Email Confirmation Sent</h3>
                <p className="text-sm text-blue-700">
                  A confirmation email has been sent to <span className="font-semibold">{orderDetails.userEmail}</span>.
                  Please check your inbox and spam folder for your ticket details.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Event Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="rounded-lg shadow-md object-cover w-full md:w-48 h-48"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="flex-grow">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{event.date}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Ticket className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{orderDetails.ticketCount} ticket{orderDetails.ticketCount > 1 ? 's' : ''}</p>
                  </div>
                </div>
                
                {event.theme && (
                  <div className="flex items-start">
                    <span className="text-purple-500 mr-3 mt-0.5">🎨</span>
                    <div>
                      <p className="font-medium text-gray-900">Theme: {event.theme}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer className="h-5 w-5 mr-2" />
            Print Tickets
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Event
          </button>
          <button
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            <Ticket className="h-5 w-5 mr-2" />
            View Event
          </button>
          <button
            className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Events
          </button>
        </div>
        
        {/* Important Information */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-200 mb-6">
          <h3 className="font-bold text-green-800 mb-2">Important Information</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Please save this confirmation for your records</li>
            <li>• Bring a valid ID and this confirmation to the event</li>
            <li>• Arrive at least 30 minutes before the event starts</li>
            <li>• For questions, contact event organizers</li>
            <li>• Check your email for additional event updates</li>
          </ul>
        </div>
        
        {/* Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Need help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              AfroHub is using our ticketing platform to sell and 
              manage tickets for this event. If you have any questions, please contact{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">AfroHub Support</a>.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Create your own event</h4>
            <p className="text-sm text-gray-600 mb-3">
              Anybody can sell and manage tickets using our platform.{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">Learn more</a>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Email footer is managed by the platform settings.
          </p>
        </div>
      </div>
    </div>
  );
}

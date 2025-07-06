import { useState, useEffect } from 'react';
import { CheckCircle, Copy, Calendar, MapPin, Ticket, Palette, Mail, Printer, Share2, ArrowLeft, Eye } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="h-20 w-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="text-white w-10 h-10" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Your ticket purchase has been successfully processed and you're all set for an amazing experience.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Greeting & Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Hi {orderDetails.buyerName || 'Customer'}! 👋
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Your order for <span className="font-semibold text-indigo-600">{event.title || 'Event'}</span> has been successfully processed. 
                  Please see your ticket and order details below.
                </p>
              </div>
              
              {/* Order Summary Card */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Number</p>
                    <p className="font-bold text-xl text-gray-900">{orderDetails.confirmationNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Order Date</p>
                    <p className="font-semibold text-gray-900">{orderDetails.date}</p>
                  </div>
                </div>
                
                {/* Items */}
                <div className="space-y-3 mb-6">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 px-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Ticket className="w-5 h-5 text-indigo-500" />
                        <span className="font-medium text-gray-700">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-medium text-gray-900">${orderDetails.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-green-600">${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{event.title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-indigo-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">{event.date}</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Ticket className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {orderDetails.ticketCount} ticket{orderDetails.ticketCount > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  {event.theme && (
                    <div className="flex items-start space-x-3">
                      <Palette className="w-5 h-5 text-purple-500 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Theme: {event.theme}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center">
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="rounded-xl shadow-lg object-cover w-full max-w-sm h-48 ring-2 ring-gray-100"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Ticket Info & Actions */}
          <div className="space-y-6">
            {/* Ticket Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 border-l-4 border-l-green-500">
              <div className="flex items-center mb-4">
                <Ticket className="w-6 h-6 text-green-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Ticket Details</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Confirmation Number</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-lg text-gray-900 font-mono bg-gray-50 px-3 py-1 rounded">
                      {orderDetails.confirmationNumber}
                    </p>
                    <button
                      onClick={copyConfirmationNumber}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                      title="Copy confirmation number"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  {copied && <span className="text-xs text-green-600 font-medium">Copied!</span>}
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Buyer Name</p>
                  <p className="font-semibold text-gray-900">{orderDetails.buyerName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Purchase Date</p>
                  <p className="font-semibold text-gray-900">{orderDetails.date}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="font-semibold text-gray-900">{orderDetails.userEmail || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Email Confirmation Notice */}
            {orderDetails.userEmail && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Mail className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-800 mb-2">Email Confirmation Sent</h3>
                    <p className="text-sm text-blue-700">
                      A confirmation email has been sent to <span className="font-semibold">{orderDetails.userEmail}</span>.
                      Please check your inbox and spam folder.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
              >
                <Printer className="w-5 h-5 mr-2" />
                Print Tickets
              </button>
              
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Event
              </button>
              
              <button
                className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Eye className="w-5 h-5 mr-2" />
                View Event
              </button>
              
              <button
                className="w-full flex items-center justify-center bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Events
              </button>
            </div>
          </div>
        </div>
        
        {/* Important Information */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="font-bold text-green-800 mb-4 text-lg">📋 Important Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="text-sm text-green-700 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Please save this confirmation for your records</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Bring a valid ID and this confirmation to the event</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Arrive at least 30 minutes before the event starts</span>
              </li>
            </ul>
            <ul className="text-sm text-green-700 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>For questions, contact event organizers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Check your email for additional event updates</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Need help? 🤝</h4>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              AfroHub is using our ticketing platform to sell and 
              manage tickets for this event. If you have any questions, please contact{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold underline">AfroHub Support</a>.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Create your own event 🚀</h4>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              Anybody can sell and manage tickets using our platform.{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold underline">Learn more</a>
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

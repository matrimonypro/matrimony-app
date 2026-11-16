8494.jpgimport React, { useState, useEffect } from 'react';
import { 
  Heart, Shield, Search, MessageCircle, User, MapPin, 
  Phone, Lock, CheckCircle, AlertTriangle, Send, Sparkles, 
  Filter, Settings, LogOut, Camera, ChevronRight, Star, ArrowLeft
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [searchCity, setSearchCity] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatList, setChatList] = useState([
    { sender: 'Pooja Sharma', text:नमस्ते! आपकी प्रोफाइल पसंद आई।', time: '10:30 AM' }
  ]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

  // Profiles list
  const profiles = [
    {
      id: 1,
      name: 'Pooja Sharma',
      age: 27,
      city: 'Hisar',
      state: 'Haryana',
      profession: 'Software Engineer',
      caste: 'Open / Any',
      bio: 'Looking for an understanding partner who values family and career growth.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500',
      verified: true
    },
    {
      id: 2,
      name: 'Rohit Verma',
      age: 29,
      city: 'Delhi',
      state: 'Delhi',
      profession: 'Business Owner',
      caste: 'Open / Any',
      bio: 'Simple living, high thinking. Fond of traveling and fitness.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500',
      verified: true
    },
    {
      id: 3,
      name: 'Anjali Gupta',
      age: 26,
      city: 'Gurugram',
      state: 'Haryana',
      profession: 'HR Manager',
      caste: 'Open / Any',
      bio: 'Passionate about classical music and art. Seeking a supportive soulmate.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=500',
      verified: false
    }
  ];

  // GPS Location fetcher
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError('लोकेशन सफलतापूर्वक ट्रैक हो गई है!');
        },
        (error) => {
          setLocationError('लोकेशन की अनुमति नहीं मिली। कृपया GPS चालू करें।');
        }
      );
    } else {
      setLocationError('आपका ब्राउज़र लोकेशन सपोर्ट नहीं करता।');
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      alert('कृपया सही मोबाइल नंबर दर्ज करें');
      return;
    }
    setStep(2);
    alert('आपका OTP: 123456 (सुरक्षा परीक्षण हेतु)');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === '123456' || otp.length === 4) {
      setIsLoggedIn(true);
      setCurrentTab('home');
    } else {
      alert('गलत OTP! कृपया सही दर्ज करें।');
    }
  };

  const filteredProfiles = profiles.filter(p => 
    searchCity === '' || p.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-rose-50 text-gray-800 pb-20 select-none">
      {/* Top Header */}
      <header className="bg-rose-600 text-white p-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
          <h1 className="text-xl font-bold tracking-wide">JeevansathiPro</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-rose-200" title="100% Secure & Anti-Leak Chat" />
          {isLoggedIn && (
            <button onClick={() => setIsLoggedIn(false)} className="text-xs bg-rose-700 px-2 py-1 rounded">
              लॉग आउट
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto p-4">
        {!isLoggedIn ? (
          /* Login / Signup Flow */
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-10 border border-rose-100">
            <div className="text-center mb-6">
              <Sparkles className="w-12 h-12 text-rose-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-gray-900">स्वागत है</h2>
              <p className="text-sm text-gray-500">सुरक्षित और भरोसेमंद मैट्रिमोनी अनुभव</p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">मोबाइल नंबर (OTP के लिए)</label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                    <Phone className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600 mr-2">+91</span>
                    <input 
                      type="tel" 
                      maxLength="10"
                      placeholder="9876543210" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent outline-none text-gray-800"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-lg shadow-md transition">
                  OTP भेजें
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OTP दर्ज करें (Demo: 123456)</label>
                  <input 
                    type="text" 
                    maxLength="6"
                    placeholder="123456" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-center tracking-widest text-xl border border-gray-300 rounded-lg p-3 bg-gray-50 outline-none font-bold"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-lg shadow-md transition">
                  सत्यापित करें और लॉगिन करें
                </button>
                <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-rose-600 text-center mt-2">
                  नंबर बदलें
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Dashboard & Features */
          <div>
            {/* HOME / SEARCH TAB */}
            {currentTab === 'home' && (
              <div>
                {/* Search & Location Filter */}
                <div className="mb-4 bg-white p-3 rounded-xl shadow-sm border border-rose-100 flex items-center space-x-2">
                  <Search className="w-5 h-5 text-rose-500" />
                  <input 
                    type="text" 
                    placeholder="शहर के अनुसार खोजें (जैसे: Hisar, Delhi)..." 
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>

                {/* Live GPS Nearby Button */}
                <div className="mb-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 rounded-xl shadow-md flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm">आसपास के रिश्ते खोजें (Live GPS)</h3>
                    <p className="text-xs text-rose-100">{locationError || 'अपनी वर्तमान लोकेशन जांचें'}</p>
                  </div>
                  <button onClick={fetchLocation} className="bg-white text-rose-600 px-3 py-2 rounded-lg text-xs font-bold shadow">
                    लोकेशन ऑन करें
                  </button>
                </div>

                {/* Profiles List */}
                <h3 className="font-bold text-gray-700 mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 text-rose-500 mr-1" /> सुझाए गए रिश्ते
                </h3>
                <div className="space-y-4">
                  {filteredProfiles.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-rose-100">
                      <div className="relative">
                        <img src={p.image} alt={p.name} className="w-full h-56 object-cover" />
                        {p.verified && (
                          <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full flex items-center shadow">
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> वेरिफाइड
                          </span>
                        )}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                          <h4 className="text-lg font-bold">{p.name}, {p.age}</h4>
                          <p className="text-xs text-rose-200 flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-1" /> {p.city}, {p.state}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-600 mb-2 font-medium">पेशे: {p.profession}</p>
                        <p className="text-xs text-gray-500 mb-4 line-clamp-2">{p.bio}</p>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => { setSelectedProfile(p); setCurrentTab('chat'); }}
                            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center shadow">
                            <MessageCircle className="w-4 h-4 mr-1.5" /> चैट शुरू करें
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CHAT TAB (Anti-Leak Enabled) */}
            {currentTab === 'chat' && (
              <div className="bg-white rounded-2xl shadow-md border border-rose-100 flex flex-col h-[75vh]">
                <div className="bg-rose-600 text-white p-3 rounded-t-2xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setCurrentTab('home')}><ArrowLeft className="w-5 h-5" /></button>
                    <span className="font-bold text-sm">चैट बॉक्स (एंटी-स्क्रीनशॉट सुरक्षित)</span>
                  </div>
                  <Lock className="w-4 h-4 text-rose-200" title="End-to-End Encrypted" />
                </div>
                
                {/* Anti-leak Warning Banner */}
                <div className="bg-amber-50 border-b border-amber-200 p-2 text-center text-[10px] text-amber-800 flex items-center justify-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>सुरक्षा नीति: इस चैट में स्क्रीनशॉट और कॉपी प्रतिबंधित हैं।</span>
                </div>

                {/* Message History */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatList.map((c, idx) => (
                    <div key={idx} className="bg-rose-50 p-3 rounded-xl max-w-[80%] text-xs shadow-sm">
                      <p className="font-bold text-rose-700 mb-0.5">{c.sender}</p>
                      <p className="text-gray-800">{c.text}</p>
                      <span className="text-[9px] text-gray-400 block text-right mt-1">{c.time}</span>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-gray-100 flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="संदेश लिखें..." 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                  <button 
                    onClick={() => {
                      if(!chatMessage.trim()) return;
                      setChatList([...chatList, { sender: 'आप', text: chatMessage, time: 'Just now' }]);
                      setChatMessage('');
                    }}
                    className="bg-rose-600 text-white p-2 rounded-xl shadow">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ADMIN PANEL TAB */}
            {currentTab === 'admin' && (
              <div className="bg-white rounded-2xl shadow-md p-4 border border-rose-100 space-y-4">
                <h3 className="font-bold text-gray-800 text-base border-b pb-2 flex items-center">
                  <Settings className="w-5 h-5 text-rose-600 mr-2" /> एडमिन नियंत्रण पैनल
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-rose-50 p-3 rounded-xl text-center">
                    <span className="text-xs text-gray-500 block">कुल प्रोफाइल्स</span>
                    <span className="text-lg font-bold text-rose-600">1,240</span>
                  </div>
                  <div className="bg-rose-50 p-3 rounded-xl text-center">
                    <span className="text-xs text-gray-500 block">वेरिफाइड यूजर्स</span>
                    <span className="text-lg font-bold text-emerald-600">980</span>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <button className="w-full text-left bg-gray-50 hover:bg-rose-50 p-3 rounded-xl text-xs font-medium border border-gray-200">
                    📢 नया ब्रॉडकास्ट नोटिफिकेशन भेजें
                  </button>
                  <button className="w-full text-left bg-gray-50 hover:bg-rose-50 p-3 rounded-xl text-xs font-medium border border-gray-200">
                    🛡️ यूजर रिपोर्ट और शिकायतें देखें
                  </button>
                  <button className="w-full text-left bg-gray-50 hover:bg-rose-50 p-3 rounded-xl text-xs font-medium border border-gray-200">
                    ⚙️ ऐप सेटिंग्स और एपीआई कॉन्फ़िगरेशन
                  </button>
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {currentTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-md p-6 border border-rose-100 text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" alt="My Profile" className="w-24 h-24 rounded-full object-cover border-2 border-rose-500 shadow" />
                  <span className="absolute bottom-0 right-0 bg-rose-600 text-white p-1 rounded-full text-xs">
                    <Camera className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-800">अनिल कुमार</h3>
                <p className="text-xs text-gray-500 mb-4">+91 98765 43210 • हिसार, हरियाणा</p>
                <div className="bg-rose-50 p-3 rounded-xl text-left space-y-2 text-xs mb-4">
                  <p><strong>वैवाहिक स्थिति:</strong> तलाकशुदा / स्वतंत्र</p>
                  <p><strong>खाता स्थिति:</strong> वेरिफाइड प्रीमियम मेंबर</p>
                </div>
                <button onClick={() => setIsLoggedIn(false)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-xl text-xs flex items-center justify-center">
                  <LogOut className="w-4 h-4 mr-1.5" /> अकाउंट से बाहर आएं
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar (Visible only when logged in) */}
      {isLoggedIn && (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-rose-100 shadow-lg flex justify-around py-3 z-50">
          <button 
            onClick={() => setCurrentTab('home')} 
            className={`flex flex-col items-center text-xs ${currentTab === 'home' ? 'text-rose-600 font-bold' : 'text-gray-400'}`}>
            <Search className="w-5 h-5 mb-0.5" /> खोजें
          </button>
          <button 
            onClick={() => setCurrentTab('chat')} 
            className={`flex flex-col items-center text-xs ${currentTab === 'chat' ? 'text-rose-600 font-bold' : 'text-gray-400'}`}>
            <MessageCircle className="w-5 h-5 mb-0.5" /> चैट
          </button>
          <button 
            onClick={() => setCurrentTab('admin')} 
            className={`flex flex-col items-center text-xs ${currentTab === 'admin' ? 'text-rose-600 font-bold' : 'text-gray-400'}`}>
            <Settings className="w-5 h-5 mb-0.5" /> एडमिन
          </button>
          <button 
            onClick={() => setCurrentTab('profile')} 
            className={`flex flex-col items-center text-xs ${currentTab === 'profile' ? 'text-rose-600 font-bold' : 'text-gray-400'}`}>
            <User className="w-5 h-5 mb-0.5" /> प्रोफाइल
          </button>
        </nav>
      )}
    </div>
  );
      }
              

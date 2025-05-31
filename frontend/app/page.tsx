"use client";
import React, { useEffect, useState } from "react";
import freighterApi from "@stellar/freighter-api";

interface Animal {
  id: number;
  name: string;
  description: string;
  image: string;
  raised: number;
  target: number;
}

const animals: Animal[] = [
  {
    id: 1,
    name: "Minnoş",
    description: "Yaralı patiyi iyileşen sevimli kedi",
    image: "/api/placeholder/300/200",
    raised: 250,
    target: 500,
  },
  {
    id: 2, 
    name: "Karabaş",
    description: "Soğuktan korunmaya muhtaç köpek",
    image: "/api/placeholder/300/200", 
    raised: 180,
    target: 400,
  },
  {
    id: 3,
    name: "Pamuk",
    description: "Mama desteğine ihtiyacı olan genç kedi",
    image: "/api/placeholder/300/200",
    raised: 320,
    target: 600,
  },
];

export default function Home() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>("10");
  const [isLoading, setIsLoading] = useState(false);

  // Sayfa yüklendiğinde cüzdan bağlı mı kontrol et
  useEffect(() => {
    const checkFreighter = async () => {
      try {
        const connected = await freighterApi.isConnected();
        if (connected) {
          const { address } = await freighterApi.getAddress();
          setPublicKey(address);
        }
      } catch (error) {
        console.error("Error checking Freighter connection:", error);
      }
    };
    checkFreighter();
  }, []);

  // Cüzdan bağlantısı
  const handleConnectWallet = async () => {
    try {
      setIsLoading(true);
      await freighterApi.setAllowed();
      const { address } = await freighterApi.getAddress();
      setPublicKey(address);
    } catch (error) {
      console.error("Error connecting to Freighter:", error);
      alert("Cüzdan bağlanırken hata oluştu!");
    } finally {
      setIsLoading(false);
    }
  };

  // Bağış yapma
  const handleDonate = async () => {
    if (!selectedAnimal || !publicKey) {
      alert("Lütfen bir hayvan seçin ve cüzdanınızı bağlayın!");
      return;
    }

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert("Geçerli bir bağış miktarı girin!");
      return;
    }

    try {
      setIsLoading(true);
      
      // Burada Stellar/Soroban akıllı sözleşme çağrısı yapılacak
      // Şimdilik simüle ediyoruz
      console.log(`${selectedAnimal.name} için ${donationAmount} XLM bağış yapılıyor...`);
      
      // Simülasyon için 2 saniye bekle
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`${selectedAnimal.name} için ${donationAmount} XLM bağışınız başarıyla yapıldı!`);
      
      // Bağış sonrası durumu sıfırla
      setSelectedAnimal(null);
      setDonationAmount("10");
      
    } catch (error) {
      console.error("Donation error:", error);
      alert("Bağış yapılırken hata oluştu!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                🐾 Sokak Dostları
              </h1>
              <p className="ml-4 text-lg text-gray-600">
                Merkeziyetsiz Hayvan Desteği
              </p>
            </div>
            
            {/* Cüzdan Bağlantısı */}
            <div>
              {publicKey ? (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium">Bağlı Cüzdan:</p>
                  <p className="text-xs font-mono">
                    {publicKey.slice(0, 8)}...{publicKey.slice(-8)}
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Bağlanıyor...
                    </>
                  ) : (
                    <>
                      🔗 Freighter Cüzdanını Bağla
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Açıklama */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sokak Hayvanlarına Destek Ol
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Blockchain teknolojisi ile şeffaf ve güvenli bir şekilde sokak hayvanlarına yardım et. 
            Bağışların doğrudan yardım havuzuna gitmesini sağla.
          </p>
        </div>

        {/* Hayvan Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 ${
                selectedAnimal?.id === animal.id 
                  ? 'ring-4 ring-blue-500 shadow-2xl' 
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedAnimal(animal)}
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">{animal.id === 1 ? '🐱' : animal.id === 2 ? '🐕' : '🐈'}</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {animal.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {animal.description}
                </p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Toplanan: {animal.raised} XLM</span>
                    <span>Hedef: {animal.target} XLM</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((animal.raised / animal.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    %{Math.round((animal.raised / animal.target) * 100)} tamamlandı
                  </p>
                </div>

                {selectedAnimal?.id === animal.id && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-800 font-medium text-sm">
                      ✓ Seçildi - Bağış yapmak için aşağıdaki butonu kullanın
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bağış Alanı */}
        {publicKey && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Bağış Yap
            </h3>
            
            {selectedAnimal ? (
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">
                  Seçilen Hayvan: <strong>{selectedAnimal.name}</strong>
                </p>
              </div>
            ) : (
              <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-800">
                  Lütfen yukarıdan bir hayvan seçin
                </p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bağış Miktarı (XLM)
              </label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                min="1"
                step="0.1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bağış miktarını girin"
              />
            </div>

            <button
              onClick={handleDonate}
              disabled={!selectedAnimal || isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  İşlem Yapılıyor...
                </>
              ) : (
                <>
                  ❤️ Destekle ({donationAmount} XLM)
                </>
              )}
            </button>
          </div>
        )}

        {!publicKey && (
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-yellow-800 font-medium">
                Bağış yapmak için lütfen cüzdanınızı bağlayın
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">
            Stellar & Soroban ile güçlendirilmiştir 🌟
          </p>
          <p className="text-gray-400 mt-2">
            Merkeziyetsiz, şeffaf ve güvenli hayvan yardım platformu
          </p>
        </div>
      </footer>
    </div>
  );
}
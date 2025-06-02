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
    name: "Whiskers",
    description: "Adorable cat recovering from injured paw",
    image: "/api/placeholder/300/200",
    raised: 250,
    target: 500,
  },
  {
    id: 2, 
    name: "Shadow",
    description: "Dog in need of protection from cold weather",
    image: "/api/placeholder/300/200", 
    raised: 180,
    target: 400,
  },
  {
    id: 3,
    name: "Cotton",
    description: "Young cat needing food support",
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

  // Check if wallet is connected when page loads
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

  // Wallet connection
  const handleConnectWallet = async () => {
    try {
      setIsLoading(true);
      await freighterApi.setAllowed();
      const { address } = await freighterApi.getAddress();
      setPublicKey(address);
    } catch (error) {
      console.error("Error connecting to Freighter:", error);
      alert("Error occurred while connecting wallet!");
    } finally {
      setIsLoading(false);
    }
  };

  // Make donation
  const handleDonate = async () => {
    if (!selectedAnimal || !publicKey) {
      alert("Please select an animal and connect your wallet!");
      return;
    }

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert("Please enter a valid donation amount!");
      return;
    }

    try {
      setIsLoading(true);
      
      // Stellar/Soroban smart contract call will be made here
      // For now, we're simulating it
      console.log(`Donating ${donationAmount} XLM for ${selectedAnimal.name}...`);
      
      // Wait 2 seconds for simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Your donation of ${donationAmount} XLM for ${selectedAnimal.name} was successful!`);
      
      // Reset state after donation
      setSelectedAnimal(null);
      setDonationAmount("10");
      
    } catch (error) {
      console.error("Donation error:", error);
      alert("Error occurred while making donation!");
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
                🐾 PawGuardians
              </h1>
              <p className="ml-4 text-lg text-gray-600">
                Decentralized Animal Support
              </p>
            </div>
            
            {/* Wallet Connection */}
            <div>
              {publicKey ? (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium">Connected Wallet:</p>
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
                      Connecting...
                    </>
                  ) : (
                    <>
                      🔗 Connect Freighter Wallet
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Description */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Support Stray Animals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help stray animals transparently and securely with blockchain technology. 
            Ensure your donations go directly to the aid pool.
          </p>
        </div>

        {/* Animal Cards */}
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
                    <span>Raised: {animal.raised} XLM</span>
                    <span>Goal: {animal.target} XLM</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((animal.raised / animal.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((animal.raised / animal.target) * 100)}% completed
                  </p>
                </div>

                {selectedAnimal?.id === animal.id && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-800 font-medium text-sm">
                      ✓ Selected - Use the button below to donate
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Donation Area */}
        {publicKey && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Make a Donation
            </h3>
            
            {selectedAnimal ? (
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">
                  Selected Animal: <strong>{selectedAnimal.name}</strong>
                </p>
              </div>
            ) : (
              <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-800">
                  Please select an animal from above
                </p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Amount (XLM)
              </label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                min="1"
                step="0.1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter donation amount"
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
                  Processing...
                </>
              ) : (
                <>
                  ❤️ Support ({donationAmount} XLM)
                </>
              )}
            </button>
          </div>
        )}

        {!publicKey && (
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-yellow-800 font-medium">
                Please connect your wallet to make a donation
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">
            Powered by Stellar & Soroban 🌟
          </p>
          <p className="text-gray-400 mt-2">
            Decentralized, transparent and secure animal support platform
          </p>
        </div>
      </footer>
    </div>
  );
}
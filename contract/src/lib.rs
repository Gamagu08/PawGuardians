#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror, symbol_short,
    Address, Env, Map, String, Symbol, Vec, log
};

// Hayvan bilgilerini tutan yapı
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Animal {
    pub id: u32,
    pub name: String,
    pub description: String,
    pub total_raised: i128,
    pub target_amount: i128,
    pub is_active: bool,
    pub beneficiary: Address, // Yardım fonunu yönetecek gönüllü adresi
}

// Bağış kaydı
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Donation {
    pub donor: Address,
    pub animal_id: u32,
    pub amount: i128,
    pub timestamp: u64,
}

// Ödeme talebi
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PaymentRequest {
    pub id: u32,
    pub animal_id: u32,
    pub requester: Address,
    pub amount: i128,
    pub description: String,
    pub is_approved: bool,
    pub is_paid: bool,
    pub timestamp: u64,
}

// Data Key'leri
#[contracttype]
pub enum DataKey {
    Admin,
    Animals,
    AnimalData(u32),
    Donations,
    DonationData(u32),
    PaymentRequests,
    PaymentRequestData(u32),
    NextAnimalId,
    NextDonationId,
    NextPaymentRequestId,
}



// Hata kodları
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum Error {
    NotAuthorized = 1,
    AnimalNotFound = 2,
    AnimalNotActive = 3,
    InsufficientFunds = 4,
    PaymentRequestNotFound = 5,
    PaymentRequestAlreadyProcessed = 6,
}

#[contract]
pub struct StreetAnimalsContract;

#[contractimpl]
impl StreetAnimalsContract {
    
    /// Sözleşmeyi başlatır ve admin'i ayarlar
    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::NextAnimalId, &1u32);
        env.storage().instance().set(&DataKey::NextDonationId, &1u32);
        env.storage().instance().set(&DataKey::NextPaymentRequestId, &1u32);
        
        log!(&env, "Contract initialized with admin: {}", admin);
    }
    
    /// Yeni hayvan ekler (sadece admin)
    pub fn add_animal(
        env: Env,
        name: String,
        description: String,
        target_amount: i128,
        beneficiary: Address,
    ) -> Result<u32, Error> {
        let admin: Address = env.storage().instance().get(&DataKey::Admin)
            .ok_or(Error::NotAuthorized)?;
        admin.require_auth();
        
        let animal_id: u32 = env.storage().instance().get(&DataKey::NextAnimalId)
            .unwrap_or(1);
        
        let animal = Animal {
            id: animal_id,
            name: name.clone(),
            description: description.clone(),
            total_raised: 0,
            target_amount,
            is_active: true,
            beneficiary,
        };
        
        env.storage().persistent().set(&DataKey::AnimalData(animal_id), &animal);
        
        // Hayvan listesini güncelle
        let mut animals: Vec<u32> = env.storage().instance().get(&DataKey::Animals)
            .unwrap_or(Vec::new(&env));
        animals.push_back(animal_id);
        env.storage().instance().set(&DataKey::Animals, &animals);
        
        // Sonraki ID'yi artır
        env.storage().instance().set(&DataKey::NextAnimalId, &(animal_id + 1));
        
        log!(&env, "Animal added: {} with ID: {}", name, animal_id);
        Ok(animal_id)
    }
    
    /// Hayvan bilgilerini getirir
    pub fn get_animal(env: Env, animal_id: u32) -> Result<Animal, Error> {
        env.storage().persistent().get(&DataKey::AnimalData(animal_id))
            .ok_or(Error::AnimalNotFound)
    }
    
    /// Tüm hayvanları listeler
    pub fn get_all_animals(env: Env) -> Vec<Animal> {
        let animal_ids: Vec<u32> = env.storage().instance().get(&DataKey::Animals)
            .unwrap_or(Vec::new(&env));
        
        let mut animals = Vec::new(&env);
        for id in animal_ids.iter() {
            if let Ok(animal) = Self::get_animal(env.clone(), id) {
                animals.push_back(animal);
            }
        }
        animals
    }
    
    /// Hayvan için bağış yapar
    pub fn donate(env: Env, donor: Address, animal_id: u32, amount: i128) -> Result<(), Error> {
        donor.require_auth();
        
        if amount <= 0 {
            return Err(Error::InsufficientFunds);
        }
        
        // Hayvanı kontrol et
        let mut animal = Self::get_animal(env.clone(), animal_id)?;
        if !animal.is_active {
            return Err(Error::AnimalNotActive);
        }
        
        // Bağış kaydını oluştur
        let donation_id: u32 = env.storage().instance().get(&DataKey::NextDonationId)
            .unwrap_or(1);
        
        let donation = Donation {
            donor: donor.clone(),
            animal_id,
            amount,
            timestamp: env.ledger().timestamp(),
        };
        
        env.storage().persistent().set(&DataKey::DonationData(donation_id), &donation);
        
        // Bağış listesini güncelle
        let mut donations: Vec<u32> = env.storage().instance().get(&DataKey::Donations)
            .unwrap_or(Vec::new(&env));
        donations.push_back(donation_id);
        env.storage().instance().set(&DataKey::Donations, &donations);
        
        // Hayvanın toplam bağışını güncelle
        animal.total_raised += amount;
        env.storage().persistent().set(&DataKey::AnimalData(animal_id), &animal);
        
        // Sonraki donation ID'yi artır
        env.storage().instance().set(&DataKey::NextDonationId, &(donation_id + 1));
        
        // Token transferi burada yapılacak (Stellar native asset)
        // Bu kısımda gerçek blockchain transferi implement edilmeli
        
        log!(&env, "Donation received: {} XLM for animal ID: {} from: {}", 
             amount, animal_id, donor);
        
        Ok(())
    }
    
    /// Ödeme talebi oluşturur (sadece beneficiary)
    pub fn create_payment_request(
        env: Env,
        animal_id: u32,
        requester: Address,
        amount: i128,
        description: String,
    ) -> Result<u32, Error> {
        requester.require_auth();
        
        let animal = Self::get_animal(env.clone(), animal_id)?;
        
        // Sadece beneficiary ödeme talebi oluşturabilir
        if requester != animal.beneficiary {
            return Err(Error::NotAuthorized);
        }
        
        // Yeterli bakiye kontrolü
        if amount > animal.total_raised {
            return Err(Error::InsufficientFunds);
        }
        
        let request_id: u32 = env.storage().instance().get(&DataKey::NextPaymentRequestId)
            .unwrap_or(1);
        
        let payment_request = PaymentRequest {
            id: request_id,
            animal_id,
            requester: requester.clone(),
            amount,
            description: description.clone(),
            is_approved: false,
            is_paid: false,
            timestamp: env.ledger().timestamp(),
        };
        
        env.storage().persistent().set(&DataKey::PaymentRequestData(request_id), &payment_request);
        
        // Ödeme talepleri listesini güncelle
        let mut requests: Vec<u32> = env.storage().instance().get(&DataKey::PaymentRequests)
            .unwrap_or(Vec::new(&env));
        requests.push_back(request_id);
        env.storage().instance().set(&DataKey::PaymentRequests, &requests);
        
        env.storage().instance().set(&DataKey::NextPaymentRequestId, &(request_id + 1));
        
        log!(&env, "Payment request created: {} XLM for animal ID: {} by: {}", 
             amount, animal_id, requester);
        
        Ok(request_id)
    }
    
    /// Ödeme talebini onaylar (sadece admin)
    pub fn approve_payment_request(env: Env, request_id: u32) -> Result<(), Error> {
        let admin: Address = env.storage().instance().get(&DataKey::Admin)
            .ok_or(Error::NotAuthorized)?;
        admin.require_auth();
        
        let mut payment_request: PaymentRequest = env.storage().persistent()
            .get(&DataKey::PaymentRequestData(request_id))
            .ok_or(Error::PaymentRequestNotFound)?;
        
        if payment_request.is_approved || payment_request.is_paid {
            return Err(Error::PaymentRequestAlreadyProcessed);
        }
        
        payment_request.is_approved = true;
        env.storage().persistent().set(&DataKey::PaymentRequestData(request_id), &payment_request);
        
        log!(&env, "Payment request approved: {}", request_id);
        Ok(())
    }
    
    /// Onaylanmış ödeme talebini işler
    pub fn process_payment(env: Env, request_id: u32) -> Result<(), Error> {
        let mut payment_request: PaymentRequest = env.storage().persistent()
            .get(&DataKey::PaymentRequestData(request_id))
            .ok_or(Error::PaymentRequestNotFound)?;
        
        if !payment_request.is_approved || payment_request.is_paid {
            return Err(Error::PaymentRequestAlreadyProcessed);
        }
        
        let mut animal = Self::get_animal(env.clone(), payment_request.animal_id)?;
        
        // Yeterli bakiye kontrolü
        if payment_request.amount > animal.total_raised {
            return Err(Error::InsufficientFunds);
        }
        
        // Bakiyeyi düş
        animal.total_raised -= payment_request.amount;
        env.storage().persistent().set(&DataKey::AnimalData(payment_request.animal_id), &animal);
        
        // Ödeme talebini işaretler
        payment_request.is_paid = true;
        env.storage().persistent().set(&DataKey::PaymentRequestData(request_id), &payment_request);
        
        // Burada gerçek ödeme transferi yapılacak
        // Token transferi beneficiary'ye yapılmalı
        
        log!(&env, "Payment processed: {} XLM to: {} for animal ID: {}", 
             payment_request.amount, payment_request.requester, payment_request.animal_id);
        
        Ok(())
    }
    
    /// Belirli bir hayvan için bağışları listeler
    pub fn get_donations_for_animal(env: Env, animal_id: u32) -> Vec<Donation> {
        let donation_ids: Vec<u32> = env.storage().instance().get(&DataKey::Donations)
            .unwrap_or(Vec::new(&env));
        
        let mut animal_donations = Vec::new(&env);
        for id in donation_ids.iter() {
            if let Some(donation) = env.storage().persistent().get::<DataKey, Donation>(&DataKey::DonationData(id)) {
                if donation.animal_id == animal_id {
                    animal_donations.push_back(donation);
                }
            }
        }
        animal_donations
    }
    
    /// Belirli bir hayvan için ödeme taleplerini listeler
    pub fn get_payment_requests_for_animal(env: Env, animal_id: u32) -> Vec<PaymentRequest> {
        let request_ids: Vec<u32> = env.storage().instance().get(&DataKey::PaymentRequests)
            .unwrap_or(Vec::new(&env));
        
        let mut animal_requests = Vec::new(&env);
        for id in request_ids.iter() {
            if let Some(request) = env.storage().persistent().get::<DataKey, PaymentRequest>(&DataKey::PaymentRequestData(id)) {
                if request.animal_id == animal_id {
                    animal_requests.push_back(request);
                }
            }
        }
        animal_requests
    }
    
    /// Hayvanı aktif/pasif yapar (sadece admin)
    pub fn toggle_animal_status(env: Env, animal_id: u32) -> Result<(), Error> {
        let admin: Address = env.storage().instance().get(&DataKey::Admin)
            .ok_or(Error::NotAuthorized)?;
        admin.require_auth();
        
        let mut animal = Self::get_animal(env.clone(), animal_id)?;
        animal.is_active = !animal.is_active;
        env.storage().persistent().set(&DataKey::AnimalData(animal_id), &animal);
        
        log!(&env, "Animal {} status changed to: {}", animal_id, animal.is_active);
        Ok(())
    }
    
    /// Sözleşme istatistiklerini döndürür
    pub fn get_stats(env: Env) -> Map<Symbol, i128> {
        let mut stats = Map::new(&env);
        
        let animals = Self::get_all_animals(env.clone());
        let total_animals = animals.len() as i128;
        let mut total_raised = 0i128;
        let mut active_animals = 0i128;
        
        for animal in animals.iter() {
            total_raised += animal.total_raised;
            if animal.is_active {
                active_animals += 1;
            }
        }
        
        stats.set(symbol_short!("tot_anim"), total_animals);
        stats.set(symbol_short!("act_anim"), active_animals);
        stats.set(symbol_short!("tot_fund"), total_raised);
        
        stats
    }
}
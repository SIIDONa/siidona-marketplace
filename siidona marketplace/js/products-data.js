// Sample products data - Replace with API calls in production
const productsData = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'phones',
        price: '85000',
        description: 'Latest iPhone with A17 Pro chip',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=iPhone+15+Pro',
        stock: 'in-stock',
        featured: true,
        specs: ['6.1" Display', 'A17 Pro Chip', '128GB Storage', '48MP Camera']
    },
    {
        id: 2,
        name: 'MacBook Pro 14"',
        category: 'computers',
        price: '150000',
        description: 'Powerful laptop with M3 chip',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=MacBook+Pro',
        stock: 'in-stock',
        featured: true,
        specs: ['14" Retina Display', 'M3 Chip', '16GB RAM', '512GB SSD']
    },
    {
        id: 3,
        name: 'Canon EOS R6',
        category: 'cameras',
        price: '120000',
        description: 'Professional mirrorless camera',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Canon+EOS+R6',
        stock: 'limited',
        featured: true,
        specs: ['20MP Full Frame', '4K Video', 'Dual Card Slots', 'IBIS']
    },
    {
        id: 4,
        name: 'Sony WH-1000XM5',
        category: 'accessories',
        price: '25000',
        description: 'Premium noise-canceling headphones',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Sony+WH-1000XM5',
        stock: 'in-stock',
        featured: true,
        specs: ['Active Noise Cancellation', '30hr Battery', 'Bluetooth 5.2', 'Premium Sound']
    },
    {
        id: 5,
        name: 'Samsung Galaxy S24',
        category: 'phones',
        price: '65000',
        description: 'Flagship Android smartphone',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Galaxy+S24',
        stock: 'in-stock',
        featured: false,
        specs: ['6.2" AMOLED', 'Snapdragon 8 Gen 3', '256GB Storage', '50MP Camera']
    },
    {
        id: 6,
        name: 'Dell XPS 15',
        category: 'computers',
        price: '95000',
        description: 'High-performance Windows laptop',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Dell+XPS+15',
        stock: 'in-stock',
        featured: false,
        specs: ['15.6" 4K Display', 'Intel i7', '16GB RAM', '512GB SSD']
    },
    {
        id: 7,
        name: 'JBL Charge 5',
        category: 'speakers',
        price: '12000',
        description: 'Portable Bluetooth speaker',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=JBL+Charge+5',
        stock: 'in-stock',
        featured: true,
        specs: ['20hr Battery', 'IP67 Waterproof', 'USB Charging', 'PartyBoost']
    },
    {
        id: 8,
        name: 'Samsung T7 SSD 1TB',
        category: 'storage',
        price: '8500',
        description: 'Fast portable SSD',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Samsung+T7',
        stock: 'in-stock',
        featured: true,
        specs: ['1TB Capacity', '1050MB/s Read', 'USB 3.2', 'Compact Design']
    },
    {
        id: 9,
        name: 'Sony A7 IV',
        category: 'cameras',
        price: '180000',
        description: 'Professional full-frame camera',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Sony+A7+IV',
        stock: 'limited',
        featured: false,
        specs: ['33MP Full Frame', '4K 60fps', 'Real-time Tracking', 'IBIS']
    },
    {
        id: 10,
        name: 'AirPods Pro 2',
        category: 'accessories',
        price: '18000',
        description: 'Premium wireless earbuds',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=AirPods+Pro+2',
        stock: 'in-stock',
        featured: false,
        specs: ['Active Noise Cancellation', 'Spatial Audio', '6hr Battery', 'MagSafe Charging']
    },
    {
        id: 11,
        name: 'Bose SoundLink Revolve+',
        category: 'speakers',
        price: '22000',
        description: '360-degree portable speaker',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=Bose+Revolve',
        stock: 'in-stock',
        featured: false,
        specs: ['360° Sound', '16hr Battery', 'Water Resistant', 'Built-in Mic']
    },
    {
        id: 12,
        name: 'WD My Passport 2TB',
        category: 'storage',
        price: '5500',
        description: 'Portable external hard drive',
        image: 'https://via.placeholder.com/300x200/1e3a8a/ffffff?text=WD+Passport',
        stock: 'in-stock',
        featured: false,
        specs: ['2TB Capacity', 'USB 3.0', 'Password Protection', 'Compact']
    }
];
